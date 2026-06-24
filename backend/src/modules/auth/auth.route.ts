import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { loginUserShema, refreshTokenSchema, registerUserSchema } from "./auth.schema";
import { currentUserController, loginUserController, logoutAllController, logoutController, refreshTokenController, registerUserController } from "./auth.controller";
import { verifyUser } from "../../middleware/auth.middleware";

const router = Router()


router.route("/register").post(
    // (req,res)=>{
    //     return res.send('helo')
    // },
    validate(registerUserSchema), 
    registerUserController)

router.route("/login").post(
    validate(loginUserShema),
    loginUserController
)

router.route("/refreshToken").post(
    // (req,res) =>{
    //     return res.send('test')
    // },
    validate(refreshTokenSchema),
    refreshTokenController
)
router.route("/me").get(
    verifyUser,
    currentUserController
)
router.route("/logout").post(
    verifyUser,
    logoutController
)
router.route("/logout-all-device").post(
    verifyUser,
    logoutAllController
)

export default router