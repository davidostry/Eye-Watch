
export type Role = 
| "arena_user"
| "general_user"
| "admin";

export type AssignedArena = 
| "North"
| "South"
| "Center"
| "All";

export type User = {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: Role;
    assignedArena: AssignedArena
}

