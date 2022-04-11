import { alphabet, getQuoteGenerator, toAristocratCipher } from '@/js/quotes.js';

const getFetchMock = respond => async url => ({
  json: async () => respond(url)
});

const mockFetchResponse = respond => window.fetch = getFetchMock(respond);

const remoteTestQuotes = [
  { quoteText: 'Though shalt not pass.', quoteAuthor: 'anon' },
  { quoteText: 'The quick brown fox jumps over the lazy dog.', quoteAuthor: 'me' },
  { quoteText: 'I don\'t like sand.', quoteAuthor: 'Anakin Skywalker' },
];

const ramTestQuotes = [
  { text: 'Though shalt not pass.', author: 'anon' },
  { text: 'The quick brown fox jumps over the lazy dog.', author: 'me' },
  { text: 'I don\'t like sand.', author: 'Anakin Skywalker' },
];

const MANY_TRIES = 1e2;

describe('quote generator', () => {
  it('generates quotes', async () => {
    let fired = 0;
    mockFetchResponse(url => {
      expect(url).toMatch(/quotes\/\d+\.json$/);
      fired++;
      return remoteTestQuotes;
    });

    const newQuote = getQuoteGenerator();
    const quote = await newQuote();

    expect(remoteTestQuotes).toContainEqual({
      quoteAuthor: quote.author, quoteText: quote.text
    });
    expect(fired).toBe(1);
  });

  it('does not give a given quote until all quotes have been generated', async () => {
    mockFetchResponse(() => remoteTestQuotes);

    const newQuote = getQuoteGenerator();
    const quotesSeen = new Set();
    for (let attempt = 0; attempt < MANY_TRIES; ++attempt) {
      if (quotesSeen.size == remoteTestQuotes.length) quotesSeen.clear();
      const generatedQuote = await newQuote();
      expect(quotesSeen).not.toContainEqual(generatedQuote);
      quotesSeen.add(generatedQuote);
    }
  });
});

describe('quote to aristocrat cipher', () => {
  const testCases = ramTestQuotes.map(q => [q, toAristocratCipher(q)]);
  const forEach = (quote, cipher, cb) => {
    for (let i = 0; i < quote.text.length; ++i) {
      cb(quote.text[i].toUpperCase(), cipher.ciphertext[i]);
    }
  };

  it.each(testCases)('converts text to uppercase', (quote, cipher) => {
    expect(cipher.plaintext).toEqual(cipher.plaintext.toUpperCase());
    expect(cipher.ciphertext).toEqual(cipher.ciphertext.toUpperCase());
  });

  it.each(testCases)('does a monoalphabetic encryption', (quote, cipher) => {
    expect(quote.text.length).toBe(cipher.ciphertext.length);
    const replacements = new Map(); // cipher -> replacment
    forEach(quote, cipher, (quoteC, cipherC) => {
      if (alphabet.includes(quoteC)) {
        const newReplacement = (replacements.get(quoteC) ?? new Set());
        newReplacement.add(cipherC);
        replacements.set(quoteC, newReplacement);
        expect(newReplacement.size).toBe(1);
      }
    });
    expect(replacements.size).toBeGreaterThan(1); // make sure test code works
  });

  it.each(testCases)('does not decode any letter to itself', (quote, cipher) => {
    forEach(quote, cipher, (quoteC, cipherC) => {
      if (alphabet.includes(quoteC)) {
        expect(quoteC).not.toEqual(cipherC);
      }
    });
  });
});
