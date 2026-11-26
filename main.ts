// internet-in-one-word: write the one word for the whole internet to
// /output/entry.txt.
//
// The word is candidate E from REFERENCES.md (audition): everyone is
// performing for an audience that isn't watching — 8 characters, under
// the 30-character cap, single word. To submit a different candidate
// instead, change the WORD constant below (all six candidates, with
// exact counts, are in REFERENCES.md). This program writes the word
// exactly, no trailing newline, so two runs write identical bytes.
// No network, no randomness, Node 22 standard library only.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "audition";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, WORD, "utf8");
chmodSync(out, 0o644);
// Read it back and fail loudly if the bytes are not exactly WORD: the
// harness counts bytes (1-30), so a stray newline or encoding slip here
// would silently change the entry.
if (readFileSync(out, "utf8") !== WORD) {
  throw new Error("entry.txt does not match WORD exactly");
}
console.log("wrote /output/entry.txt");
