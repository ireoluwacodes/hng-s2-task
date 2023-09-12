const expressAsyncHandler = require("express-async-handler");
const { User } = require("./model");
const { default: mongoose } = require("mongoose");

const Create = expressAsyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Enter required fields");
    }
    const user = await User.create({
      name,
    });
    return res.status(201).json({
      status: true,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const Read = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == " ") {
      res.status(400);
      throw new Error("please input valid id in params");
    }
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    }
    user = await User.findOne({ name: id });
    return res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const Update = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || id == " " || !name) {
      res.status(400);
      throw new Error(
        "please input valid id in params and enter all other required fields"
      );
    }
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findByIdAndUpdate(
        id,
        {
          name,
        },
        {
          new: true,
        }
      );
    }
    user = await User.findOneAndUpdate(
      { name: id },
      {
        name,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const Delete = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id == " ") {
      res.status(400);
      throw new Error("please input valid id in params");
    }
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findByIdAndDelete(id);
    }
    user = await User.findOneAndDelete({ name: id });
    return res.status(200).json({
      status: true,
     message : "deleted"
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  Create,
  Read,
  Update,
  Delete,
};
