export type LedgerState  = {
    version:   number
    timestamp: Date
    epoch:     number
    round:     number
}

export type TokenIdentifier = {
    rri: string
}

export class RadixAccountStakeService {

    static getAccountUrl(resource: string) : string {
        return "https://mainnet.radixdlt.com/account" + resource
    }
    
    static getFetchOptions(accountAddress: string): RequestInit {

        let requestBody = {
            network_identifier: {
                network: "mainnet"
            },

            account_identifier: {
                address: accountAddress
            }
        }

        return {
            method: 'POST',
            body: JSON.stringify(requestBody),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}