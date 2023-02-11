import { AccountBalance, AccountBalanceService } from './account-balance'
import { AccountStake, AccountStakeService } from './account-stake'

export type Wallet = {
    key: string,
    rdt: number
}

export class WalletService {

    static loadWallet(walletKey: string): Promise<Wallet> {

        AccountStakeService.getStakes(walletKey)

        return new Promise((resolve, reject) => {
            AccountBalanceService.getBalances(walletKey)
                .then(accountBalance => {
                    console.log("AccountBalance: " + JSON.stringify(accountBalance))
                    let wallet: Wallet = {
                        key: walletKey,
                        rdt: getRdtFromWalletBalance(accountBalance)
                    }
                    resolve(wallet)
                }
                ).catch(error => reject(error))
        })
    }
}


function getRdtFromWalletBalance(walletBalance: AccountBalance): number {

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

