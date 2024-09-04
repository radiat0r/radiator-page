import {
  RadixDappToolkit,
  DataRequestBuilder,
  WalletDataStateAccount
} from '@radixdlt/radix-dapp-toolkit';
import {
  FungibleResourcesCollectionItemVaultAggregated,
  GatewayApiClient,
  LedgerStateSelector,
  StateEntityDetailsOptions,
  StateEntityDetailsResponseFungibleVaultDetails,
  StateEntityDetailsResponseItem,
  StateEntityDetailsVaultResponseItem
} from '@radixdlt/babylon-gateway-api-sdk';
import { getConfig } from '../../src/config';

const config = getConfig();

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress: config.dAppDefinitionAddress,
  networkId: config.networkId,
  applicationName: config.applicationName,
  applicationVersion: '1.0.0',
});


export const gatewayApi = GatewayApiClient.initialize(
  rdt.gatewayApi.clientConfig,
);


rdt.walletApi.setRequestData(
  DataRequestBuilder.persona().withProof(false),
  DataRequestBuilder.accounts().atLeast(1).withProof(false),
);


export class DappUtils {

  static getWallets(): WalletDataStateAccount[] {
    return rdt.walletApi.getWalletData()!!.accounts;
  }

  static async getEntityDetails(entityAddress: string): Promise<StateEntityDetailsVaultResponseItem> {
    const options: StateEntityDetailsOptions = {
      explicitMetadata: [],
      ancestorIdentities: true,
      nonFungibleIncludeNfids: false,
      packageRoyaltyVaultBalance: true,
      componentRoyaltyVaultBalance: true
    };
    const entityDetails = await gatewayApi.state.getEntityDetailsVaultAggregated(entityAddress, options);
    return entityDetails;
  }


  // returns all resource balances at timestamp for wallet account
  static async getFungibleBalanceForAccountAndTime(accountAddress: string, d: Date): Promise<FungibleResourcesCollectionItemVaultAggregated[]> {
    try {
      const ls_opts: LedgerStateSelector = { timestamp: d };

      const result = await gatewayApi.state.getEntityDetailsVaultAggregated(accountAddress, {}, ls_opts)

      const ress: FungibleResourcesCollectionItemVaultAggregated[] = result.fungible_resources.items;
      return ress;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Error retrieving data"));
    }
  }

  // returns all balance for vault at timestamp
  static async getFungibleBalanceForVaultandTime(vault_address: string, d: Date): Promise<number> {
    try {
      const ls_opts: LedgerStateSelector = { timestamp: d };

      const result: StateEntityDetailsResponseItem = await gatewayApi.state.getEntityDetailsVaultAggregated(vault_address, {}, ls_opts)
      let balance: number = 0;

      if (result.details) {
        const vaultDetails = result.details as StateEntityDetailsResponseFungibleVaultDetails;
        if (vaultDetails) {
          balance = parseFloat(vaultDetails.balance.amount);
          //console.log(vaultDetails);
        }
      }

      return balance;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Error retrieving data"));
    }
  }

}
