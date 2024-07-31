import { WalletEntity } from 'src/dominio/entities/WalletEntity';

export const sellBitcoin = {
	userId: '2ea91c17-c871-40f1-88a6-7386f1fac865',
	amount: 1,
	currency: 'string',
	walletAddress: 'string',
	paymentMethod: 'string',
};

export const buyBitcoin = {
	userId: '2ea91c17-c871-40f1-88a6-7386f1fac865',
	amount: 1000,
	currency: 'string',
	walletAddress: 'string',
	paymentMethod: 'string',
};

export const walletEntity = new WalletEntity('2ea91c17-c871-40f1-88a6-7386f1fac865', 0);
