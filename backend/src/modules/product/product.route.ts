import { Router } from "express";
import { verifySeller, verifyUser } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createProductSchema } from "./product.schema";
import { createPrdouctController } from "./product.controller";
const router  = Router()




router.route("/create").post(
    verifyUser,
    verifySeller,
    validate(createProductSchema),
    createPrdouctController
)

export default router