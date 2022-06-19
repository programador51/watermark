import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelCtor, Optional } from 'sequelize'

interface User {
    id: number;
    defaultWatermark: string;
    email: string;
    logInMethod: string;
    profilePicture: string;
    registrationDate: string;
    subscription: string | null;
}

interface UserCrate extends User {

}

interface UserModel extends ModelCtor<Model<User, UserCrate>> {
}
