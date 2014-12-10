var mongoose = require("mongoose-q")(require('mongoose')),
    Schema = mongoose.Schema,
    QuizSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: 'name is required'
        },
        creator : {
            type : String,
            required : 'creator is required'
        },
        questions: [{
            type: Schema.ObjectId,
            ref: 'Question'
        }]
    });


module.exports = mongoose.model('Quiz',QuizSchema);