import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { IWalletRepository } from 'src/application/interfacces/IWalletRepository';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WalletRepository implements IWalletRepository {
	constructor(@InjectRepository(WalletEntity) private repository: Repository<WalletEntity>) {}

	public async findByUserId(userId: string): Promise<WalletEntity | null> {
		try {
			return await this.repository.findOneBy({ userId });
		} catch (error) {
			console.log(`Database Error: ${error.message}`);
		}
	}

	public async save(walletEntity: WalletEntity): Promise<WalletEntity | null> {
		try {
			return this.repository.save(walletEntity);
		} catch (error) {
			console.log(`Database Error: ${error.message}`);
		}
	}

	public async update(walletEntity: WalletEntity): Promise<UpdateResult | null> {
		try {
			return this.repository.update(walletEntity.id, walletEntity);
		} catch (error) {
			console.log(`Database Error: ${error.message}`);
		}
	}
}
