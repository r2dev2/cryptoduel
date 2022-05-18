import '@testing-library/jest-dom';
import { noop } from 'svelte/internal';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { Word } from '@/components';

const testWord = "DON'T";

const testReplacement = Array(26).fill('');
testReplacement[14] = 'X'; // o -> x
testReplacement[19] = 'B'; // t -> b

// a replacement array in which both n and o decode to x
const testDuplicateReplacement = [...testReplacement];
testDuplicateReplacement[13] = 'X'; // n -> x

const getDecrypted = (el) =>
  el.parentElement.querySelector('.decrypted-letter');

const getDecryptedInput = (el) =>
  el.parentElement.querySelector('.decrypted-letter input');

const getPair = (el) => el.parentElement;

describe('<Word />', () => {
  it('displays all letters of the word', () => {
    const { getByText } = render(Word, { word: testWord });
    for (const letter of testWord) {
      expect(getByText(letter)).toBeInTheDocument();
    }
  });

  it('shows all replaced letters', () => {
    const { getByDisplayValue } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    for (const letter of ['X', 'B']) {
      expect(getByDisplayValue(letter)).toBeInTheDocument();
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

    userEvent.type(getDecryptedInput(getByText('N')), 'E');

    expect(fired).toBe(1);
  });

  it('stops firing replace events when disabled', () => {
    const { getByText, component } = render(Word, {
      word: testWord,
      disabled: true,
    });
    const cb = jest.fn();

    component.$on('replace', cb);

    // I don't like the red text lmao
    const x = console.error;
    console.error = noop;
    userEvent.type(getDecryptedInput(getByText('N')), 'E');
    console.error = x;

    expect(cb).not.toHaveBeenCalled();
  });

  it('marks duplicate replacements', () => {
    const { getByText } = render(Word, {
      word: testWord,
      replacement: testDuplicateReplacement,
    });

    const [o, n, t] = ['O', 'N', 'T'].map(getByText).map(getPair);
    expect(o).toHaveClass('duplicate');
    expect(n).toHaveClass('duplicate');
    expect(t).not.toHaveClass('duplicate');
  });

  it('identifies for each letter when there is no replacement', () => {
    const { getByText } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    const [d, o, n, t] = ['D', 'O', 'N', 'T'].map(getByText).map(getDecrypted);
    expect(d).toHaveClass('empty');
    expect(o).not.toHaveClass('empty');
    expect(n).toHaveClass('empty');
    expect(t).not.toHaveClass('empty');
  });

  it('prohibits typing the same letter as a replacement', () => {
    const { getByText, component } = render(Word, {
      word: testWord,
      replacement: testReplacement,
    });

    const cb = jest.fn();
    const errcb = jest.fn();

    component.$on('replace', cb);
    component.$on('error', errcb);
    userEvent.type(getDecryptedInput(getByText('N')), 'N');

    expect(cb).not.toHaveBeenCalled();
    expect(errcb).toHaveBeenCalled();
  });
});
