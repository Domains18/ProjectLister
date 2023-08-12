import mongoose from "mongoose";




const userDefinedSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    authentication: {
        password: { required: true, type: String, select: false },
        salt: { type: String, select: false },
        token: { type: String, select: false }
    }
}, { timestamps: true });


export const userModel = mongoose.model('User', userDefinedSchema);


export const findUsers = () => userModel.find();
export const findUserByEmail = (email: string) => userModel.findOne({ email });
export const findUserByToken = (sessionToken: string) => userModel.findOne({ 'authentication.token': sessionToken });
export const defineUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUser = (id: string) => userModel.findOneAndDelete({ _id: id })
export const updateUser = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values);
