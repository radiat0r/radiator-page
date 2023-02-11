export type LedgerState  = {
    version:   number
    timestamp: Date
    epoch:     number
    round:     number
}

export type TokenIdentifier = {
    rri: string
}