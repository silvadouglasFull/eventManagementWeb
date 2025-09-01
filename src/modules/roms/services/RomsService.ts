import type { IAxiosHttpClient } from '@core/eventManagement/http/AxiosHttpClient/IAxiosHttpClient';
import { API_URL } from '@flavor/index';
import type { RoomDTO } from '@modules/roms/dtos';
import axios from 'axios';

export class RomsService {
    private httpClient: IAxiosHttpClient
    constructor(httpClient: IAxiosHttpClient) {
        this.httpClient = httpClient
    }
    public async getRooms(): Promise<RoomDTO[]> {
        try {
            const response = await this.httpClient.get(`${API_URL}/rooms`) as RoomDTO[];
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to fetch rooms.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while fetching rooms.');
        }
    }
}