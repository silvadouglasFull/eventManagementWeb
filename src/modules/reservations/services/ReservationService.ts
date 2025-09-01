// src/modules/reservations/services/ReservationService.ts
import { API_URL } from '@flavor/index';
import { type ReservationListDTO } from '@modules/reservations/dtos/ReservationDTO';
import axios from 'axios';


export class ReservationService {
    public static async getReservations(): Promise<ReservationListDTO> {
        // Não precisamos mais buscar o token, pois o navegador o envia automaticamente via cookie

        try {
            // Removendo o header Authorization
            const response = await axios.get<ReservationListDTO>(`${API_URL}/reservations`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Se a API retornar 401 (Unauthorized) porque o cookie expirou ou não existe,
                // a lógica de rota protegida já redirecionará para o login.
                const errorMessage = error.response.data.message || 'Failed to fetch reservations.';
                throw new Error(errorMessage);
            }
            throw new Error('An unexpected error occurred while fetching reservations.');
        }
    }
}