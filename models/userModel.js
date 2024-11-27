const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter a User Name"]
        },
        email: {
            type: String,
            required: [true, "Please Enter a User Email"]
        },
        password: {
            type: String,
            required: [true, "Please Enter a User Email"]
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
module.exports = User