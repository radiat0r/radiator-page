import { WalletBalance } from './wallet-balance'

export type Wallet = {
    key: string,
    rdt: number
}

export class WalletService {

    static loadWallet(walletKey: string): Promise<Wallet> {

        return new Promise((resolve, reject) => {

            this.getBalances(walletKey)
                .then(walletBalance => {
                    console.log("WalletBalance: " + JSON.stringify(walletBalance))
                    let wallet: Wallet = {
                        key: walletKey,
                        rdt: getRdtFromWalletBalance(walletBalance)
                    }
                    resolve(wallet)
                }
                ).catch(error => reject(error))
        })
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
                    console.log("Balances response: " + JSON.stringify(response))
                    if (!response.ok) {
                        throw new Error(response.status.toString() + " | " + response.statusText)
                    }
                    resolve(response.json())
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}


function getRdtFromWalletBalance(walletBalance: WalletBalance): number {

    const RDT_IDENTIFIER = "rdt_rr1qwencdmhktehqfcha2yp3sxghqlzyf5eplkf4ac8dvdq5k8pka"

    let rdt = 0
    walletBalance.account_balances.liquid_balances.forEach(balance => {
        if (balance.token_identifier.rri == RDT_IDENTIFIER) {
            rdt = parseInt(balance.value)
            console.log("$RDT: " + rdt)
        }
    })

    return rdt
}

