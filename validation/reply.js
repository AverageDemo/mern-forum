const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateForumReplyInput = data => {
    let errors = {};

    data.content = !isEmpty(data.content) ? data.content : "";

    if (!Validator.isLength(data.content, { min: 10, max: 10000 })) {
        errors.content = "Post body must be between 10 and 10000 characters";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "Post body is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
