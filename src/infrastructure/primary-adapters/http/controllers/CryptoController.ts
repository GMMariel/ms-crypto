import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CryptoService } from 'src/application/services/CryptoService';
import { CryptoResponse } from './response/CryptoResponse';
import { BuyBitcoinRequest } from './requests/BuyBitcoinRequest';
import { SellBitcoinRequest } from './requests/SellBitcoinRequest';
import { SellResponse } from './response/SellResponse';
import { BuyResponse } from './response/BuyResponse';

@Controller('api')
@ApiTags('Api')
export class CryptoController {
	constructor(private cryptoService: CryptoService) {}

	@Post('buy')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Buy bitcoin.' })
	@ApiResponse({ status: HttpStatus.CREATED })
	public async buy(@Body() request: BuyBitcoinRequest): Promise<BuyResponse> {
		return new BuyResponse(await this.cryptoService.buyBitcoin(request));
	}

	@Post('sell')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Sell bitcoin.' })
	@ApiResponse({ status: HttpStatus.CREATED })
	public async sell(@Body() request: SellBitcoinRequest): Promise<SellResponse> {
		return new SellResponse(await this.cryptoService.sellBitcoin(request));
	}

	@Get('portfolio/:id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Get portfolio.' })
	@ApiParam({ name: 'id', description: 'ID del usuario', required: true })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Total amount of money invested in bitcoins successfully retrieved.',
		schema: {
			example: {
				totalInvested: 5000.0,
				currency: 'USD',
				timestamp: '2024-07-30T15:45:00Z',
			},
		},
	})
	public async get(@Param('id', ParseUUIDPipe) id: string): Promise<CryptoResponse> {
		return new CryptoResponse(await this.cryptoService.get(id));
	}
}
