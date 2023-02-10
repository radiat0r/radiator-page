export type WalletBalance = {
    ledger_state:     LedgerState;
    account_balances: AccountBalances;
}

export type AccountBalances = {
    staked_and_unstaking_balance: Balance;
    liquid_balances:              Balance[];
}

export type Balance = {
    value:            string;
    token_identifier: TokenIdentifier;
}

export type TokenIdentifier = {
    rri: string;
}

export type LedgerState  = {
    version:   number;
    timestamp: Date;
    epoch:     number;
    round:     number;
}