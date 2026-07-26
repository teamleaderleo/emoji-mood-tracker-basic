import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const repositoryRoot = path.resolve(new URL('..', import.meta.url).pathname);
const sourcePath = path.join(repositoryRoot, 'src/hooks/moodHistory.ts');
const source = await fs.readFile(sourcePath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
  fileName: sourcePath,
  reportDiagnostics: true,
});

const errors = (transpiled.diagnostics ?? []).filter(
  (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
);
if (errors.length > 0) {
  throw new Error(ts.formatDiagnosticsWithColorAndContext(errors, {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => repositoryRoot,
    getNewLine: () => '\n',
  }));
}

const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'emoji-mood-history-'));
try {
  const modulePath = path.join(temporaryDirectory, 'moodHistory.mjs');
  await fs.writeFile(modulePath, transpiled.outputText);
  const transitions = await import(`${pathToFileURL(modulePath).href}?run=${Date.now()}`);
  const at = (index) => new Date(`2026-07-26T00:00:0${index}.000Z`);
  const original = [
    { mood: '😊', timestamp: at(1) },
    { mood: '😢', timestamp: at(2) },
  ];

  const appended = transitions.appendMood(original, '🤩', at(3));
  assert.deepEqual(original.map((entry) => entry.mood), ['😊', '😢']);
  assert.deepEqual(appended.map((entry) => entry.mood), ['😊', '😢', '🤩']);
  assert.equal(transitions.currentMoodFromHistory(appended), '🤩');

  const afterLast = transitions.clearLastMood(appended);
  assert.deepEqual(afterLast.map((entry) => entry.mood), ['😊', '😢']);
  assert.equal(transitions.currentMoodFromHistory(afterLast), '😢');

  const block = Array.from({ length: 9 }, (_, index) => ({
    mood: String(index + 1),
    timestamp: at((index % 9) + 1),
  }));
  const afterBlock = transitions.clearLastMoodBlock(block);
  assert.deepEqual(afterBlock.map((entry) => entry.mood), ['1', '2']);
  assert.equal(transitions.currentMoodFromHistory(afterBlock), '2');

  assert.deepEqual(transitions.clearLastMoodBlock(block.slice(0, 4)), []);
  assert.equal(transitions.currentMoodFromHistory([]), transitions.DEFAULT_MOOD);
  assert.throws(() => transitions.clearLastMoodBlock(block, 0), RangeError);

  console.log('Mood history transition contract passed.');
} finally {
  await fs.rm(temporaryDirectory, { recursive: true, force: true });
}
