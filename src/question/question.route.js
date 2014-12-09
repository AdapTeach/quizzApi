var questionCtrl = require('./question.ctrl');

module.exports = function(app){
    app.route('/question')
        .get(questionCtrl.findAll)
        .post(questionCtrl.create)
        .put(questionCtrl.update);

    app.route('/question/:id')
        .get(questionCtrl.findOne)
        .put(questionCtrl.update)
        .delete(questionCtrl.remove);

};