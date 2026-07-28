#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function usage() {
  console.error("Usage: node scripts/transcript-to-srt.mjs <transcript.json> <output.srt>");
  process.exit(1);
}

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) usage();

const segments = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!Array.isArray(segments)) throw new Error("Transcript must be an array of segments.");

function timestamp(seconds) {
  const ms = Math.max(0, Math.round(seconds * 1000));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const z = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(z).padStart(3, "0")}`;
}

function cleanWord(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function wrap(text, width = 42) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line) line = word;
    else if (`${line} ${word}`.length <= width) line += ` ${word}`;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length <= 2 ? lines : [lines[0], lines.slice(1).join(" ")];
}

function cuesForSegment(segment) {
  const speaker = segment.speaker ? `${segment.speaker}: ` : "";
  const words = Array.isArray(segment.words) ? segment.words.filter((w) => cleanWord(w.word)) : [];
  if (!words.length) {
    return [{
      start: Number(segment.start) || 0,
      end: Number(segment.end) || Number(segment.start) + 2,
      text: `${speaker}${cleanWord(segment.text)}`
    }];
  }

  const cues = [];
  let cueWords = [];
  let cueStart = Number(words[0].start ?? segment.start ?? 0);

  for (const word of words) {
    const value = cleanWord(word.word);
    const nextText = `${speaker}${[...cueWords, value].join(" ")}`;
    const duration = Number(word.end ?? word.start ?? cueStart) - cueStart;
    if (cueWords.length && (nextText.length > 84 || duration > 6)) {
      const last = words[Math.max(0, words.indexOf(word) - 1)];
      cues.push({
        start: cueStart,
        end: Number(last?.end ?? word.start ?? cueStart + 2),
        text: `${speaker}${cueWords.join(" ")}`
      });
      cueWords = [];
      cueStart = Number(word.start ?? word.end ?? cueStart);
    }
    cueWords.push(value);
  }

  if (cueWords.length) {
    cues.push({
      start: cueStart,
      end: Number(words.at(-1)?.end ?? segment.end ?? cueStart + 2),
      text: `${speaker}${cueWords.join(" ")}`
    });
  }
  return cues;
}

const cues = segments.flatMap(cuesForSegment).filter((cue) => cue.text.trim());
const body = cues.map((cue, index) => {
  const lines = wrap(cue.text);
  return `${index + 1}\n${timestamp(cue.start)} --> ${timestamp(Math.max(cue.end, cue.start + 0.5))}\n${lines.join("\n")}`;
}).join("\n\n");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${body}\n`, "utf8");
console.log(`Wrote ${cues.length} cues to ${outputPath}`);
