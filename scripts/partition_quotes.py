try:
    import ujson as json
except:
    import json

from pathlib import Path

root = Path(__file__).parent / "../public/quotes"
src = Path(__file__).parent / "../src"

with open(root / "all.json", "r") as fin:
    quotes = json.load(fin)

chunk_size = 500
amount_chunks = 0

for i in range(len(quotes) // chunk_size + 1):
    with open(root / f"{i}.json", "w+") as fout:
        json.dump(quotes[i * chunk_size:(i + 1) * chunk_size], fout)
    amount_chunks += 1

with open(src / "meta.js", "w+") as fout:
    print(f"""
export const amountQuotes = {len(quotes)};
export const amountChunks = {amount_chunks};
""".lstrip(), file=fout)
