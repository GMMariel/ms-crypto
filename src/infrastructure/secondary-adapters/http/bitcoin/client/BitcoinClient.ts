import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosInstanceFactory } from '../../AxiosInstanceFactory';
import { httpBitcoinConfig } from '../config/HttpBitcoinConfig';
import BaseClient from '../../BaseClient';

@Injectable()
export class BitcoinClient extends BaseClient {
	constructor(
		@Inject(httpBitcoinConfig.KEY) config: ConfigType<typeof httpBitcoinConfig>,
		axiosFactory: AxiosInstanceFactory,
	) {
		super(config.url, axiosFactory);
	}
}
