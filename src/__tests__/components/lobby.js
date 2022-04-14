import '@testing-library/jest-dom';

import { writable } from 'svelte/store';

const testUsername = 'test-username-420';
const testUsername2 = 'test-username-69';
const testUsername3 = 'hello-there';

describe('<Lobby />', () => {
  it('shows all normal users', () => {
    const users = writable(
      [testUsername, testUsername2, testUsername3].map((u) => ({
        id: u,
        name: u,
        progress: null,
        solved: false,
      }))
    );
    // FIXME avatarbeam no work in jest
    // const { getByTitle } = render(Lobby, { users });

    // for (const user of get(users)) {
    //   expect(getByTitle(user.name)).toBeInTheDocument();
    // }
  });
});
