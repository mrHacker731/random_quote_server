const User = require("../model/authSchema");
const { getTime } = require("../utils/getTime");
const { success, error } = require("../utils/responseRapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.send(error(404, "all fields are required"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.send(error(400, "user already exists"));
    }

    const hash = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hash
    });
    return res.send(success(201, { user: newUser }));

}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send(error(404, "all fields are required"));
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.send(error(404, "No user found"));
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
        return res.send(error(400, "Invalid password"));
    }

    const currentTime = getTime();
    User.updateOne({ email }, { $push: { loginTime: currentTime } }).exec();

    const accessToken = jwt.sign({ name: user.name, id: user._id }, process.env.JWT_KEY)
    res.cookie("accessToken", accessToken, {
        httpOnly: true
    });

    return res.send(success(200, { accessToken }));
};


//get user by id
const getUserById = async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.send(error(400, "user not found"));
    }

    return res.send(success(200, user));
}


//reset password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.send(error(400, "User not found"));
        }

        const hash = bcrypt.hashSync(newPassword, 10);
        // Update the user's password
        user.password = hash;
        await user.save();

        return res.send(success(200, "Password reset successful"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

module.exports = {
    createNewUser,
    userLogin,
    getUserById,
    resetPassword
}