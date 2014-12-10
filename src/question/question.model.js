var mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    QuestionSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: 'name is required'
        },
        type: {
            type: String,
            required: 'type is required'
        },
        questions: {
            type: String,
            required: 'question is required'
        },
        answers: [{
            isCorrect: Boolean,
            text: String,
            url: String
        }],
        creator : {
            type : String,
            required : 'creator is required'
        }
    });

module.exports = mongoose.model('Question',QuestionSchema);