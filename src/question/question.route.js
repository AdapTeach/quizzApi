var questionCtrl = require('./question.ctrl'),
    auth = require('../auth/auth.middleware');

module.exports = function(app){
    app.route('/question')
        .get(auth.ensureAuthenticated,questionCtrl.findAll)
        .post(auth.ensureAuthenticated,questionCtrl.create)
        .put(auth.ensureAuthenticated,questionCtrl.update);

    app.route('/question/:id')
        .get(auth.ensureAuthenticated,questionCtrl.findOne)
        .put(auth.ensureAuthenticated,questionCtrl.update)
        .delete(auth.ensureAuthenticated,questionCtrl.remove);

    app.route('/question/:id/answer')
        .post(auth.ensureAuthenticated,questionCtrl.addAnswer);

    app.route('/question/:id/answer/:id')
        .delete(auth.ensureAuthenticated,questionCtrl.removeAnswer);
};