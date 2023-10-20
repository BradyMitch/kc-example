import { Request, Response } from "express";
import { errorWrapper } from "../../utils";
import config from "../../../config";
const { DEBUG } = config;

/**
 * @method GET
 * @route /test
 */
export const getTest = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.log("DEBUG: getTest controller in controllers/test called.");

  res.json({ success: true });
});
