import { get, writable } from 'svelte/store';
import { Messages } from '@/js/constants.js';
import { sleep } from '@/js/utils.js';
import * as Constants from '@/js/constants.js';

const listeners = new Map([
  ['open', []],
  ['connection', []],
  ['error', []],
]);
const peerConnections = [];
const messagesTo = [];

const connection = (id) => {
  const stream = writable(null);
  const listeners = new Map();
  stream.subscribe((s) => {
    if (!s) return;
    const { etype, edata } = s;
    if (listeners.has(etype)) {
      listeners.get(etype).forEach((cb) => cb(edata));
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
    peer: id,
  };
};

const Peer = function () {
  this.on = (msg, cb) => listeners.get(msg).push(cb);
  this.connect = connection;
};

const testId1 = 'test-id-1-skdfjl';
const testId2 = 'test-id-2-fdjksl';
const testName = 'jeff';
const testName2 = 'joe';
const testProgress = [false, false, false];
const testProblem = {
  author: 'bru',
  text: 'elo',
  plaintext: 'ELO',
  ciphertext: 'ABC',
};

// needed to mock Peer
const getNetworking = () => require('@/js/networking.js');

const givePeerConnectionId = (id) =>
  listeners.get('open').forEach((cb) => cb(testId1));

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
      external: { Peer },
    }));

    stores.hivemindBrain.set(testId2);

    networking = getNetworking();
    givePeerConnectionId(testId1);
    openConnection();
  });

  const openConnection = () => {
    const { stream } = peerConnections[0];
    stream.set({ etype: 'open', edata: null });
    sleep(1000);
    jest.runAllTimers();
    return stream;
  };

  describe('sending to hivemind', () => {
    it('sends connection request to hivemind', () => {
      expect(peerConnections.length).toBe(1);
      expect(peerConnections[0].id).toEqual(testId2);
    });

    it('stores the hivemind connection', () => {
      expect(get(stores.hivemindConnection)).not.toBe(null);
    });

    it('sends the initial state to the hivemind', () => {
      expect(messagesTo.length).toBe(1);
      expect(messagesTo[0].to).toEqual(testId2);
      expect(messagesTo[0].msg.type).toEqual(Messages.INIT_STATE);
      expect(messagesTo[0].msg.name).not.toEqual(null);
    });

    it("updates the hivemind when node's state changes", () => {
      stores.name.set(testName);
      stores.progress.set(testProgress);

      expect(messagesTo.length).toBe(3);
      expect(messagesTo.map((m) => m.msg.type)).toEqual([
        Messages.INIT_STATE,
        Messages.UPDATE_SERVER_STATE,
        Messages.UPDATE_SERVER_STATE,
      ]);
      expect(messagesTo[1].msg.name).toEqual(testName);
      expect(messagesTo[2].msg.progress).toEqual(testProgress);
    });
  });

  describe('responding to hivemind', () => {
    it('updates the game problem when hivemind starts new game', () => {
      networking.onData(testId2)({
        type: Messages.NEW_PROBLEM,
        problem: testProblem,
      });

      expect(get(stores.gameProblem)).toEqual(testProblem);
    });

    it('updates the state of other users', () => {
      const client = {
        id: testId1,
        name: 'bru',
        progress: null,
        solved: false,
      };
      const server = {
        id: testId2,
        name: testName,
        progress: [false],
        solved: false,
      };

      networking.onData(testId2)({
        type: Messages.UPDATE_CLIENT_STATE,
        users: [client, server],
      });

      expect(get(stores.users)).toEqual([server]);
    });

    it('clears its own progress and solved when hivemind starts new game', () => {
      stores.progress.set(testProgress.map((_) => true));
      stores.solved.set(true);

      networking.onData(testId2)({
        type: Messages.NEW_PROBLEM,
        problem: { ...testProblem },
      });

      expect(get(stores.progress)).toEqual(null);
      expect(get(stores.solved)).toEqual(false);
    });
  });
});

describe('networking as a hivemind', () => {
  let networking;

  beforeEach(() => {
    commonReset();

    jest.doMock('@/js/constants.js', () => ({
      ...Constants,
      external: { Peer },
    }));

    stores.hivemindBrain.set(null);

    networking = getNetworking();
    givePeerConnectionId(testId2);
    openConnection();

    // initialize first player
    networking.onData(testId1)({
      type: Messages.INIT_STATE,
      name: testName,
    });
  });

  const openConnection = () => {
    listeners.get('connection').forEach((cb) => cb(connection(testId1)));
    const { stream } = peerConnections[0];
    stream.set({ etype: 'open', edata: null });
    sleep(1000);
    jest.runAllTimers();
    return stream;
  };

  describe('responding to node', () => {
    it('accepts and stores connection request from node', () => {
      expect(stores.connections.has(testId1));
    });

    it('updates internal state when receiving node initial state', () => {
      expect(get(stores.users)[0].name).toEqual(testName);
    });

    it('updates internal state when receiving node updates', () => {
      networking.onData(testId1)({
        type: Messages.UPDATE_SERVER_STATE,
        progress: testProgress,
        name: testName,
        solved: false,
      });

      expect(get(stores.users)[0].progress).toEqual(testProgress);
      expect(get(stores.users)[0].solved).toEqual(false);

      networking.onData(testId1)({
        type: Messages.UPDATE_SERVER_STATE,
        progress: testProgress.map((_) => true),
        name: testName2,
        solved: true,
      });

      expect(get(stores.users)[0].progress.every(Boolean)).toBe(true);
      expect(get(stores.users)[0].solved).toBe(true);
      expect(get(stores.users)[0].name).toEqual(testName2);
    });
  });

  describe('sending to node', () => {
    it('sends a new game message when game is created', () => {
      stores.gameProblem.set(testProblem);

      expect(messagesTo.length).toBe(4);
      expect(messagesTo.map((m) => m.msg)).toContainEqual({
        type: Messages.NEW_PROBLEM,
        problem: testProblem,
      });
    });

    it('sets all the users progress to null when game is created', () => {
      stores.gameProblem.set(testProblem);

      expect(messagesTo.length).toBe(4);

      const lastUpdate = [...messagesTo]
        .reverse()
        .find((m) => m.msg.type === Messages.UPDATE_CLIENT_STATE);

      expect(lastUpdate).not.toBe(undefined);
      expect(
        lastUpdate.msg.users.every((u) => u.progress === null && !u.solved)
      ).toBe(true);
    });

    it('sends the game problem if it exists', () => {
      stores.gameProblem.set(testProblem);

      // clear messages
      messagesTo.splice(0, messagesTo.length);

      // have person connect
      networking.onData(testId1)({
        type: Messages.INIT_STATE,
        name: testName,
      });

      expect(messagesTo.map((m) => m.msg)).toContainEqual({
        type: Messages.NEW_PROBLEM,
        problem: testProblem,
      });
    });
  });
});
