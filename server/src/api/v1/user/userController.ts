import express from "express";
import Repository from './UserReposirory';
import {apiResponse} from '../../models/expressModels'
import {User, userRole, userState} from '../../models/user';

export default class UserController {

    private rep = new Repository;

    public get() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let user : User = req.body as User ;
            let result = await this.rep.get(user);
            if (!result) return res.status(404).json(<apiResponse>{ Success: false, Errors: ['User not found.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public create() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            
            if (!req.body) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let user : User = req.body as User ;
            let result = await this.rep.create(user);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public update() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body || !req.body.user || !req.body.update) {
                return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });
            }

            let user : User = req.body as User ;
            let userupdate : User = req.body.update as User;

            let result = await this.rep.update(user, userupdate);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public delete() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            
            if (!req.body) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let user : User = req.body as User ;
            let result = await this.rep.delete(user);
            if (!result) return res.status(500).json(<apiResponse>{ Success: false, Errors: ['Request failed.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }

    public getAll() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {

            if (!req.body) return res.status(400).json(<apiResponse>{ Success: false, Errors: ['Request Denied.'] });

            let user : User = req.body as User ;
            let result = await this.rep.getAll(user);
            if (!result) return res.status(404).json(<apiResponse>{ Success: false, Errors: ['User not found.'] });

            return res.status(200).json(<apiResponse>{ Success: true, Data: result });
        } 
    }
}