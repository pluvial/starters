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
await $`nuxi init v3 --template v3 --packageManager pnpm --no-install --no-gitInit`;
cd('..');
