import { Request, Response } from "express";
import { errorWrapper } from "../../utils";
import config from "../../../config";
const { ENVIRONMENT, DEBUG } = config;

/**
 * Provide configuration variables to the frontend.
 * @method GET
 * @route /config
 */
export const getConfig = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG) console.log("getConfig controller in controllers/config called.");

  const configuration = {
    ENVIRONMENT,
    DEBUG,
  };
  res.json(configuration);
});
