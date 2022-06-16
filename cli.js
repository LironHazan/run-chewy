#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const ChewyRunner = require('./lib/runner');

if (argv.isTS) {
    console.log("running")
    ChewyRunner.run({isTS: argv.isTS});
} else {
    console.log("supply the isTS arg to decide if running js or ts tests")
}


