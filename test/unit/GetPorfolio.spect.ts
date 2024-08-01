import { Test, TestingModule } from '@nestjs/testing';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { NotFoundException } from '@nestjs/common';
import { CryptoService } from 'src/application/services/CryptoService';
import { BITCOINT, IBitcoinRepository } from 'src/application/interfacces/IBitcoinRepository';
import { IWalletRepository, WALLET } from 'src/application/interfacces/IWalletRepository';

describe('CryptoService', () => {
	let service: CryptoService;
	let bitcoinRepository: IBitcoinRepository;
	let walletRepository: IWalletRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CryptoService,
				{
					provide: BITCOINT,
					useValue: {
						get: jest.fn(),
					},
				},
				{
					provide: WALLET,
					useValue: {
						findByUserId: jest.fn(),
						save: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<CryptoService>(CryptoService);
		bitcoinRepository = module.get<IBitcoinRepository>(BITCOINT);
		walletRepository = module.get<IWalletRepository>(WALLET);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return the correct balance in USD for an existing user wallet', async () => {
		const userId = '2ea91c17-c871-40f1-88a6-7386f1fac865';
		const walletEntity = { userId, balance: 0.05 } as WalletEntity;
		const bitcoinPrice = { bitcoin: { usd: 10000 } };

		jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(walletEntity);
		jest.spyOn(bitcoinRepository, 'get').mockResolvedValue(bitcoinPrice);

		const balanceInUsd = await service.get(userId);

		expect(walletRepository.findByUserId).toHaveBeenCalledWith(userId);
		expect(bitcoinRepository.get).toHaveBeenCalled();
		expect(balanceInUsd).toBe(walletEntity.balance * bitcoinPrice.bitcoin.usd);
	});

	it('should throw NotFoundException if wallet is not found for the user', async () => {
		const userId = '2ea91c17-c871-40f1-88a6-7386f1fac865';

		jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(null);

		await expect(service.get(userId)).rejects.toThrow(new NotFoundException(`User Id: ${userId} not found`));
	});

	it('should call bitcoinRepository.get() to fetch the current price', async () => {
		const userId = '2ea91c17-c871-40f1-88a6-7386f1fac865';
		const walletEntity = { userId, balance: 0.05 } as WalletEntity;
		const bitcoinPrice = { bitcoin: { usd: 10000 } };

		jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(walletEntity);
		jest.spyOn(bitcoinRepository, 'get').mockResolvedValue(bitcoinPrice);

		await service.get(userId);

		expect(bitcoinRepository.get).toHaveBeenCalled();
	});
});
