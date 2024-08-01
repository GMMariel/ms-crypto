import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from 'class-validator';
import { PaymentMethodEnum } from 'src/dominio/enums/PaymentMethodEnum';

export class BuyBitcoinRequest {
	@ApiProperty({
		description: 'Unique identifier of the user selling the bitcoins',
		example: '7ea91c17-c871-40f1-88a6-7386f1fac865',
	})
	@IsNotEmpty()
	@IsString()
	userId: string;

	@ApiProperty({
		description:
			'The amount of US dollars to be converted to bitcoins. This represents the total value in dollars that you want to exchange for bitcoins.',
		example: 500,
	})
	@IsNotEmpty()
	@IsNumber()
	@Min(0.00000001)
	amount: number;

	@ApiProperty({
		description: 'Cryptocurrency type (in this case, "USD")',
		example: 'USD',
	})
	@IsNotEmpty()
	@IsEnum(['USD'])
	currency: string;

	@ApiProperty({
		description: 'Wallet or account address to receive the funds from the sale',
		example: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
	})
	@IsNotEmpty()
	@IsString()
	walletAddress: string;

	@ApiProperty({
		description: 'Payment method to receive the sale funds',
		example: 'CREDIT_CARD',
		enum: PaymentMethodEnum,
	})
	@IsNotEmpty()
	@IsEnum(PaymentMethodEnum)
	paymentMethod: string;
}
