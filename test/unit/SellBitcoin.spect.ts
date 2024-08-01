import { Test, TestingModule } from '@nestjs/testing';
import { WalletEntity } from 'src/dominio/entities/WalletEntity';
import { NotFoundException } from '@nestjs/common';
import { CryptoService } from 'src/application/services/CryptoService';
import { BITCOINT } from 'src/application/interfacces/IBitcoinRepository';
import { IWalletRepository, WALLET } from 'src/application/interfacces/IWalletRepository';
import { UpdateResult } from 'typeorm';
import { sellBitcoin } from '../mock';

describe('CryptoService', () => {
	let service: CryptoService;
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
		walletRepository = module.get<IWalletRepository>(WALLET);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('sellBitcoin', () => {
		it('should throw an error if user not found', async () => {
			jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(null);

			await expect(service.sellBitcoin(sellBitcoin)).rejects.toThrow(NotFoundException);
		});

		it('should throw an error if balance is insufficient', async () => {
			const walletEntity = new WalletEntity('2ea91c17-c871-40f1-88a6-7386f1fac865', 0);

			jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(walletEntity);

			await expect(service.sellBitcoin(sellBitcoin)).rejects.toThrow('Insufficient funds');
		});

		it('should update wallet balance on successful sell', async () => {
			const walletEntity = new WalletEntity('2ea91c17-c871-40f1-88a6-7386f1fac865', 10);
			const mockUpdateResult: UpdateResult = { affected: 1, raw: {}, generatedMaps: [] };
			jest.spyOn(walletRepository, 'findByUserId').mockResolvedValue(walletEntity);
			jest.spyOn(walletRepository, 'update').mockResolvedValue(mockUpdateResult);

			await service.sellBitcoin(sellBitcoin);

			expect(walletRepository.update).toHaveBeenCalledWith(expect.any(WalletEntity));
			expect(walletEntity.balance).toBe(9);
		});
	});
});
