// src/modules/auth/dtos/CreateUserDTO.ts

export interface CreateUserDTO {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface UserDTO {
    id: string;
    email: string;
    created_at: Date;
}