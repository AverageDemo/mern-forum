const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateForumSubCategoryInput = data => {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";
    data.parentCategory = !isEmpty(data.parentCategory) ? data.parentCategory : "";

    if (!Validator.isLength(data.title, { min: 2, max: 40 })) {
        errors.title = "Title needs to be between 2 and 40 characters";
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (!Validator.isEmpty(data.desc) && !Validator.isLength(data.desc, { min: 10, max: 120 })) {
        errors.desc = "Description must be between 10 and 120 characters";
    }

    if (Validator.isEmpty(data.parentCategory)) {
        errors.parent = "Subcategory requires a parent";
    }

    return { errors, isValid: isEmpty(errors) };
};
