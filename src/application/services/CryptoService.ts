import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISellBitcoin } from 'src/dominio/entities/SellBitcoin';
import { BITCOINT, IBitcoinRepository } from '../interfacces/IBitcoinRepository';
import { IBuyBitcoin } from 'src/dominio/entities/BuyBitcoin';
import { IWalletRepository, WALLET } from '../interfacces/IWalletRepository';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { InsufficientFundsException } from 'src/dominio/errors/InsufficientFundsException';

@Injectable()
export class CryptoService {
	constructor(
		@Inject(BITCOINT) private bitcoinRepository: IBitcoinRepository,
		@Inject(WALLET) private walletRepository: IWalletRepository,
	) {}

	public async buyBitcoin(buyBitcoin: IBuyBitcoin): Promise<string> {
		const amount = await this.calcculateAmount(buyBitcoin.amount);
		let walletEntity = await this.walletRepository.findByUserId(buyBitcoin.userId);
		if (!walletEntity) {
			walletEntity = new WalletEntity(buyBitcoin.userId, amount);
		}
		walletEntity.balance = walletEntity ? walletEntity.balance + amount : amount;
		await this.walletRepository.save(walletEntity);
		return amount.toFixed(10);
	}

	public async calcculateAmount(amount: number): Promise<number> {
		const priceBitcoin = await this.bitcoinRepository.get();
		return amount / priceBitcoin.bitcoin.usd;
	}

	public async sellBitcoin(sellBitcoin: ISellBitcoin): Promise<void> {
		const walletEntity = await this.walletRepository.findByUserId(sellBitcoin.userId);
		if (!walletEntity) {
			throw new NotFoundException(`User Id: ${sellBitcoin.userId} not found`);
		}
		if (walletEntity.balance <= sellBitcoin.amount || walletEntity.balance <= 0) {
			throw new InsufficientFundsException();
		}
		walletEntity.balance -= sellBitcoin.amount;
		await this.walletRepository.update(walletEntity);
	}

	public async get(userId: string): Promise<number> {
		const walletEntity = await this.walletRepository.findByUserId(userId);
		if (!walletEntity) {
			throw new NotFoundException(`User Id: ${userId} not found`);
		}
		const price = await this.bitcoinRepository.get();
		return price.bitcoin.usd * walletEntity.balance;
	}
}
