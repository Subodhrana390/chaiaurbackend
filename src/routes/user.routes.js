import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { merger } from "../controller/merger.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ])
);

router
  .route("/fileupload")
  .post(upload.fields([{ name: "docs", maxCount: 10 }]), merger);

export default router;
