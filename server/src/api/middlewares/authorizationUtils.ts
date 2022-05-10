import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {authConfig} from '../config/authConfig'


export default class SecurityUtils {

    public static jwtSign(data: any) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, authConfig.secret, function (err:any, token:any) {
                if (token) {
                    resolve(token)
                } else {
                    reject(new Error('sign have some problems'))
                }
            });

        })
    }

    public static jwtDecode(data: any) {
        return new Promise((resolve, reject) => {
            jwt.verify(data, authConfig.secret, (err: any, decoded: any) => {
                if (decoded) {
                    resolve(decoded)
                } else {
                    reject(new Error('Decode have some problems'));
                }
            });

        });
    }

    public static hashPassword(password: string, salt: string) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, encrypted: string) => {
                if (encrypted) {
                    resolve(encrypted)
                } else {
                    reject(new Error('Hashing have some problems'));
                }
            });
        });
    }

    public static getSalt(level: number) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(level, (err, salt: string) => {
                if (salt) {
                    resolve(salt)
                } else {
                    reject(new Error('Generating Salt have some problems'));
                }
            });
        });
    }
}