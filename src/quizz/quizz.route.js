var questionCtrl = require('./quizz.ctrl');

module.exports = function(app){
    app.route('/quizz')
        .get(questionCtrl.findAll)
        .post(questionCtrl.create)
        .put(questionCtrl.update);

    app.route('/quizz/:id')
        .get(questionCtrl.findOne)
        .put(questionCtrl.update)
        .delete(questionCtrl.remove);

};