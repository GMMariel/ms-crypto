import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from 'class-validator';

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
	@Min(0.00000001)
	amount: number;

	@ApiProperty({
		description: 'Cryptocurrency type (in this case, "BTC")',
		example: 'BTC',
	})
	@IsNotEmpty()
	@IsString()
	@IsEnum(['BTC'])
	currency: string;
}
