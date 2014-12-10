var q = require('q'),
    mongoose = require("mongoose-q")(require('mongoose')),
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
            type: Schema.ObjectId,
            ref: 'Answer'
        }],
        creator : {
            type : String,
            required : 'creator is required'
        }
    }),
    Answer = require('./answer.model');

QuestionSchema.statics.createAnswer = function(questionId,answer){
    var deferred = q.defer();
    var newAnswer = new Answer(answer);
    newAnswer.saveQ()
        .then(function (createdAnswer) {
            this.findOneAndUpdate({_id: questionId}, {$push: {answers: createdAnswer._id}})
                .execQ()
                .then(function () {
                    deferred.resolve(createdAnswer);
                });
        })
        .catch(function (err) {
            deferred.reject(err);
        });
    return deferred.promise;
};

QuestionSchema.statics.removeAnswer = function(questionId,answerId){
    return q.all([
        this.findOneAndUpdate({_id: questionId}, {$pull: {answers: answerId}}),
        Answer.remove(answerId)
    ]);
};

module.exports = mongoose.model('Question',QuestionSchema);