export interface Wallet {
    rdt: number;
}

export function loadWallet(key: string): Wallet {
    return {
        rdt: 123
    };
}