import { UserInterface } from "./User";


export interface TicketTypeInterface {
    id: number;
    type_name: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface TicketStatusInterface {
    id: number;
    status_name: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface TicketENVInterface {
    id: number;
    environment_name: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface TicketInterface<U> {
    id: number;
    user_id: number | U | null;

    creator: U | null;
    progress: TicketProgressInterface | null;
    programmer?: U | null;
    owner?: U | null;
    qa?: U | null;

    ticket_name: string;
    control_no: string;
    description: string;
    root_cause: string | null;
    solution: string | null;
    remarks: string | null;
    programmer_id: number;
    qa_id: number;
    owner_id: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface TicketProgressInterface {
    id: number;
    ticket_id: number;
    ticket?: TicketInterface<UserInterface>;
    status_id: number;
    status?:  TicketStatusInterface;
    environment_id: number;
    env?: TicketENVInterface;
    type_id: number;
    type?: TicketTypeInterface;
    created_at?: Date;
    updated_at?: Date;
}

export interface TicketRCAInterface {
    id: number;
    ticket_id: number;
    rca: string;
    created_at?: Date;
    updated_at?: Date;
}

