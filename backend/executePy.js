const { exec } = require("child_process");

const executePy = (filepath) => {
    return new Promise((resolve, reject) => {
        if (!filepath) {
            reject(new Error('Filepath is not provided'));
            return;
        }
        
        exec(`python ${filepath}`, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing Python script:", error);
                // Check if stderr contains "SyntaxError" string
                if (stderr.includes("SyntaxError")) {
                    reject(new SyntaxError(stderr)); // If SyntaxError, reject with SyntaxError instance
                } else {
                    reject({ error, stderr }); // Otherwise, reject with general error
                }
            } else {
                console.log("Python script executed successfully:", stdout);
                resolve(stdout);
            }
        });
    });
};

module.exports = {
    executePy
};