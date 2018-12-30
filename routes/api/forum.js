const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../../models/User");
const Thread = require("../../models/Thread");
const Category = require("../../models/Category");

const validateForumReplyInput = require("../../validation/reply");
const validateForumThreadInput = require("../../validation/thread");
const validateForumCategoryInput = require("../../validation/category");
const validateForumSubCategoryInput = require("../../validation/subcategory");

/*
 * @route   GET api/forum/
 * @desc    View forums
 * @access  Public
 */
router.get("/", (req, res) => {
    Category.find({})
        .then(categories => {
            return res.json(categories);
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/forum/createCategory
 * @desc    Create a new category
 * @access  Private / admin
 */
router.post("/createCategory", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateForumCategoryInput(req.body);

    User.findById(req.user.id)
        .then(user => {
            if (!isValid) return res.status(400).json(errors);

            Category.findOne({ title: req.body.title }).then(category => {
                if (category) {
                    errors.title = "A category with that title already exists";
                    return res.status(400).json(errors);
                }

                const newCategory = new Category({
                    title: req.body.title,
                    desc: req.body.desc,
                    hidden: req.body.hidden
                });

                newCategory
                    .save()
                    .then(category => res.json(category))
                    .catch(err => console.log(err));
            });
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/forum/createSubCategory
 * @desc    Create a new sub category
 * @access  Private / admin
 */
router.post("/createSubCategory", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateForumSubCategoryInput(req.body);

    User.findById(req.user.id)
        .then(user => {
            if (!isValid) return res.status(400).json(errors);

            Category.findById(req.body.parentCategory)
                .then(category => {
                    if (
                        category.subcategories.find(
                            subcategory =>
                                subcategory.title.toLowerCase() === req.body.title.toLowerCase()
                        )
                    ) {
                        errors.title =
                            "A subcategory with that title already exists under this category";
                        return res.status(400).json(errors);
                    }

                    const newSubCategory = {
                        title: req.body.title,
                        desc: req.body.desc,
                        hidden: req.body.hidden
                    };

                    category.subcategories.unshift(newSubCategory);

                    category
                        .save()
                        .then(category => res.json(category))
                        .catch(err => console.log(err));
                })
                .catch(() => res.status(404).json({ categorynotfound: "Invalid category" }));
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/forum/newThread
 * @desc    Create a new thread
 * @access  Private
 */
router.post("/newThread", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateForumThreadInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Category.findById(req.body.parentCategory)
        .then(() => {
            Thread.countDocuments()
                .then(count => {
                    let slug = req.body.title.toLowerCase().replace(/\s+/g, "-");
                    count++;
                    slug += "-" + count;

                    const newThread = new Thread({
                        title: req.body.title,
                        content: req.body.content,
                        slug,
                        sticky: req.body.sticky,
                        user: req.user.id,
                        parentCategory: req.body.parentCategory
                    });

                    newThread
                        .save()
                        .then(newthread => res.json(newthread))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(() => res.status(404).json({ subcategorynotfound: "Invalid subcategory" }));
});

/*
 * @route   POST api/forum/newReply/:slug
 * @desc    Create a new thread
 * @access  Private
 */
router.post("/newReply/:slug", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = validateForumReplyInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Thread.findOne({ slug: req.params.slug })
        .then(thread => {
            const newReply = {
                text: req.body.content
            };

            thread.replies.unshift(newReply);

            thread
                .save()
                .then(thread => res.json(thread))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

/*
 * @route   GET api/forum/viewPost/:slug
 * @desc    View a post
 * @access  Public
 */
router.get("/viewPost/:slug", (req, res) => {
    const errors = {};

    Thread.findOne({ slug: req.params.slug })
        .populate("user", ["username", "avatar"])
        .then(thread => {
            if (!thread) {
                errors.thread = "Thread not found";
                return res.status(404).json(errors);
            }

            res.json(thread);
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/forum/like/:id
 * @desc    Like a post
 * @access  Private
 */
router.post("/like/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = {};

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {
                errors.thread = "Thread not found";
                return res.status(404).json(errors);
            }

            if (
                !thread.likes.find(thisThread => thisThread.user.toString() === req.user.id) &&
                !thread.dislikes.find(thisThread => thisThread.user.toString() === req.user.id)
            ) {
                thread.likes.unshift({ user: req.user.id });
                return thread
                    .save()
                    .then(thread => res.json(thread))
                    .catch(err => console.log(err));
            } else if (
                thread.likes.find(thisThread => thisThread.user.toString() === req.user.id)
            ) {
                const removeIndex = thread.likes
                    .map(like => like.user.toString())
                    .indexOf(req.user.id);

                thread.likes.splice(removeIndex, 1);

                return thread
                    .save()
                    .then(thread => res.json(thread))
                    .catch(err => console.log(err));
            }

            res.json(thread);
        })
        .catch(err => console.log(err));
});

/*
 * @route   POST api/forum/dislike/:id
 * @desc    Dislike a post
 * @access  Private
 */
router.post("/dislike/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = {};

    Thread.findById(req.params.id)
        .then(thread => {
            if (!thread) {
                errors.thread = "Thread not found";
                return res.status(404).json(errors);
            }

            if (
                !thread.dislikes.find(thisThread => thisThread.user.toString() === req.user.id) &&
                !thread.likes.find(thisThread => thisThread.user.toString() === req.user.id)
            ) {
                thread.dislikes.unshift({ user: req.user.id });
                return thread
                    .save()
                    .then(thread => res.json(thread))
                    .catch(err => console.log(err));
            } else if (
                thread.dislikes.find(thisThread => thisThread.user.toString() === req.user.id)
            ) {
                const removeIndex = thread.dislikes
                    .map(like => like.user.toString())
                    .indexOf(req.user.id);

                thread.dislikes.splice(removeIndex, 1);

                return thread
                    .save()
                    .then(thread => res.json(thread))
                    .catch(err => console.log(err));
            }

            res.json(thread);
        })
        .catch(err => console.log(err));
});

module.exports = router;
