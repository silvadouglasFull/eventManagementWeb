// src/modules/auth/dtos/LoginDTO.ts

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    message: string;
    success: boolean
}