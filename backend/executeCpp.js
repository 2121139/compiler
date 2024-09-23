const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath}`, (compileError, compileStdout, compileStderr) => {
            if (compileError) {
                reject({ error: compileError, stderr: compileStderr });
            } else {
                exec(`${outPath}`, (runError, runStdout, runStderr) => {
                    if (runError) {
                        reject({ error: runError, stderr: runStderr });
                    } else {
                        resolve(runStdout);
                    }
                });
            }
        });
    });
};

module.exports = {
    executeCpp
};

