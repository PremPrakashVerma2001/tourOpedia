import userSchema from "../schemas/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const saltRounds = parseInt(process.env.SALTROUNDS);
  const secret = process.env.JWT_KEY;

  const { email, password, username } = req.body;

  try {
    //check is user already exist:
    const oldUser = await userSchema.findOne({ email });
    if (oldUser) {
      return res.status(401).json({
        message: "User already exists 🤧",
        success: "false",
      });
    }

    //make a hashPass
    let hashPass = await bcrypt.hash(password, saltRounds);

    //create and save the user on db_collection:
    const newUser = await userSchema.create({
      username: username,
      password: hashPass,
      email: email,
    });

    //generate the jwt token for this new user:

    const token = jwt.sign({ email, username, id: newUser._id }, secret, {
      //properties related to token:
      expiresIn: "2h",
    });

    return res.status(201).json({
      success: "true",
      message: "SignUp successFully 😊",
      user: newUser,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      user: "null",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_KEY;

  try {
    const currUser = await userSchema.findOne({ email });

    if (!currUser)
      return res.status(400).json({
        success: "false",
        message: "Wrong email or Password!",
      });

    //if user exist then compare the password!
    const isPasswordMatched = await bcrypt.compare(password, currUser.password);

    if (!isPasswordMatched)
      return res.status(400).json({
        success: "false",
        message: "Wrong email or Password!",
      });

    //ab bnda agr logout hone ke baad login kr rha h to usko jwt toh dena pdega!
    const token = jwt.sign({ email, id: currUser._id }, secret, {
      //properties related to token:
      expiresIn: "2h",
    });

    return res.status(200).json({
      success: "true",
      message: "Login Succesfully 🚀",
      user: currUser.username,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      user: "null",
    });
  }
};

export { signup, login };
