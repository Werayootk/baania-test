import * as express from "express";
import { createHome, deleteHome, getHome, getPostCode, getPostCodeDetail, updateHome } from "../controllers/house.controller";

const router = express.Router();

router.get("/home", getHome);
router.post("/home", createHome);
router.patch("/home/:id", updateHome);
router.delete("/home/:id", deleteHome);
router.get("/postCode", getPostCode);
router.get("/postCode/:postCodeValue", getPostCodeDetail);

export default router;