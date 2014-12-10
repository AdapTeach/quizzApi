var mongoose = require('mongoose-q')(require('mongoose')),
    Quiz = mongoose.model('Quiz'),
    error = require;

module.exports = {
    findAll : function findall(request, response){
        Quiz
            .find({ creator : request.user._id })
            .execQ()
            .then(function(questions){
                response.json(questions);
            })
            .catch(error.handle(response));
    },
    findOne: function findOne(request, response){
        Quiz
            .findOne({ _id : request.param._id })
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    create: function create(request,response){
        var newQuestion = new Quiz(request.body);
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
            query = Quiz.findOneAndUpdate({ _id : request.params._id },request.body);
        }else{
            var id = request.body._id;
            delete request.body._id;
            query = Quiz.findOneAndUpdate({ _id : id },request.body);
        }
        query
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    remove: function remove(request,response){
        Quiz
            .delete({ _id : request.param._id })
            .execQ()
            .then(function(question){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    addQuestion: function addQuestion(request,response){
        Quiz
            .findOneAndUpdate({ _id : request.params.id},{$push: { questions : request.params.questionId }})
            .then(function(){
                response.json(question);
            })
            .catch(error.handle(response));
    },
    removeQuestion: function removeQuestion(request,response){
        Quiz
            .findOneAndUpdate({ _id : request.params.id},{$pull: { questions : request.params.questionId }})
                .then(function(){
                    response.json(question);
                })
                .catch(error.handle(response));
    },
    answerQuestion: function answerQuestion(request,response){

    }
};