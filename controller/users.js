const userModel = require('../models/users');
module.exports = {
    create: function (req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            }
            if (userInfo) {
                return res.json({ status: "error", message: "email id already exists", data: null });
            }
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
                if (err)
                    next(err);
                else
                    res.json({ status: "success", message: "User added successfully!!!", data: null });

            });
        });

    },

}