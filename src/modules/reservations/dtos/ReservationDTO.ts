// src/modules/reservations/dtos/ReservationDTO.ts
export interface GuestDTO {
    id: string;
    email: string;
    status: 'pending' | 'confirmed' | 'rejected';
}

export interface ReservationDTO {
    id: string;
    room_id: string;
    host_id: string;
    start_date: Date;
    end_date: Date;
    guests: GuestDTO[];
}

export type ReservationListDTO = ReservationDTO[];