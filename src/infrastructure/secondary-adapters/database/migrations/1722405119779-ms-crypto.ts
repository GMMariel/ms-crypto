import { MigrationInterface, QueryRunner } from 'typeorm';

export class MsCrypto1722405119779 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE `wallets` (`id` INT NOT NULL AUTO_INCREMENT, `user_id` varchar(36) NOT NULL, `balance` FLOAT NOT NULL, PRIMARY KEY (`id`))',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE `wallets`');
	}
}
