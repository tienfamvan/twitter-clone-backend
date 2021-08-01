import User from "../models/user.model.js";
import misc from "../helpers/misc.js";
import statusCodes from "../utils/statusCodes.js";
import messages from "../utils/messages.js";

const { success, created, serverError } = statusCodes;
const { createdSuccessfully, loggedInSuccessfully } = messages;

const { generateToken, generateHashedPassword } = misc;

export default class AuthController {
  static signUp = async (req, res) => {
    try {
      const newUser = { ...req.body };

      const hashedPassword = await generateHashedPassword(newUser.password);

      newUser.password = hashedPassword;

      await User.create(newUser);

      return res.status(created).json({ message: createdSuccessfully });
    } catch (error) {
      return res.status(serverError).json({ message: error });
    }
  };

  static login = async (req, res) => {
    try {
      const userData = req.userData;
      const tokenData = {
        id: userData._id,
        username: userData.username,
      };

      const token = await generateToken(tokenData);

      return res
        .status(success)
        .json({ message: loggedInSuccessfully, token, userData });
    } catch (error) {
      return res.status(serverError).json({ message: error });
    }
  };

  static getAccount = async (req, res) => {
    try {
      const userData = req.user;

      const user = await User.findOne(
        { username: userData.username },
        {
          profileImage: 1,
          likes: 1,
          following: 1,
          bookmarks: 1,
          username: 1,
          retweets: 1,
          name: 1,
          followers: 1,
          theme: 1,
        }
      );

      return res.status(success).json({ userData: user });
    } catch (error) {
      return res.status(serverError).json({ message: error });
    }
  };
}
