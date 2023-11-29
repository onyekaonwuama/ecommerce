import { Schema, model } from "mongoose";

//create user interface
export interface IUser {
    _id?: string;
    username: string;
    password: string;
    availableMoney: number;
    purchasedItems: string[]
}

// create the schema/blueprint of the collection using type interface IUser
const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableMoney: { type: Number, default: 5000 },
    purchasedItems: [{type: Schema.Types.ObjectId, ref: "product", default: [] }]
});

// create the name of the table/collection (user)
export const UserModel = model<IUser>("user", UserSchema);
