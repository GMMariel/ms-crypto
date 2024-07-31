import { BitcoinResponse } from 'src/dominio/entities/BitcoinResponse';

export const BITCOINT = 'IBitcoinRepository';

export interface IBitcoinRepository {
	get(): Promise<BitcoinResponse | null>;
}
