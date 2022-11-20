export interface UserModel {
    id: string;
    email: string;
    password: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export interface CreateUserDTO {
    id: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    email: string;
    password: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}
