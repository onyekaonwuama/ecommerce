import {Router, Request, Response} from "express";
import { ProductModel } from "../models/product";
import { verifyToken } from "./user";
import { UserModel } from "../models/user";
import { ProductErrors, UserErrors } from "../errors";


const router = Router();

//add verifyToken to ensure only logged in users can see all products
router.get("/", verifyToken, async (_, res: Response) => {
    try {
        // get all product entries from database
        const products = await ProductModel.find({});
        res.json({products})
    } catch(err) {
        res.status(400).json({ err });
    }
});

//checkout route
router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
    // collect user/customerID and cart items from the body
    const { customerID, cartItems } = req.body;

    try {
        // check if the user is in the database
        const user = await UserModel.findById(customerID);
        // collect the keys of cart items
        const productIDs = Object.keys(cartItems);
        // find all of the ids in cart items in the product database
        const products = await ProductModel.find({ _id: { $in: productIDs }})

        // return error message if user is not found
        if (!user) {
            return res.status(400).json({type: UserErrors.No_USER_FOUND});
        }
        // return if products found in database is not equal to productIDs length of cartItems
        if (products.length !== productIDs.length) {
            return res.status(400).json({type: ProductErrors.No_PRODUCT_FOUND});
        }

        let totalPrice = 0;
        // loop through each of the keys in the cart items 
        for (const item in cartItems) {
            const product = products.find((product) => String(product._id) === item);

            if (!product) {
                return res.status(400).json({ type: ProductErrors.No_PRODUCT_FOUND })
            }
            // if stock quantity of product is less than the quantity in cart items
            if (product.stockQuantity < cartItems[item]) {
                return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK })
            }

            // product price multiplied by quantity of the product in the cart
            totalPrice += product.price * cartItems[item]

        }

        if (user.availableMoney < totalPrice) {
            return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY })
        }

        // execute the purchase
        user.availableMoney -= totalPrice;
        // add the purchased items to the user
        user.purchasedItems.push(...productIDs);
        // save changes made to the user
        await user.save();

        // update product stock quantity in database
        await ProductModel.updateMany({_id: {$in: productIDs}}, { $inc: { stockQuantity: -1 }})
        
        res.json({ purchasedItems: user.purchasedItems })
    } catch(err) {
        res.status(400).json(err);
    }
})

router.get("/purchased-items/:customerID", verifyToken, async (req: Request, res: Response) => {
    console.log('Purchase item route handler *******')
    const { customerID } = req.params;
    // console.log("userid", req.params.userID)

    try {
        const user = await UserModel.findById(customerID)
        if (!user) {
            res.status(400).json({type: UserErrors.No_USER_FOUND})
        }
        //retrieve ids from user model
        const products = await ProductModel.find({ _id: { $in: user.purchasedItems }})
        res.json({ purchasedItems: products })
    } catch (err) {
        res.status(500).json({ err })
        console.log("this is the error product", err)
    }
})

export { router as productRouter };