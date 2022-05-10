import { ObjectId } from "mongodb";

export enum userState {
    Normal = 'Normal',
    Deleted = 'Deleted',
    NotApproved = 'NotApproved',
    Approved = 'Approved',
    Banned = 'Banned',
    Active = 'Active',
    Inactive = 'Inactive',
    Susspend = 'Susspend',
};
export enum userRole {
    Owner = 'Owner',
    Admin = 'Admin',
    Developer = 'Developer',
    Manager = 'Manager',
    ContentManager = 'ContentManager',
    Viewer = 'Viewer'    
};
export interface User { 
    _id?: ObjectId,
    email?: string,
    phoneNumber?: string, 
    username?: string,
    password?: string, 
    gender?: string,
    salt?: string, 
    userRole?: userRole[], 
    userState?: userState, 
    verifyCode?: any
};