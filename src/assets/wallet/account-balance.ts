import { RadixAccountStakeService, LedgerState, TokenIdentifier } from './account-common'

export type AccountBalance = {
    ledger_state: LedgerState
    account_balances: AccountBalances
}

export type AccountBalances = {
    staked_and_unstaking_balance: Balance
    liquid_balances: Balance[]
}

export type Balance = {
    value: string
    token_identifier: TokenIdentifier
}

export class AccountBalanceService {

    static getBalances(walletKey: string): Promise<AccountBalance> {
        return new Promise((resolve, reject) => {

            fetch(RadixAccountStakeService.getAccountUrl("/balances"), RadixAccountStakeService.getFetchOptions(walletKey))
                .then(response => {
                    console.log(response)
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