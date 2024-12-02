import jwt from "jsonwebtoken";

const addUserId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("userID: ", token);
    if (!token) {
      return res.status(404).json({
        success: "false",
        message: "User is not loggedIn!",
        tours: null,
      });
    }

    const isCustomToken = token.length < 500;

    if (token && isCustomToken) {
      //add a property inside the req.object:
      const decodedData = jwt.verify(token, process.env.JWT_KEY);

      req.userId = decodedData.id;

      // console.log(req.userId);
    }
    // else {
    //   //code for if google OAuth is done!
    // }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default addUserId;
