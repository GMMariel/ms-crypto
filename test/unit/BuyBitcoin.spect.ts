import { Test, TestingModule } from '@nestjs/testing';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { CryptoService } from 'src/application/services/CryptoService';
import { BITCOINT, IBitcoinRepository } from 'src/application/interfacces/IBitcoinRepository';
import { IWalletRepository, WALLET } from 'src/application/interfacces/IWalletRepository';
import { buyBitcoin } from '../mock';

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

	describe('buyBitcoin', () => {
		it('should calculate amount and save wallet', async () => {
			const priceBitcoin = { bitcoin: { usd: 50000 } };
			const walletEntity = new WalletEntity('2ea91c17-c871-40f1-88a6-7386f1fac865', 0);

			jest.spyOn(bitcoinRepository, 'get').mockResolvedValue(priceBitcoin);
			jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(walletEntity);
			walletEntity.id = 1;
			jest.spyOn(walletRepository, 'save').mockResolvedValue(walletEntity);

			const price = await service.buyBitcoin(buyBitcoin);

			expect(walletRepository.findByUserId).toHaveBeenCalledWith('2ea91c17-c871-40f1-88a6-7386f1fac865');
			expect(walletRepository.save).toHaveBeenCalledWith(expect.any(WalletEntity));
			expect(price).toBe('0.0200000000');
		});

		it('should calculate the correct amount of bitcoin to be purchased', async () => {
			const amountInUsd = 100;
			const amountInBitcoin = 0.01;

			jest.spyOn(bitcoinRepository, 'get').mockResolvedValue({
				bitcoin: { usd: 10000 },
			});
			const calculatedAmount = await service.calcculateAmount(amountInUsd);
			expect(calculatedAmount).toBe(amountInBitcoin);
		});

		it('should create a new wallet if none exists for the user', async () => {
			const userId = buyBitcoin.userId;
			const amountInBitcoin = '0.0100000000';
			jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(null);

			jest.spyOn(bitcoinRepository, 'get').mockResolvedValue({
				bitcoin: { usd: 10000 },
			});
			jest.spyOn(walletRepository, 'save').mockResolvedValue(null as any);
			buyBitcoin.amount = 100;
			const balance = await service.buyBitcoin(buyBitcoin);

			expect(walletRepository.findByUserId).toHaveBeenCalledWith(userId);
			expect(walletRepository.save).toHaveBeenCalledWith({
				userId,
				balance: 0.02,
			});
			expect(balance).toBe(amountInBitcoin);
		});
	});
});
