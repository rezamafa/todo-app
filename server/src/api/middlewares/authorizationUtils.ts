import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {authConfig} from '../config/authConfig'
import { User } from "../models/user";


export default class AuthorizationUtils {

    public static async jwtSign(user: User) {
        try {
            let token = await jwt.sign(user, authConfig.secret);
            return token;
        } catch (err) {
            console.log('Failed to Create token : ', err)
            return null;
        }
    }

    public static async jwtDecode(token: string) {
        try {
            let user = await jwt.verify(token, authConfig.secret);
            return user;
        } catch (err) {
            console.log('Decode have some problems : ', err)
            return null;
        }
    }

    public static async hashPassword(password: string) {
        let hashedPassword : string;
        let saltRounds = 10;
        try {
            hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (err) {
            console.log('Failed to Hashing pass : ', err)
            return null;
        }
    }

    
    public static async comparePassword(plainPassword: string, hashedPassword: string) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (err) {
            console.log('Failed to compare : ', err)
            return null;
        }
    }

}