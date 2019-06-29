const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    login: function (req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (!userInfo) {
                    res.json({ status: "error", message: "Invalid Email Id!", data: null });
                }
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
                } else {
                    res.json({ status: "error", message: "Invalid Password!!!", data: null });
                }
            }
        });
    },
}