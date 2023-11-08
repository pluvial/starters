#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf astro`;
await $`mkdir -p astro`;
cd('astro');

// | Name                         | Description                                            |
// | :--------------------------- | :----------------------------------------------------- |
// | `--help` (`-h`)              | Display available flags.                                |
// | `--template <name>`          | Specify your template.                                 |
// | `--install` / `--no-install` | Install dependencies (or not).                         |
// | `--git` / `--no-git`         | Initialize git repo (or not).                          |
// | `--yes` (`-y`)               | Skip all prompts by accepting defaults.                |
// | `--no` (`-n`)                | Skip all prompts by declining defaults.                |
// | `--dry-run`                  | Walk through steps without executing.                  |
// | `--skip-houston`             | Skip Houston animation.                                |
// | `--ref`                      | Specify an Astro branch (default: latest).             |
// | `--fancy`                    | Enable full Unicode support for Windows.               |
// | `--typescript <option>`      | TypeScript option: `strict` / `strictest` / `relaxed`. |

const templates = [
  'basics',
  'blog',
  'component',
  'framework-alpine',
  'framework-lit',
  'framework-multiple',
  'framework-preact',
  'framework-react',
  'framework-solid',
  'framework-svelte',
  'framework-vue',
  'hackernews',
  'integration',
  'middleware',
  'minimal',
  'non-html-pages',
  'portfolio',
  'ssr',
  'view-transitions',
  'with-markdoc',
  'with-markdown-plugins',
  'with-markdown-shiki',
  'with-mdx',
  'with-nanostores',
  'with-tailwindcss',
  'with-vite-plugin-pwa',
  'with-vitest',
];

const base = '@pluvial';
await $`mkdir -p ${base}`;

const failed = [];
for (const template of templates) {
  try {
    const name = `${base}/astro-${template}`;
    await $`pnpm create astro ${name} -y --template ${template} --no-install --no-git --typescript strictest`;
    await $`mv ${name} ${template}`;
  } catch {
    failed.push(template);
  }
}

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

await $`rmdir ${base}`;

cd('..');
