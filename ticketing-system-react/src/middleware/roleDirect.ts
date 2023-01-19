import { RoleInterface } from "../models/Role";

export const redirectByRole = (roles: RoleInterface[]) => {
    let url = '';
    roles?.forEach((role: RoleInterface) => {
        if(role.name === 'Admin' || role.name === 'Super Admin') {
            url = '/backend';
        } else {
            url = '/backend/user';
        }
    });

    return url;
}