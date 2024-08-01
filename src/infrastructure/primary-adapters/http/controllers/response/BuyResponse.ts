import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from 'src/dominio/enums/CurrencyEnum';

export class BuyResponse {
	@ApiProperty({ type: 'string', example: '0.001' })
	total: string;

	@ApiProperty({ type: 'string', example: 'BTS' })
	currency: string;

	constructor(total: string, currency: string = CurrencyEnum.BTC) {
		this.total = total;
		this.currency = currency;
	}
}
