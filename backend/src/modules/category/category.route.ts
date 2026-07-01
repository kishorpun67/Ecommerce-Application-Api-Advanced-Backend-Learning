 
import {Router} from "express"
import { validate } from "../../middleware/validate.middleware"
import { categorySchema, updateCategorySchema } from "./category.schema"
import { verifyAdmin, verifySeller, verifyUser } from "../../middleware/auth.middleware"
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "./category.controller"

const router = Router()

router.route("/create").post(
    verifyUser,
    verifyAdmin,
    validate(categorySchema),
    createCategoryController
)

router.route("/update/:id").post(
    verifyUser,
    verifyAdmin,
    validate(updateCategorySchema),
    updateCategoryController
)
router.route("/").get(
    verifyUser,
    verifyAdmin,
    getCategoryController
)

router.route("/delete/:id").delete(
    verifyUser,
    verifyAdmin,
    deleteCategoryController
)
export default router