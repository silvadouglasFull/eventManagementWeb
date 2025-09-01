import type { IAxiosHttpClient } from '@core/eventManagement/http/AxiosHttpClient/IAxiosHttpClient';
import { API_URL } from '@flavor/index';
import type { UserDTO } from '@modules/users/dtos';
import axios from 'axios';

export class UserService {
    private httpClient: IAxiosHttpClient
    constructor(httpClient: IAxiosHttpClient) {
        this.httpClient = httpClient
    }
    public async getUsers(): Promise<UserDTO[]> {
        try {
            const response = await this.httpClient.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to fetch users.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while fetching rooms.');
        }
    }
}