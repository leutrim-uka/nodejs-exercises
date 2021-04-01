const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Prioriteti duhet te jete low, medium ose high'
        },
        required: true
    }
})

module.exports = new mongoose.model("Todo", TodoSchema);