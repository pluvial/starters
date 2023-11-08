#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf nuxt`;
await $`mkdir -p nuxt`;
cd('nuxt');

// Option        | Default          | Description
// -------------------------|-----------------|------------------
// `--template, -t` | `v3` | Specify template name or git repository to use as a template. Format is `gh:org/name` to use a custom github template.
// `--force`      | `false` | Force clone to any existing directory.
// `--offline`   | `false` | Do not attempt to download from github and only use local cache.
// `--prefer-offline` | `false` | Try local cache first to download templates.
// `--shell` | `false` | Open shell in cloned directory (experimental).

// USAGE nuxi init [OPTIONS] [DIR]
// ARGUMENTS
//   DIR    Project directory
// OPTIONS
//              --cwd    Current working directory
//         --logLevel    Log level
//     -t, --template    Template name
//        -f, --force    Override existing directory
//          --offline    Force offline mode
//    --preferOffline    Prefer offline mode
//       --no-install    Skip installing dependencies
//          --gitInit    Initialize git repository
//            --shell    Start shell after installation in project directory
//   --packageManager    Package manager choice (npm, pnpm, yarn, bun)

const templates = [
  'v3',
  'module',
  'module-devtools',
  'layer',
  'content',
  'ui',
  'v2-bridge',
  'v2',
  'doc-driven',
  'community/sidebase',
  'themes/alpine',
  'themes/content-wind',
  'themes/docus',
  'themes/new',
  'themes/new-tailwind',
  'themes/new-uno',
];

const failed = [];
for (const template of templates) {
  try {
    await $`nuxi init ${template} --template ${template} --packageManager pnpm --no-install --no-gitInit`;
  } catch {
    failed.push(template);
  }
}

if (failed.length > 0) {
  console.warn(`Failed templates: ${failed}`);
}

cd('..');
