module.exports = function(app) {
    var user = require('../controllers/userController');
    app
        .route("/users/new")
        .post(user.createNewUser);
    app
        .route("/users/edit")
        .put(user.edit_by_id);
    
    app
        .route("/users/delete")
        .delete(user.delete_by_id);

    app
    .route("/users/all")
    .get(user.getallusers)

    }
    

    