import { LedgerState, TokenIdentifier } from './account-common'

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
  