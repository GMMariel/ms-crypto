import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallets')
export class WalletEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'uuid', name: 'user_id', generated: 'uuid' })
	userId: string;

	@Column({ type: 'float', name: 'balance' })
	balance: number;

	constructor(userId: string, balance: number) {
		this.userId = userId;
		this.balance = balance;
	}
}
