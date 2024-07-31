import { HttpStatus, Injectable } from '@nestjs/common';
import { IBitcoinResponse } from './responses/IBitcoinResponse';
import axios from 'axios';
import { BitcoinClient } from '../client/BitcoinClient';
import { IBitcoinRepository } from '../../../../../application/interfacces/IBitcoinRepository';

@Injectable()
export class BitcoinRepository implements IBitcoinRepository {
	constructor(private httpClient: BitcoinClient) {}

	public async get(): Promise<IBitcoinResponse | null> {
		try {
			return await this.httpClient.get<IBitcoinResponse | null>('simple/price?ids=bitcoin&vs_currencies=usd');
		} catch (error) {
			if (axios.isAxiosError(error) && error.response && error.response.status === HttpStatus.NOT_FOUND) {
				return null;
			}
			throw error;
		}
	}
}
