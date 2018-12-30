const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    sticky: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: "forumSubCategory"
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    dislikes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    replies: [
        {
            text: {
                type: String,
                required: true
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "users"
                    }
                }
            ],
            dislikes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: "users"
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Thread = mongoose.model("forumThread", ThreadSchema);
