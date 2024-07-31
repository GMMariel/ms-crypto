import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { UpdateResult } from 'typeorm';

export const WALLET = 'IWalletRepository';

export interface IWalletRepository {
	findByUserId(userId: string): Promise<WalletEntity | null>;
	save(walletEntity: WalletEntity): Promise<WalletEntity | null>;
	update(walletEntity: WalletEntity): Promise<UpdateResult | null>;
}
