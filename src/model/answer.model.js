var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    AnswerSchema = new Schema({
        text: {
            type: String
        },
        url: {
            type: String
        },
        type: {
            type: String
        },
        isCorrect: {
          type: Boolean
        },
        creator : {
            type : String,
            required : 'creator is required'
        }
    });

module.exports = mongoose.model('Answer',AnswerSchema);