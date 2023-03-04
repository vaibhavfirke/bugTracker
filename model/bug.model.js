const mongoose = require("mongoose");
const bugSchema = mongoose.Schema({
type:String,
body:String,
userID:String,
});

const bugModel = mongoose.model("bug", bugSchema);
module.exports = { bugModel };
