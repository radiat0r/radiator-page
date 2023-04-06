import { RadixAccountStakeService, LedgerState, TokenIdentifier } from './account-common'

export type AccountTransactions = {
    ledger_state: LedgerState
    transactions: Transaction[]
    total_count: number
    next_cursor: string
}

export type Transaction = {
    transaction_status: TransactionStatus
    transaction_identifier: TransactionIdentifier
    actions: Action[]
    metadata: Metadata
    fee_paid: FeePaid
}

export type TransactionStatus = {
    status: string
    confirmed_time: string
}

export type TransactionIdentifier = {
    hash: string
}

export type Action = {
    from_account: FromAccount
    to_account: ToAccount
    amount: Amount
    type: string
}

export type FromAccount = {
    address: string
}

export type ToAccount = {
    address: string
}

export type Amount = {
    value: string
    token_identifier: TokenIdentifier
}

export type Metadata = {
    hex: string
    message: string
}

export type FeePaid = {
    value: string
    token_identifier: TokenIdentifier
}

export class AccountTransactionsService {

    static getTransactions(walletKey: string, transactionsFrom: number): Promise<Transaction[]> {
        return new Promise(async (resolve, _) => {
            const transactions: Transaction[] = []
            let transactionsToRetrieve = true
            let cursor = "0"

            do {

                let response = await AccountTransactionsService.getTransactionBatch(walletKey, cursor)
                cursor = response.next_cursor

                for (const trans of response.transactions) {
                    //Transaction is younger then transactionFrom TimeStamp
                    if (Date.parse(trans.transaction_status.confirmed_time) > transactionsFrom) {
                        transactions.push(trans)
                    } else {
                        console.log("Transaction older then hold time found -> break.")
                        transactionsToRetrieve = false
                        break;
                    }
                }

                if (response.next_cursor == null) {
                    console.log("All Transactions of wallet processed.")
                    transactionsToRetrieve = false
                }


            } while (transactionsToRetrieve)

            resolve(transactions)

        })
    }

    private static getTransactionBatch(walletKey: string, cursor: string): Promise<AccountTransactions> {
        return new Promise((resolve, reject) => {

            const baseReqeuestBody = RadixAccountStakeService.getRequestBody(walletKey)
            const page = {
                cursor: cursor,
                limit: 20
            }
            const requestBody = { ...baseReqeuestBody, ...page };

            fetch(RadixAccountStakeService.getAccountUrl("/transactions"), RadixAccountStakeService.getFetchOptionsWithRequestBody(requestBody))
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw new Error(response.status.toString() + " | " + response.statusText)
                    }
                    resolve(response.json())
                })
                .catch(error => reject(error))

        })
    }
}