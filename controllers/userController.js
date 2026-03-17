const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Error in get User Api",
      });
    }
    //hide password
    user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "User Info Successfully Get",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
    });
  }
};

const getUpdateController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const { userName, email, phone, address } = req.body;

    if (!userName) {
      return res.status(400).send({
        success: false,
        message: "Username is required",
      });
    }

    if (userName) user.username = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update API",
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in resetPassword API",
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //finding User
    const user = await userModel.findById(req.userId);
    //Validations
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields.OldPassword or NewPassword",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword,user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials(Wrong old Password)",
      });
    }
    user.password=newPassword;
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save()

    res.status(200).send({
      success:true,
      message:'Password Updated Successfully'
    })

    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Password API",
      error,
    });
  }
};

const deleteUserController=async(req,res)=>{
  try {
     await userModel.findByIdAndDelete(req.params.id)
     return res.status(200).send({
      success:true,
      message:'User profile deleted successfully'
     })
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success:'false',
      message:'Error in Delete User API',
      error
    })
  }
}

const logoutController=async(req,res)=>{
   try {
       return res.status(200).send({
        succes:true,
        message:'You have been logged out'
       })
   } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in logout API',
      error
    })
   }
}

module.exports = {
  getUserController,
  getUpdateController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  logoutController,
};
