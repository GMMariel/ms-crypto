import { Module } from '@nestjs/common';
import { CryptoController } from './infrastructure/primary-adapters/http/controllers/CryptoController';
import { CryptoService } from './application/services/CryptoService';
import { ConfigModule } from '@nestjs/config';
import { httpBitcoinConfig } from './infrastructure/secondary-adapters/http/bitcoin/config/HttpBitcoinConfig';
import { AxiosInstanceFactory } from './infrastructure/secondary-adapters/http/AxiosInstanceFactory';
import { BITCOINT } from './application/interfacces/IBitcoinRepository';
import { BitcoinRepository } from './infrastructure/secondary-adapters/http/bitcoin/repositories/BitcoinRepository';
import { BitcoinClient } from './infrastructure/secondary-adapters/http/bitcoin/client/BitcoinClient';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MariaDBOptionsFactory } from './infrastructure/secondary-adapters/database/client/MariaDBOptionsFactory';
import { databaseConfig } from './infrastructure/secondary-adapters/database/config/DatabaseConfig';
import { WALLET } from './application/interfacces/IWalletRepository';
import { WalletRepository } from './infrastructure/secondary-adapters/database/repositories/WalletRepository';
import { WalletEntity } from './dominio/entities/WalletEntity';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [httpBitcoinConfig, databaseConfig],
			isGlobal: true,
			cache: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [MariaDBOptionsFactory],
			useFactory: (config: MariaDBOptionsFactory) => config.createTypeOrmOptions(),
			extraProviders: [MariaDBOptionsFactory],
		}),
		TypeOrmModule.forFeature([WalletEntity]),
	],
	controllers: [CryptoController],
	providers: [
		CryptoService,
		AxiosInstanceFactory,
		BitcoinClient,
		{
			provide: BITCOINT,
			useClass: BitcoinRepository,
		},
		{
			provide: WALLET,
			useClass: WalletRepository,
		},
	],
})
export class AppModule {}
