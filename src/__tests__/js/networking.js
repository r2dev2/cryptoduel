import { get, writable } from 'svelte/store';
import { external, Messages } from '@/js/constants.js';

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
      }
    };
  };
};


const testId1 = 'test-id-1-skdfjl';
const testId2 = 'test-id-2-fdjksl';

// needed to mock Peer
const getNetworking = () => require('@/js/networking.js');

const givePeerConnectionId = id =>
  listeners.get('open').forEach(cb => cb(testId1));


let stores = require('@/js/store.js');

const commonReset = () => {
  process.env.PRODUCTION = true;
  listeners.set('open', []);
  listeners.set('connection', []);
  peerConnections.splice(peerConnections.length);
  messagesTo.splice(messagesTo.length);
  jest.resetModules();
  stores = require('@/js/store.js');
};


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

describe('node to hivemind', () => {
  let networking;

  beforeEach(() => {
    commonReset();

    jest.doMock('@/js/constants.js', () => ({
      hivemindBrain: testId2,
      isHivemindBrain: false,
      external: { Peer },
    }));

    networking = getNetworking();
    givePeerConnectionId(testId1);
  });

  it('sends connection request to hivemind', () => {
    networking.connectTo(testId2);
    expect(peerConnections.length).toBe(1)
    expect(peerConnections[0].id).toEqual(testId2);
  });

  it('sends the initial state to the hivemind', () => {
    networking.connectTo(testId2);
    const { stream } = peerConnections[0];
    stream.set({ etype: 'open', edata: null });
    setTimeout(() => {
      expect(messagesTo.length).toBe(1);
      expect(messagesTo[0].id).toEqual(testId2);
      expect(messagesTo[0].type).toEqual(Messages.INIT_STATE);
      expect(messagesTo[0].name).not.toBeNullOrUndefined();
    }, 200);
  });
});
