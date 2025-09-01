// src/modules/reservations/services/ReservationService.ts
import type { IAxiosHttpClient } from '@core/eventManagement/http/AxiosHttpClient/IAxiosHttpClient';
import { API_URL } from '@flavor/index';
import { type ReservationListDTO } from '@modules/reservations/dtos/ReservationDTO';
import axios from 'axios';
import type { CreateReservationDTO } from '../dtos/CreateReservationDTO';


export class ReservationService {
    private httpClient: IAxiosHttpClient
    constructor(httpClient: IAxiosHttpClient) {
        this.httpClient = httpClient
    }
    public async getReservations(): Promise<ReservationListDTO> {
        try {
            const response = await this.httpClient.get(`${API_URL}/reservations?page=1&limit=5`) as ReservationListDTO
            return response
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to fetch reservations.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while fetching reservations.');
        }
    }
    public async createReservation(data: CreateReservationDTO): Promise<void> {
        try {
            await this.httpClient.post(`${API_URL}/reservations`, data)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Failed to create reservation.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while creating the reservation.');
        }
    }
}