const registerModel = require("../models/registerModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSignup = async (req, res) => {
  try {

    let data = req.body
    const { email, password } = data


    if (!email || !password) return res.status(400).send({ status: false, message: "please enter email and password." })

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, message: "Email is invalid." });

    let emailAlreadyExists = await registerModel.findOne({ email });

    if (emailAlreadyExists) return res.status(400).send({ status: false, message: "Email has already been registered." });


    if (!/^[A-Za-z\d@$!%*?&]{8,15}$/.test(password))
      return res.status(400).send({
        status: false,
        message:
          "Password should consist a minimum of 8 characters and a maximum of 15 characters.",
      });

    const saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds)
    let userHash = hash

    data.password = userHash;

    console.log(data.password)

    const createUser = await registerModel.create(data)

    return res.status(201).send({ status: true, message: "user register.", data: createUser })


  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });

  }
}


const userLogin = async function (req, res) {
  try {

    let data = req.body
    const { email, password } = data


    console.log(req.body)
    if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, message: "please enter emailId and password" }) }

    if (!email || !password) return res.status(400).send({ status: false, message: "please enter email and password." });

    let user = await registerModel.findOne({ email });
    console.log(user.password)

    if (!user) return res.status(401).send({ status: false, message: "Email Id not correct" })

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      console.log(validPassword)

      if (!validPassword) return res.status(401).send({ status: false, message: "Invalid Password" })
    }

    let token = jwt.sign({ userId: user._id.toString() }, "SecretKey", { expiresIn: "24h" });

    const rootUser = await registerModel.findOne({_id:token._id});
        
    if(!rootUser) {return res.status(400).send({status:false, message:"user not found"})}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    console.log(token, user._id.toString())

    res.setHeader("x-api-key", token);

    return res.status(200).send({ status: true, message: "Success", data: { userId: user._id, token: token } });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};


const getUser = async (req, res) => {

  try {

    let { email } = req.body;

    let user = await registerModel.findOne({ email });

    return res.status(200).send({ status: true, data: user })

  } catch (error) {
    return res.status(500).send({ status: false, message: err.message });

  }

}

module.exports.userSignup = userSignup;

module.exports.userLogin = userLogin;

module.exports.getUser = getUser;
