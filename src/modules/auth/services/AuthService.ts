// src/modules/auth/services/AuthService.ts
import type { IAxiosHttpClient } from '@core/eventManagement/http/AxiosHttpClient/IAxiosHttpClient';
import { API_URL } from '@flavor/index';
import type { CreateUserDTO, UserDTO } from '@modules/auth/dtos/CreateUserDTO';
import axios from 'axios';
import type { LoginDTO, LoginResponseDTO } from '../dtos/LoginDTO';


export class AuthService {
    public httpClient: IAxiosHttpClient
    constructor(httpClient: IAxiosHttpClient) {
        this.httpClient = httpClient
    }
    public async createUser(data: CreateUserDTO): Promise<UserDTO> {
        try {
            // A validação Zod já foi feita antes de chamar este serviço
            const { signal } = new AbortController()
            const response = await this.httpClient.post<UserDTO>(`${API_URL}/auth/user`, data, {
                signal
            });
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Lidar com erros específicos da API, como e-mail duplicado
                const errorMessage = error.response.data.message || 'Failed to create user.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while creating the user.');
        }
    }
    public async login(data: LoginDTO): Promise<LoginResponseDTO> {
        try {
            const response = await this.httpClient.post<LoginResponseDTO>(`${API_URL}/auth/login`, data)
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to login. Please check your credentials.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while logging in.');
        }
    }
}