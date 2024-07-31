import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from 'src/dominio/enums/CurrencyEnum';

export class BuyResponse {
	@ApiProperty({ type: 'number', example: '0.001' })
	total: number;

	@ApiProperty({ type: 'string', example: 'BTS' })
	currency: string;

	constructor(total: number, currency: string = CurrencyEnum.BTC) {
		this.total = total;
		this.currency = currency;
	}
}
