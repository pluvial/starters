#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf vue`;
await $`mkdir -p vue`;
cd('vue');
// possible options:
// --default
// --typescript / --ts
// --jsx
// --router / --vue-router
// --pinia
// --with-tests / --tests (equals to `--vitest --cypress`)
// --vitest
// --cypress
// --nightwatch
// --playwright
// --eslint
// --eslint-with-prettier (only support prettier through eslint for simplicity)
// --force (for force overwriting)
await $`pnpm create vue default --default`;
cd('..');
