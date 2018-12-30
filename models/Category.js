const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    subcategories: [
        {
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String
            },
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

module.exports = Category = mongoose.model("forumCategory", CategorySchema);
