const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateForumPostInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.content = !isEmpty(data.content) ? data.content : "";
    data.parentCategory = !isEmpty(data.parentCategory) ? data.parentCategory : "";

    if (!Validator.isLength(data.title, { min: 2, max: 25 })) {
        errors.title = "Title needs to be between 2 and 25 characters";
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (!Validator.isLength(data.content, { min: 10, max: 10000 })) {
        errors.content = "Post body must be between 10 and 10000 characters";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "Post body is required";
    }

    if (Validator.isEmpty(data.parentCategory)) {
        errors.parentCategory = "Parent category is required";
    }

    return { errors, isValid: isEmpty(errors) };
};
