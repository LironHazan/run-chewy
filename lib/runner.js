const workerThreads = require('node:worker_threads');
const swc = require('@swc/core');
const fs = require('fs');
const path = require('path');

function grabFilesSync(currentDirPath) {
    const files = [];

    const walker = (_path, cb) => {
        fs.readdirSync(_path).forEach((name) => {
            const filePath = path.join(_path, name);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
                if (filePath.match(/.*.spec.ts|.*.test.ts|.*.spec.js|.*.test.js/)) {
                    cb(filePath);
                }
            } else if (stat.isDirectory()) {
                walker(filePath, cb);
            }
        });
    };

    walker(currentDirPath, (filePath) => {
        files.push(filePath);
    });
    return files;
}
function initOptions(config) {
    return {
        isModule: true,
        module: {
            type: "commonjs"
        },
        jsc: {
            target: "es2020",
            parser: config.isTS ? {syntax: "typescript"} : {syntax: "ecmascript"},
            transform: null,
        }
    }
}

class ChewyRunner {
    static run(config) {
        if (workerThreads.isMainThread) {
            const tests = grabFilesSync(process.cwd());
            for (const t of tests) {
                console.log("Running ", t); //todo add colors and formats

                fs.promises.readFile(t)
                    .then((buff) => swc.transform(buff.toString(), initOptions(config)))
                    .then((output) => {
                        const worker = new workerThreads.Worker(output.code, { eval: true });
                        worker.on('exit', (c) => console.log('done')); // todo better error handling
                    });
            }
        }
    }
}
module.exports = ChewyRunner;



