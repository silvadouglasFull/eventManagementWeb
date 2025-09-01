import type { IAxiosHttpClient } from '@core/eventManagement/http/AxiosHttpClient/IAxiosHttpClient';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
export class AxiosHttpClient implements IAxiosHttpClient {
    private readonly client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            validateStatus: () => true,
            withCredentials: true
        });
    }
    async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        const { data: responseData, status } = response
        return {
            ...responseData,
            status
        };
    }
    async post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.post<T>(url, data, config);
        const { data: responseData, status } = response
        return {
            ...responseData,
            status
        };
    }
    async put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.put<T>(url, data, config);
        const { data: responseData, status } = response
        return {
            ...responseData,
            status
        };
    }
    async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.delete<T>(url, config);
        const { data: responseData, status } = response
        return {
            ...responseData,
            status
        };
    }
}
