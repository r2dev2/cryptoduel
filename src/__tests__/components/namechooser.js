import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { get, writable } from 'svelte/store';
import { tick } from 'svelte';

import { NameChooser } from '@/components';

const testUsername = 'test-username-420';
const testUsername2 = 'test-username-69';

describe('<NameChooser />', () => {
  it('prompts for username', () => {
    const { getByText } = render(NameChooser, {});
    expect(getByText('Username')).toBeInTheDocument();
  });

  it('updates the global name state', async () => {
    const name = writable('');
    const { getByRole } = render(NameChooser, { name });
    const inputEl = getByRole('textbox');

    userEvent.type(inputEl, testUsername);
    await tick();
    expect(get(name)).toEqual(testUsername);
  });

  it('disables when the game has started', async () => {
    const gameProblem = writable(null);
    const name = writable('');
    const { getByRole } = render(NameChooser, { gameProblem, name });
    const inputEl = getByRole('textbox');

    userEvent.type(inputEl, testUsername);
    await tick();
    gameProblem.set({});
    await tick();
    userEvent.type(inputEl, testUsername2);
    await tick();
    expect(get(name)).toEqual(testUsername);
  });
});
