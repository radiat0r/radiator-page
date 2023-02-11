import { LedgerState, TokenIdentifier } from './account-common'

export type AccountBalance = {
    ledger_state:     LedgerState
    account_balances: AccountBalances
}

export type AccountBalances = {
    staked_and_unstaking_balance: Balance
    liquid_balances:              Balance[]
}

export type Balance = {
    value:            string
    token_identifier: TokenIdentifier
}