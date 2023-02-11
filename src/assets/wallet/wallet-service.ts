import { AccountBalance, AccountBalanceService } from './account-balance'
import { AccountStake, AccountStakeService } from './account-stake'
import { AccountTransactions, AccountTransactionsService } from './account-transactions'

export type Wallet = {
    key: string,
    rdt: number,
    staked_at_nordic: number,
}

export class WalletService {

    static loadWallet(walletKey: string): Promise<Wallet> {

        return new Promise((resolve, reject) => {

            Promise.all(
                [AccountBalanceService.getBalances(walletKey),
                AccountStakeService.getStakes(walletKey),
                AccountTransactionsService.getTransactions(walletKey)])
                .then((results) => {

                    const balance = results[0] as AccountBalance
                    console.log("AccountBalance: " + JSON.stringify(balance))

                    const stake = results[1] as AccountStake
                    console.log("AccountStake: " + JSON.stringify(balance))

                    const transactions = results[2] as AccountTransactions
                    console.log("AccountStake: " + JSON.stringify(transactions))

                    let wallet: Wallet = {
                        key: walletKey,
                        rdt: this.getRdtFromAccountBalance(balance),
                        staked_at_nordic: this.getStakedXrdAtNordic(stake)
                    }
                    resolve(wallet)

                }).catch(error => reject(error));

        })
    }

    static getRdtFromAccountBalance(accountBalance: AccountBalance): number {

        const RDT_IDENTIFIER = "rdt_rr1qwencdmhktehqfcha2yp3sxghqlzyf5eplkf4ac8dvdq5k8pka"

        let rdt = 0
        accountBalance.account_balances.liquid_balances.forEach(balance => {
            if (balance.token_identifier.rri == RDT_IDENTIFIER) {
                rdt = parseInt(balance.value) / 10e17
                console.log("$RDT: " + rdt)
            }
        })

        return rdt
    }

    static getStakedXrdAtNordic(accountStake: AccountStake): number {

        const NORDIC_NODE_IDENTIFIER = "rv1qvq5dpfrte49l3hdzzarftmsqejqzf3d8dxnrx2tzdc0ljcrg88uvnlvpau"
        const XRD_IDENTIFIER = "xrd_rr1qy5wfsfh"

        let stakedXrd = 0
        accountStake.stakes.forEach(stake => {
            if (stake.validator_identifier.address == NORDIC_NODE_IDENTIFIER
                && stake.delegated_stake.token_identifier.rri == XRD_IDENTIFIER) {

                stakedXrd = parseInt(stake.delegated_stake.value) / 10e17
                console.log("Staked at StakeNordic $XRD: " + stakedXrd)
            }
        })

        return stakedXrd
    }

}




