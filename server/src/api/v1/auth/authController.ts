import express from "express";
import AuthRepository from './authRepository';
import { apiResponse } from '../../models/expressModels';
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

            let token = await AuthorizationUtils.jwtSign(user);
            if (!token) return ExpressHelper.send(res,500,false,null,['Request Failed.']);

            //return res.status(200).json(<apiResponse>{ Success: true, Data: { token: token } });
            return ExpressHelper.send(res,200,true,{ token: token });
        }
    }

    public signup(): express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body || !req.body.email || !req.body.password) {
                return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });
            }

            let ifUserExist: boolean = await this.rep.ifUserExist(req.body.email);
            if (ifUserExist) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let hashedPassword = await AuthorizationUtils.hashPassword(req.body.password);
            if (!hashedPassword) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request Failed.'] });

            let newUser: User = req.body;
            newUser.password = hashedPassword;
            newUser.userState = userState.NotApproved;
            newUser.userRole = [userRole.Viewer];
            let result = await this.rep.signup(newUser);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request Failed.'] });

            delete newUser.password
            let token = await AuthorizationUtils.jwtSign(newUser);
            return res.status(200).json(<apiResponse>{ Success: true, Data: { token: token }})
        }
    }

}