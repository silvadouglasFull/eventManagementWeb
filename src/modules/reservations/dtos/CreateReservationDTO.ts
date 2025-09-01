// src/modules/reservations/dtos/CreateReservationDTO.ts
export interface CreateReservationDTO {
    room_id: string;
    start_date: string;
    end_date: string;
    guests: string[];
}