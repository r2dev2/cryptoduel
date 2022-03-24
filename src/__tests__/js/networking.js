import { get, writable } from 'svelte/store';
import { external, Messages } from '@/js/constants.js';
import { sleep } from '@/js/utils.js';
import * as Constants from '@/js/constants.js';

const listeners = new Map([
  ['open', []],
  ['connection', []],
]);
const peerConnections = [];
const messagesTo = [];

const Peer = function () {
  this.on = (msg, cb) => listeners.get(msg).push(cb);
  this.connect = id => {
    const stream = writable(null);
    const listeners = new Map();
    stream.subscribe(s => {
      if (!s) return;
      const { etype, edata } = s;
      if (listeners.has(etype)) {
        listeners.get(etype).forEach(cb => cb(edata));
      }
    });
    peerConnections.push({ id, stream });

    return {
      on(etype, cb) {
        listeners.set(etype, listeners.get(etype) ?? new Set());
        listeners.get(etype).add(cb);
      },
      send(msg) {
        messagesTo.push({ msg, to: id });
      },
      peer: id
    };
  };
};


const testId1 = 'test-id-1-skdfjl';
const testId2 = 'test-id-2-fdjksl';
const testName = 'jeff';
const testProgress = [true, false];

// needed to mock Peer
const getNetworking = () => require('@/js/networking.js');

const givePeerConnectionId = id =>
  listeners.get('open').forEach(cb => cb(testId1));


let stores = require('@/js/store.js');

const commonReset = () => {
  process.env.PRODUCTION = true;
  listeners.set('open', []);
  listeners.set('connection', []);
  peerConnections.splice(0, peerConnections.length);
  messagesTo.splice(0, messagesTo.length);
  jest.resetModules();
  stores = require('@/js/store.js');
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('opening of the peer connection', () => {
  beforeEach(() => {
    commonReset();
    require('@/js/constants.js').external.Peer = Peer;
    getNetworking();
  });

  it('updates the id store', () => {
    stores.id.set('');

    givePeerConnectionId(testId1);
    expect(get(stores.id)).toBe(testId1);
  });
});

describe('networking as a node', () => {
  let networking;

  beforeEach(() => {
    commonReset();

    jest.doMock('@/js/constants.js', () => ({
      ...Constants,
      hivemindBrain: testId2,
      isHivemindBrain: false,
      external: { Peer },
    }));

    networking = getNetworking();
    givePeerConnectionId(testId1);
  });

  const openConnection = () => {
    networking.connectTo(testId2);
    const { stream } = peerConnections[0];
    stream.set({ etype: 'open', edata: null });
    sleep(1000);
    jest.runAllTimers();
    return stream;
  }

  describe('node to hivemind', () => {
    it('sends connection request to hivemind', () => {
      networking.connectTo(testId2);
      expect(peerConnections.length).toBe(1)
      expect(peerConnections[0].id).toEqual(testId2);
    });

    it('stores the hivemind connection', () => {
      openConnection();

      expect(get(stores.hivemindConnection)).not.toBe(null);
    });

    it('sends the initial state to the hivemind', () => {
      openConnection();

      expect(messagesTo.length).toBe(1);
      expect(messagesTo[0].to).toEqual(testId2);
      expect(messagesTo[0].msg.type).toEqual(Messages.INIT_STATE);
      expect(messagesTo[0].msg.name).not.toEqual(null);
    });

    it('updates the hivemind when node\'s state changes', () => {
      openConnection();
      
      stores.name.set(testName);
      stores.progress.set(testProgress);

      expect(messagesTo.length).toBe(3);
      expect(messagesTo.map(m => m.msg.type)).toEqual([
        Messages.INIT_STATE,
        Messages.UPDATE_SERVER_STATE,
        Messages.UPDATE_SERVER_STATE
      ]);
      expect(messagesTo[1].msg.name).toEqual(testName);
      expect(messagesTo[2].msg.progress).toEqual(testProgress);
    });
  });
});
