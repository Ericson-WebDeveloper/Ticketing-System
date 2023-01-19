import { JobInterface } from "./Job";
import { RoleInterface } from "./Role";
import { TicketInterface, TicketTypeInterface } from './Ticket';


export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password?: string;
    remember_token?: string;
    email_verfied_at?: Date;
    detail?: UserDetailInterface;
    roles: RoleInterface[];
    job_id: number;
    job?: JobInterface;

    tickets?: TicketInterface<UserInterface>[];
    programmertickets?: TicketInterface<UserInterface>[];
    
    created_at?: Date;
    updated_at?: Date;
}

export interface UserDetailInterface {
    id: number;
    user_id: number;
    nickname: string;
    profile_img: string;
    employee_no: string;
    created_at?: Date;
    updated_at?: Date;
}



