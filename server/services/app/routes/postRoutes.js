const PostController = require("../controllers/postController");
const router = require("express").Router();

router.get("/", PostController.posts);

router.get("/:id", PostController.getPost);

router.post("/", PostController.createPost);

router.put("/:id", PostController.editPost);

router.delete("/:id", PostController.deletePost);

module.exports = router;
