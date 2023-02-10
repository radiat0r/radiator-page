import { WalletBalance } from './wallet-balance'

export type Wallet = {
    error: string
    rdt: number
}

export class WalletService {

    static loadWallet(walletKey: string): Wallet {
        let wallet: Wallet = {
            error: '',
            rdt: 0
        }

        this.getBalances(walletKey)
            .then(walletBalance => {
                wallet.rdt = getRdtFromWalletBalance(walletBalance);
            }
            ).catch(error => wallet.error = error.message)

        return wallet;
    }

    static getBalances(walletKey: string): Promise<WalletBalance> {

        let requestBody = {
            network_identifier: {
                network: "mainnet"
            },

            account_identifier: {
                address: walletKey
            }
        }

        const url = "https://mainnet.radixdlt.com/account/balances"

        return new Promise((resolve, reject) => {
            fetch(url.toString(),
                {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw new Error("An error occured while fetching wallet data. Maybe the specified wallet key is wrong. Please try again later.");
                    }
                    resolve(response.json());
                })
                .catch(error => {
                    console.log(error.message)
                    reject(error)
                });
        })
    }
}


function getRdtFromWalletBalance(walletBalance: WalletBalance): number {

    const RDT_IDENTIFIER = "rdt_rr1qwencdmhktehqfcha2yp3sxghqlzyf5eplkf4ac8dvdq5k8pka"
    
    walletBalance.account_balances.liquid_balances.forEach(balance => {
        if (balance.token_identifier.rri == RDT_IDENTIFIER) {
            return balance.value;
        }
    });

    return 0;
}

