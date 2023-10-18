import express from "express";
const router = express.Router();

import { getTest } from "./controller";

/**
 * @method GET
 * @route /test
 */
router.get("/", getTest);

export default router;
