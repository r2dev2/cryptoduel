import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { ReplacementTable } from '@/components';
import { alphabet } from '@/js/constants.js';

const testReplacement = Array(26).fill('');
testReplacement[14] = 'X'; // o -> x
testReplacement[19] = 'B'; // t -> b

// a replacement array in which both n and o decode to x
const testDuplicateReplacement = [...testReplacement];
testDuplicateReplacement[13] = 'X'; // n -> x

const getDecrypted = (el) =>
  el.parentElement.querySelector('.replacement-letter');

describe('<ReplacementTable />', () => {
  it('displays all letters of the alphabet', () => {
    const { getByText } = render(ReplacementTable);

    for (const ch of alphabet) {
      expect(getByText(ch)).toBeInTheDocument();
    }
  });

  it('displays replacement for each letter', () => {
    const { getByText } = render(ReplacementTable, {
      replacement: testReplacement,
    });

    expect(getDecrypted(getByText('O')).textContent).toEqual('X');
    expect(getDecrypted(getByText('T')).textContent).toEqual('B');
  });

  it('dispatches a change letter event on replace', () => {
    const { getByText, component } = render(ReplacementTable, {
      quote: 'NICE',
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
});
