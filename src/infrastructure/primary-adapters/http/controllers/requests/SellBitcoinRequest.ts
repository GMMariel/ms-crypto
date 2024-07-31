import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { CurrencyEnum } from 'src/dominio/enums/CurrencyEnum';

export class SellBitcoinRequest {
	@ApiProperty({
		description: 'Unique identifier of the user selling the bitcoins',
		example: '7ea91c17-c871-40f1-88a6-7386f1fac865',
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description: 'Amount of bitcoins to be sold',
		example: 1,
	})
	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@ApiProperty({
		description: 'Cryptocurrency type (in this case, "BTC")',
		example: 'BTC',
	})
	@IsNotEmpty()
	@IsString()
	@IsEnum(CurrencyEnum)
	currency: string;
}
