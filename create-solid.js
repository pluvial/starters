#!/usr/bin/env zx

import 'zx/globals';

await $`rm -rf solid`;
await $`mkdir -p solid`;
cd('solid');
const answers = $`echo bare; sleep 1; echo yes; sleep 1; echo yes; sleep 1; echo yes`;
await answers.pipe($`pnpm create solid bare`);
cd('..');
