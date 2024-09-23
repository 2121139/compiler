const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, "codes");

// Ensure that the directory for saving codes exists, or create it recursively
try {
    if (!fs.existsSync(dirCodes)) {
        fs.mkdirSync(dirCodes, { recursive: true });
    }
} catch (error) {
    console.error("Error creating directory:", error);
}

const generateFile = async (format, content) => {
    // Validate input parameters
    if (!format || !content) {
        throw new Error("Both 'format' and 'content' must be provided.");
    }
    if (typeof format !== "string" || typeof content !== "string") {
        throw new Error("Both 'format' and 'content' must be strings.");
    }

    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);

    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, content, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filepath);
            }
        });
    });
};

module.exports = {
    generateFile,
};
