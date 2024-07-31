import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { databaseConfig } from '../config/DatabaseConfig';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';

@Injectable()
export class MariaDBOptionsFactory implements TypeOrmOptionsFactory {
	constructor(
		@Inject(databaseConfig.KEY)
		private databaseConfiguration: ConfigType<typeof databaseConfig>,
	) {}

	public createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'mariadb',
			...this.databaseConfiguration,
			entities: [WalletEntity],
			bigNumberStrings: false,
			supportBigNumbers: true,
		};
	}
}
