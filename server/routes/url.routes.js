import { Router } from "express";
import * as UrlController from "../controllers/url.controller";
const router = new Router();

// Get all Posts
router.route("/getUrls").get(UrlController.getUrls);

// Get one post by title
router.route("/getUrl").get(UrlController.getUrl);

// Add a new Post
router.route("/addUrl").post(UrlController.addUrl);

// Delete a Post
router.route("/deleteUrl").post(UrlController.deleteUrl);

export default router;
