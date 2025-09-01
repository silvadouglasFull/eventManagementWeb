import { provider } from "@core/eventManagement/provider"
import type { ReservationListDTO } from "@modules/reservations/dtos/ReservationDTO"
import { ReservationService } from "@modules/reservations/services/ReservationService"
import type { CreateReservationDTO } from "../dtos/CreateReservationDTO"
const service = new ReservationService(provider())

export const reservationsService = {
    getReservations: async (): Promise<ReservationListDTO> => await service.getReservations(),
    createReservation: async (data: CreateReservationDTO): Promise<void> => await service.createReservation(data)

}