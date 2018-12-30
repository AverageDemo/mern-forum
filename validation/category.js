const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateForumCategoryInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";

    if (!Validator.isLength(data.title, { min: 2, max: 40 })) {
        errors.title = "Title needs to be between 2 and 40 characters";
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (!Validator.isEmpty(data.desc) && !Validator.isLength(data.desc, { min: 10, max: 120 })) {
        errors.desc = "Description must be between 10 and 120 characters";
    }

    return { errors, isValid: isEmpty(errors) };
};
