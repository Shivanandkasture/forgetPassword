const registerModel = require("../models/registerModel");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'shivanandkasture1415@gmail.com',
        pass:'ygdxqdjomrelglbd'
    }
}) 



const sendLink = async (req, res) => {

    try {

        console.log(req.body)

        const { email } = req.body;

        if (!email) {
            return res.status(401).send({ status: false, message: "Enter Your Email" })
        }

        const userfind = await registerModel.findOne({ email: email });
        console.log(userfind.id)

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, "SecretKey", {
            expiresIn: "120s"
        });

        const setusertoken = await registerModel.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });


        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).send({ status: false, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).send({ status: true, message: "Email sent Succsfully" })
                }
            })

        }

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

};


// verify user for forgot password time
const verifyforgetPassword = async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await registerModel.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, "SecretKey");

        console.log(verifyToken)

        if (validuser && verifyToken._id) {
            res.status(201).send({ status: true, validuser })
        } else {
            res.status(401).send({ status: false, message: "user not exist" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
};


// change password

const changePassword = async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await registerModel.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, "SecretKey");

        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);

            const setNewPassword = await registerModel.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setNewPassword.save();
            res.status(201).send({ status: true, setNewPassword })

        } else {
            res.status(401).send({ status: false, message: "user not exist" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.sendLink = sendLink

module.exports.verifyforgetPassword = verifyforgetPassword

module.exports.changePassword = changePassword


