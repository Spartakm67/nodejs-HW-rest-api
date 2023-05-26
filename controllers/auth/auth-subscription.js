const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const validSubscriptions = User.schema.path("subscription").enumValues;
//   const validSubscriptions = ["starter", "pro", "business"];
    
  if (!validSubscriptions.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

    const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    if (!updatedUser) {
    throw HttpError(404, "User not found");
    };

    res.json(updatedUser);
};

module.exports = updateSubscription;