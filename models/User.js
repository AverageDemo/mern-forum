const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    veriToken: {
        type: String
    },
    usergroups: [
        {
            usergroup: {
                type: Schema.Types.ObjectId,
                ref: "usergroups"
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);
