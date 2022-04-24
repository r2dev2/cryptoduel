import { get } from 'svelte/store';
import {
  connections,
  gameProblem,
  id,
  hivemindConnection,
  name,
  self,
  progress,
  solved,
  users,
} from './store.js';
import {
  external,
  hivemindBrain,
  isHivemindBrain,
  Messages,
} from './constants.js';
import { log } from './utils.js';

export const peer = new external.Peer();

/**
 * @typedef {import('./store.js').User} User
 * @typedef {import('peerjs').DataConnection} Connection
 * @typedef {{ type: 0, name: string }} INIT_MSG
 * @typedef {{ type: 1, problem: import('./quotes.js').EncryptedQuote }} NEW_PROB_MSG
 * @typedef {{ type: 2, progress: null | boolean[], solved: boolean, name: string }}
 * UPDATE_S_MSG
 * @typedef {{ type: 3, users: User[] }} UPDATE_C_MSG
 * @typedef {INIT_MSG | NEW_PROB_MSG | UPDATE_S_MSG | UPDATE_C_MSG} PeerData
 */

/**
 * @template T extends PeerData
 * @typedef {(otherId: string, data: T) => void} DataResponder
 */

/** @type {(otherId: string) => (data: PeerData) => void} */
export const onData = (otherId) => (data) => {
  log('got data', data);
  if (dataResponders[data.type]) {
    // @ts-ignore
    dataResponders[data.type](otherId, data);
  }
};

/** @type {DataResponder<INIT_MSG>} */
const initializeRemotePlayer = (id, data) => {
  users.update(($users) => [
    ...$users,
    {
      id,
      name: data.name,
      progress: null,
      solved: false,
    },
  ]);
};

/** @type {DataResponder<NEW_PROB_MSG>} */
const onNewProblem = (_, data) => {
  gameProblem.set(data.problem);
};

/** @type {DataResponder<UPDATE_S_MSG>} */
const updateFromClient = (id, data) => {
  if (!isHivemindBrain) return;
  users.update(($users) =>
    $users.map((u) =>
      u.id !== id
        ? u
        : {
            ...u,
            name: data.name,
            progress: data.progress,
            solved: data.solved,
          }
    )
  );
};

/** @type {DataResponder<UPDATE_C_MSG>} */
const updateFromServer = (_, data) => {
  if (isHivemindBrain) return;
  const ourId = get(id);
  users.set(data.users.filter((u) => u.id !== ourId));
};

const dataResponders = [
  initializeRemotePlayer,
  onNewProblem,
  updateFromClient,
  updateFromServer,
];

/** @type {(otherId: string) => () => void} */
const removePlayer = (otherId) => () => {
  users.update(($users) => $users.filter((u) => u.id !== otherId));
  connections.delete(otherId);
};

const sendInitialState = (/** @type {Connection} */ conn) =>
  conn?.send({
    type: Messages.INIT_STATE,
    name: get(name),
  });

const openConnection = (/** @type {Connection} */ conn) =>
  new Promise((res) => {
    conn.on('open', () => {
      if (conn.peer === hivemindBrain) hivemindConnection.set(conn);
      connections.set(conn.peer, conn);
      conn.on('data', onData(conn.peer));
      conn.on('close', removePlayer(conn.peer));
      setTimeout(() => {
        sendInitialState(conn);
      }, 100);
      res(conn);
    });
  });

const emit = (/** @type {any} */ msg) =>
  connections.forEach((conn) => conn.send(msg));

/** @type {(otherId: string) => Promise<Connection>} */
export const connectTo = (otherId) =>
  new Promise((res) => {
    const unsub = id.subscribe(($id) => {
      if ($id === '') return;
      const conn = peer.connect(otherId);
      setTimeout(() => unsub());
      openConnection(conn).then(res);
    });
  });

peer.on('open', (/** @type {string} */ $id) => {
  id.set($id);
  if (!isHivemindBrain && hivemindBrain !== null) {
    connectTo(hivemindBrain);
  }
});
peer.on('connection', openConnection);

const subscriptions = [
  users.subscribe(($users) => {
    if (isHivemindBrain)
      emit({
        type: Messages.UPDATE_CLIENT_STATE,
        users: [...$users.map((u) => ({ ...u, conn: null })), get(self)],
      });
  }),
  self.subscribe(($self) => {
    log('own state changed', $self);
    if (isHivemindBrain)
      emit({
        type: Messages.UPDATE_CLIENT_STATE,
        users: [...get(users).map((u) => ({ ...u, conn: null })), $self],
      });
    else
      get(hivemindConnection)?.send({
        type: Messages.UPDATE_SERVER_STATE,
        name: $self.name,
        progress: $self.progress,
        solved: $self.solved,
      });
  }),
  gameProblem.subscribe(($problem) => {
    if ($problem === null) return;

    progress.set(null);
    solved.set(false);

    if (isHivemindBrain) {
      users.update((us) =>
        us.map((u) => ({ ...u, progress: null, solved: false }))
      );
      emit({
        type: Messages.NEW_PROBLEM,
        problem: $problem,
      });
    }
  }),
];

// @ts-ignore
if (window.$cryptoduel$subscriptions)
  // @ts-ignore
  window.$cryptoduel$subscriptions.forEach((u) => u());
// @ts-ignore
window.$cryptoduel$subscriptions = subscriptions;
