const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsergroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    usergroupStyle: {
        type: String,
        required: true,
        default: "<b>{usergroup}</b>"
    },
    displayOrder: {
        type: Number,
        required: true,
        default: 0
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
