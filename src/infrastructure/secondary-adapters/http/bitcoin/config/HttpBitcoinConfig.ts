import { registerAs } from '@nestjs/config';
import { IBitcoinConfig } from './IHttpBitcoinConfig';

export const httpBitcoinConfig = registerAs('bitcoinConfig', (): IBitcoinConfig => {
	return {
		url: 'https://api.coingecko.com/api/v3/',
	};
});
