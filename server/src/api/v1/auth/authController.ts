import express from "express";
import AuthRepository from './authRepository';
import { User, userRole, userState } from '../../models/user';
import AuthorizationUtils from '../../middlewares/authorizationUtils';
import ExpressHelper from "../../middlewares/expressRespondHelper";
export default class AuthController {
    
    private rep = new AuthRepository;

    public login(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body || !req.body.email || !req.body.password) {
                return ExpressHelper.send(res,400,false,null,['Request Denied.']);
            }

            let user: User = await this.rep.login(req.body.email);
            if (!user || !user.password) return ExpressHelper.send(res,400,false,null,['User not found.']);

            let checkPassword = await AuthorizationUtils.comparePassword(req.body.password, user.password)
            if (!checkPassword) return ExpressHelper.send(res,400,false,null,['Request Denied.']);

            delete user.password;
            let token = await AuthorizationUtils.jwtSign(user);
            if (!token) return ExpressHelper.send(res,500,false,null,['Request Failed.']);

            return ExpressHelper.send(res,200,true,{ token: token, email: user.email });
        }
    }

    public signup(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body || !req.body.email || !req.body.password) {
                return ExpressHelper.send(res,400,false,null,['Request Denied.']);
            }

            let ifUserExist: boolean = await this.rep.ifUserExist(req.body.email);
            if (ifUserExist) return ExpressHelper.send(res,400,false,null,['Request Denied.']);

            let hashedPassword = await AuthorizationUtils.hashPassword(req.body.password);
            if (!hashedPassword) return ExpressHelper.send(res,500,false,null,['Request Failed.']);

            let newUser: User = req.body as User;
            newUser.password = hashedPassword;
            newUser.userState = userState.NotApproved;
            newUser.userRole = [userRole.Viewer];
            let result = await this.rep.signup(newUser);
            if (!result) return ExpressHelper.send(res,500,false,null,['Request Failed.']);

            delete newUser.password
            let token = await AuthorizationUtils.jwtSign(newUser);
            return ExpressHelper.send(res,200,true,{ token: token, email: newUser.email });
        }
    }

}