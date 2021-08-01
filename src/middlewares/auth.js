import jwt from "jsonwebtoken";
import statusCodes from "../utils/statusCodes.js";
import messages from "../utils/messages.js";
import misc from "../helpers/misc.js";
import User from "../models/user.model.js";

const { forbidden, badRequest, notFound, serverError } = statusCodes;
const {
  invalidRequest,
  invalidToken,
  UsernameOrPasswordIncorrect,
  usernameTaken,
  emailTaken,
} = messages;
const { isPasswordValid } = misc;

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) {
    return res.status(forbidden).json({ message: invalidRequest });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(badRequest).json({ message: invalidToken });
  }
};

// Check is the username is taken
const checkUsernameTaken = async (req, res, next) => {
  User.findOne(
    { username: req.body.username },
    (error, userWithSameUsername) => {
      if (error) {
        return res.status(serverError).json({ message: error });
      } else if (userWithSameUsername) {
        return res.status(badRequest).json({ message: usernameTaken });
      } else {
        next();
      }
    }
  );
};

// Check if the email address is already taken
const checkEmailTaken = async (req, res, next) => {
  User.findOne({ email: req.body.email }, (error, userWithSameEmail) => {
    if (error) {
      return res.status(serverError).json({ message: error });
    } else if (userWithSameEmail) {
      return res.status(badRequest).json({ message: emailTaken });
    } else {
      next();
    }
  });
};

// Check login
const checkLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const userData = await User.findOne({ username: username });

  if (!userData) {
    return res.status(notFound).json({ message: UsernameOrPasswordIncorrect });
  }

  const passwordsMatch = await isPasswordValid(password, userData.password);

  if (!passwordsMatch) {
    return res.status(notFound).json({ message: UsernameOrPasswordIncorrect });
  }

  req.userData = userData;

  next();
};

export default {
  auth,
  checkUsernameTaken,
  checkEmailTaken,
  checkLogin,
};
