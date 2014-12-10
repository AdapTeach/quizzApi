var quizCtrl = require('./quiz.ctrl'),
    auth = require('../auth/auth.middleware');


module.exports = function(app){
    app.route('/quiz')
        .get(auth.ensureAuthenticated,quizCtrl.findAll)
        .post(auth.ensureAuthenticated,quizCtrl.create)
        .put(auth.ensureAuthenticated,quizCtrl.update);

    app.route('/quiz/:id')
        .get(auth.ensureAuthenticated,quizCtrl.findOne)
        .put(auth.ensureAuthenticated,quizCtrl.update)
        .delete(auth.ensureAuthenticated,quizCtrl.remove);

    app.route('/quiz/:id/question/:questionId/add')
        .put(auth.ensureAuthenticated,quizCtrl.addQuestion);

    app.route('/quiz/:id/question/:questionId/remove')
        .put(auth.ensureAuthenticated,quizCtrl.removeQuestion);

    app.route('/quiz/:id/question/:id/answer')
        .post(auth.ensureAuthenticated,quizCtrl.answerQuestion);
};