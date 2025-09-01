import { provider } from "@core/eventManagement/provider"
import type { CreateUserDTO, UserDTO } from "@modules/auth/dtos/CreateUserDTO"
import type { LoginDTO, LoginResponseDTO } from '@modules/auth/dtos/LoginDTO'
import { AuthService } from '@modules/auth/services/AuthService'
const service = new AuthService(provider())
export const authService = {
    login: async (data: LoginDTO): Promise<LoginResponseDTO> => await service.login(data),
    createUser: async (data: CreateUserDTO): Promise<UserDTO> => await service.createUser(data),
}