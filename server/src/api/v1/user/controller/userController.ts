import express from "express";
import Repository from '../repository/UserReposirory';
import {apiResponse} from '../../../models/expressModels'
import {User, userRole, userState} from '../../../models/user';

export default class userController {
    private rep = new Repository;

    public getUser() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body){
                let user : User = req.body as User ;
                let result = await this.rep.getUser(user);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
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
    
    public createUser() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body){
                let user : User = req.body as User;
                let result = await this.rep.createUser(user);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
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

    public updateUser() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body && req.body.user && req.body.update){
                let user : User = req.body.user as User;
                let userupdate : User = req.body.update as User;
                let result = await this.rep.updateUser(user, userupdate);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
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

    public deleteUser() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body){
                let user : User = req.body as User;
                let result = await this.rep.deleteUser(user);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
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

    public getAllUsersList() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            let result ;
            if (req.body) { 
                result = await this.rep.getAllUsers(req.body);
            } else {
                result = await this.rep.getAllUsers();
            }

            if (result) {
                respond = { Success: true, Data: result };
                res.status(200);
            } else {
                respond = { Success: false, Errors: ['User not found.'] };
                res.status(500);
            }
            
            res.json(respond);
            res.end();
        } 
    }
}