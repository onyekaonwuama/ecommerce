import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";

const router = Router();

dotenv.config()

const jwtSecret = process.env.REACT_APP_JWT_SECRET
// routes related to the user
router.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
    // check if user exists in database
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.status(400).json({type: UserErrors.USERNAME_ALREADY_EXISTS})
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword })
    await newUser.save()

    res.json({ message: "registered User successfully"})
    } catch (err) {
        res.status(500).json({ type: err });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        // find the user in the database
        const user: IUser = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({type: UserErrors.No_USER_FOUND})
        }

        // check if password when hashed matches user password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS});
        }

        // create a token/encrypted version for the user to authenticate
        const token = jwt.sign({id: user._id}, jwtSecret);
        res.json({ token, userID: user._id })
    } catch (err) {
        res.status(500).json({ type: err })
    }
});

// create verification to ensure only authenticated users are making requests
export const verifyToken = (req: Request, res: Response, next: NextFunction ) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        jwt.verify(authHeader, jwtSecret, (err) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        })
    }

    return res.status(401);
}


export { router as userRouter }