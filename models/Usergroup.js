const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsergroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        isAdmin: {
            type: Boolean,
            default: false
        },
        isMod: {
            type: Boolean,
            default: false
        },
        canViewForum: {
            type: Boolean,
            default: true
        },
        canPost: {
            type: Boolean,
            default: true
        },
        canReply: {
            type: Boolean,
            default: true
        },
        canDM: {
            type: Boolean,
            default: true
        },
        disabledForums: [
            {
                categoryID: {
                    type: Schema.Types.ObjectId,
                    ref: "forumCategory"
                }
            }
        ]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Usergroup = mongoose.model("usergroup", UsergroupSchema);
