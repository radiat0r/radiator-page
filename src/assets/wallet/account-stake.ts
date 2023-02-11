import { RadixAccountStakeService, LedgerState, TokenIdentifier } from './account-common'

export type AccountStake = {
    pending_stakes: PendingStake[]
    stakes: Stake[]
    ledger_state: LedgerState
}

export type PendingStake = {
    validator_identifier: ValidatorIdentifier
    delegated_stake: DelegatedStake
}

export type ValidatorIdentifier = {
    address: string
}

export type DelegatedStake = {
    value: string
    token_identifier: TokenIdentifier
}

export type Stake = {
    validator_identifier: ValidatorIdentifier
    delegated_stake: DelegatedStake
}

export class AccountStakeService {

    static getStakes(walletKey: string): Promise<AccountStake> {
        return new Promise((resolve, reject) => {

            fetch(RadixAccountStakeService.getAccountUrl("/stakes"), RadixAccountStakeService.getFetchOptionsByAddress(walletKey))
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