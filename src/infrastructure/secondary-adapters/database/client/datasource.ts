import { DataSource } from 'typeorm';
import { safeGetConfig } from '../../base/ConfigHelper';

const createDatasource: () => DataSource = () => {
	return new DataSource({
		type: 'mariadb',
		host: safeGetConfig('DATABASE_HOST'),
		port: 3306,
		username: safeGetConfig('DATABASE_USER'),
		password: safeGetConfig('DATABASE_PASS'),
		database: safeGetConfig('DATABASE_NAME'),
		entities: ['**/**/domain/entities/*Entity.js'],
		migrations: ['**/database/migrations/*.ts'],
	});
};

export const datasource = createDatasource();
