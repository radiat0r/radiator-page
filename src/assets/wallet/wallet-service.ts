import { AccountBalance, AccountBalanceService } from './account-balance'
import { AccountStake, AccountStakeService } from './account-stake'
import { AccountTransactions, AccountTransactionsService } from './account-transactions'

export type Wallet = {
    key: string,
    rdt: number,
    rdt_7_days_ago: number,
    staked_at_nordic: number,
}

export class WalletService {

    private static readonly RDT_IDENTIFIER = "rdt_rr1qwencdmhktehqfcha2yp3sxghqlzyf5eplkf4ac8dvdq5k8pka"
    private static readonly NORDIC_NODE_IDENTIFIER = "rv1qvq5dpfrte49l3hdzzarftmsqejqzf3d8dxnrx2tzdc0ljcrg88uvnlvpau"
    private static readonly XRD_IDENTIFIER = "xrd_rr1qy5wfsfh"
    private static readonly HOLD_TIME = 7 * 24 * 60 * 60 * 1000


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

                    const rdt = this.getRdtFromAccountBalance(balance)
                    let wallet: Wallet = {
                        key: walletKey,
                        rdt: rdt,
                        rdt_7_days_ago: this.getRdt7DaysAgo(transactions, walletKey, rdt),
                        staked_at_nordic: this.getStakedXrdAtNordic(stake)
                    }
                    resolve(wallet)

                }).catch(error => reject(error));

        })
    }

    static getRdtFromAccountBalance(balance: AccountBalance): number {

        if (balance == null
            || balance.account_balances == null
            || balance.account_balances.liquid_balances == null) {
            return 0
        }

        let rdt = 0
        balance.account_balances.liquid_balances.forEach(balance => {
            if (balance.token_identifier.rri == this.RDT_IDENTIFIER) {
                rdt = parseInt(balance.value) / 10e17
                console.log("$RDT: " + rdt)
            }
        })

        return rdt
    }

    static getStakedXrdAtNordic(stake: AccountStake): number {

        if (stake == null || stake.stakes == null) {
            return 0
        }

        let stakedXrd = 0
        stake.stakes.forEach(stake => {
            if (stake.validator_identifier.address == this.NORDIC_NODE_IDENTIFIER
                && stake.delegated_stake.token_identifier.rri == this.XRD_IDENTIFIER) {

                stakedXrd = parseInt(stake.delegated_stake.value) / 10e17
                console.log("Staked at StakeNordic $XRD: " + stakedXrd)
            }
        })

        return stakedXrd
    }

    static getRdt7DaysAgo(transactions: AccountTransactions, walletKey: string, currentRdt: number): number {
        const holdtTimeBegin = Date.now() - this.HOLD_TIME
        console.log("Hold Time begin: " + new Date(holdtTimeBegin))

        //the executed actions of the last 7 days
        const actions = transactions.transactions
            .filter(transaction => transaction.transaction_status.status == "CONFIRMED")
            .filter(transaction => Date.parse(transaction.transaction_status.confirmed_time) > holdtTimeBegin)
            .flatMap(transaction => transaction.actions)

        console.log(actions)
        const rdtActions = actions
            .filter(action => action.type == "TransferTokens")
            .filter(action => action.to_account.address == walletKey)
            .filter(action => action.amount.token_identifier.rri == this.RDT_IDENTIFIER)

        const transactionAmount = rdtActions
            .map(action => parseInt(action.amount.value) / 10e17)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        return currentRdt - transactionAmount
    }
}
