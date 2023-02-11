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
    
    static getRequestBody(accountAddress: string) {
        return {
            network_identifier: {
                network: "mainnet"
            },

            account_identifier: {
                address: accountAddress
            }
        }
    }

    static getFetchOptionsByAddress(accountAddress: string): RequestInit {

        const requestBody = this.getRequestBody(accountAddress)

        return {
            method: 'POST',
            body: JSON.stringify(requestBody),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    static getFetchOptionsWithRequestBody(requestBody: any): RequestInit {

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