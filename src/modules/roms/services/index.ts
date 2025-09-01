import { provider } from "@core/eventManagement/provider"
import type { RoomDTO } from "@modules/roms/dtos"
import { RomsService } from "@modules/roms/services/RomsService"
const service = new RomsService(provider())

export const romsService = {
    getRooms: async (): Promise<RoomDTO[]> => await service.getRooms()
}