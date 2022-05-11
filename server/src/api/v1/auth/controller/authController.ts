import express from "express";
import Repository from '../repository/authRepository';
import {apiResponse} from '../../../models/expressModels'
import {User, userRole, userState} from '../../../models/user';
import {NewUser} from '../../../models/auth'
import AuthorizationUtils from '../../../middlewares/authorizationUtils'

export default class authController {
    private rep = new Repository;

    public login() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if ( req.body.email && req.body.password){
                let user : User = await this.rep.login(req.body.email);
                if (user && user.password) {
                    let checkPassword = await AuthorizationUtils.comparePassword(req.body.password, user.password)
                    if (checkPassword){
                        let token = await AuthorizationUtils.jwtSign(user);
                        respond = { Success: true, Data: {token: token} };
                        res.status(200);
                    } else {
                        respond = { Success: false, Errors: ['Request Denied.'] };
                        res.status(403);
                    }
                } else {
                    respond = { Success: false, Errors: ['User not found.'] };
                    res.status(404);
                }
            } else {
                respond = { Success: false, Errors: ['Request Denied.'] };
                res.status(400);
            }
            res.json(respond);
            res.end();
        } 
    }
    
    public signup() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            let ifUserExist : boolean = await this.rep.ifUserExist(req.body);
            if (req.body && req.body.email && req.body.password && !ifUserExist) {
                let hashedPassword = await AuthorizationUtils.hashPassword(req.body.password);
                if (hashedPassword) {
                    let newUser : User = req.body;
                    newUser.password = hashedPassword;
                    newUser.userState = userState.NotApproved;
                    newUser.userRole = [userRole.Viewer];
                    let result = await this.rep.signup(newUser);
                    if (result) {
                        let user : User = await this.rep.login(req.body.email);
                        if (user) {
                            let token = await AuthorizationUtils.jwtSign(user);
                            respond = { Success: true, Data: {token: token} };
                        } else {
                            respond = { Success: true, Data: result };
                        }
                        res.status(200);
                    } else {
                        respond = { Success: false, Errors: ['Request failed.'] };
                        res.status(500);
                    }
                } else {
                    respond = { Success: false, Errors: ['Request failed.'] };
                    res.status(500);
                }
            } else {
                respond = { Success: false, Errors: ['Request Denied.'] };
                res.status(400);
            }
            res.json(respond);
            res.end();
        } 
    }

}