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
// await $`pnpm create astro basics --template basics --no-install --no-git --typescript strict`;
await $`pnpm create astro basics -y --template basics --no-install --no-git`;
cd('..');
