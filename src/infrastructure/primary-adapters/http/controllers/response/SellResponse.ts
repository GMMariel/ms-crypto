import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from 'src/dominio/enums/CurrencyEnum';

export class SellResponse {
	@ApiProperty({ type: 'number', example: '0.001' })
	total: number;

	@ApiProperty({ type: 'string', example: 'USD' })
	currency: string;

	constructor(total: number, currency: string = CurrencyEnum.USD) {
		this.total = total;
		this.currency = currency;
	}
}
