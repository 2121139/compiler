// const mongoose = require('mongoose');

// const codeSchema = new mongoose.Schema({
//     code: {
//         type: String,
//         required: true
//     }
// });

// const CodeModel = mongoose.model("Code", codeSchema);

// module.exports = CodeModel;

const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    file: {
        type: String // Assuming storing file path
    }
});

const CodeModel = mongoose.model("Code", codeSchema);

module.exports = CodeModel;

