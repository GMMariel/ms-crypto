import { Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosInstanceFactory } from './AxiosInstanceFactory';

@Injectable()
export abstract class BaseClient {
	public httpClient: AxiosInstance;
	constructor(
		protected baseUrl: string,
		axiosFactory: AxiosInstanceFactory,
	) {
		this.httpClient = axiosFactory.getInstance();
	}

	public async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return (await this.httpClient.get<T>(this.baseUrl + url, config)).data;
	}
}

export default BaseClient;
