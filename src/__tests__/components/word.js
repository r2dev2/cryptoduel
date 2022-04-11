import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { Word } from '@/components';

const testWord = "DON'T";
const testReplacement = Array(26).fill('');
testReplacement[14] = 'X'; // o -> x
testReplacement[19] = 'B'; // t -> b

const getDecrypted = (el) =>
  el.parentElement.querySelector('.decrypted-letter');

describe('<Word />', () => {
  it('displays all letters of the word', () => {
    const { getByText } = render(Word, { word: testWord });
    for (const letter of testWord) {
      expect(getByText(letter)).toBeInTheDocument();
    }
  });

  it('shows all replaced letters', () => {
    const { getByText } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    for (const letter of ['X', 'B']) {
      expect(getByText(letter)).toBeInTheDocument();
    }
  });

  it('does not show non-replaceable characters', () => {
    const { getByText } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    const adjacentElement = getDecrypted(getByText("'"));

    expect(adjacentElement).not.toBeVisible();
    expect(adjacentElement).toHaveClass('non-alphabetic');
  });

  it('fires correct replace events', () => {
    const { getByText, component } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    let fired = 0;

    component.$on('replace', (e) => {
      expect(e.detail.from).toEqual('N');
      expect(e.detail.to).toEqual('E');
      fired++;
    });

    userEvent.type(getDecrypted(getByText('N')), 'E');

    expect(fired).toBe(1);
  });

  it('stops firing replace events when disabled', () => {
    const { getByText, component } = render(Word, {
      word: testWord,
      disabled: true,
    });
    const cb = jest.fn();

    component.$on('replace', cb);
    userEvent.type(getDecrypted(getByText('N')), 'E');

    expect(cb).not.toHaveBeenCalled();
  });
});
