import { AxiosHttpClient } from "@core/eventManagement/http/AxiosHttpClient"
import { API_URL } from "@flavor/index"
export const provider = () => {
    const baseUrl = API_URL
    return new AxiosHttpClient(baseUrl)
}