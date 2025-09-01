import { provider } from "@core/eventManagement/provider"
import type { UserDTO } from "@modules/users/dtos"
import { UserService } from "@modules/users/services/UserService"
const service = new UserService(provider())

export const usersService = {
    getUsers: async (): Promise<UserDTO[]> => await service.getUsers()
}