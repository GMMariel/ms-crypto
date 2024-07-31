import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from 'src/dominio/enums/CurrencyEnum';

export class CryptoResponse {
	@ApiProperty({ type: 'number', example: 'example' })
	totalInvested: number;

	@ApiProperty({ type: 'string', example: 'USD' })
	currency: string;

	@ApiProperty({ type: 'Date', example: '2024-07-30T15:45:00Z' })
	timestamp: Date;

	constructor(total: number, currency: string = CurrencyEnum.USD) {
		this.totalInvested = total;
		this.currency = currency;
		this.timestamp = new Date();
	}
}
