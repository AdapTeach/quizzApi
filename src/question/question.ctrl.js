var mongoose = require('mongoose-q')(require('mongoose')),
    Question = mongoose.model('Question'),
    error = require('../error/HttpError');

module.exports = {
    findAll : function findall(request, response){
        Question
            .find({ creator : request.user._id })
            .execQ()
            .then(function(questions){
                response.json(questions);
            })
            .catch(error.handle(response));
    },
    findOne: function findOne(request, response){
        Question
            .findOne({ _id : request.param._id })
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    create: function create(request,response){
        var newQuestion = new Question(request.body);
        newQuestion
            .save()
            .execQ()
            .then(function(){

            })
            .catch(error.handle(response));
    },
    update: function update(request,response){
        var query;
        if(request.params.id){
            query = Question.findOneAndUpdate({ _id : request.params._id },request.body);
        }else{
            var id = request.body._id;
            delete request.body._id;
            query = Question.findOneAndUpdate({ _id : id },request.body);
        }
        query
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    remove: function remove(request,response){
        Question
            .delete({ _id : request.param._id })
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    addAnswer: function addAnswer(request,response){
        Question
            .createAnswer(request.params.id,request.body)
            .then(function(answer){
                response.json(answer);
            })
            .catch(error.handle(response));
    },
    removeAnswer: function removeAnswer(request,response){
        Question
            .removeAnswer(request.params.id,request.params.answerId)
            .then(function(){
                response.status(200).send('answer removed');
            })
            .catch(error.handle(response));
    }
};