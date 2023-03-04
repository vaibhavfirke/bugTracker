const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
type:String,
body:String,
userID:String,
});

const userModel = mongoose.model("bug", userSchema);
module.exports = { userModel };
