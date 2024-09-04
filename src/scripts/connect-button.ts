import {
  RadixDappToolkit,
  DataRequestBuilder,
  WalletDataStateAccount
} from '@radixdlt/radix-dapp-toolkit';
import { FungibleResourcesCollectionItemVaultAggregated, GatewayApiClient, LedgerStateSelector, StateEntityDetailsOptions, StateEntityDetailsResponseItem, StateEntityDetailsResponseItemDetails, StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk';
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


  /*
    static async getFungibleBalanceForAccount(accountAddress: string, resourceAddress: string): Promise<number> {
      const result = await gatewayApi.state.getEntityDetailsVaultAggregated(accountAddress);
  
      console.info('Failed to determine amount of fungibles in wallet. Please try again later.');
  
      const fungibles = result.fungible_resources.items.find((item) => item.resource_address === resourceAddress)?.vaults.items || [];
      const balance = fungibles.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  
      console.info(`Account: ${accountAddress} | Fungible Resources: ${resourceAddress} | Balance: ${balance}`);
  
      return balance;
    }*/

  // returns all balances at timestamp
  static async getFungibleBalanceForAccountAndTime(accountAddress: string, d: Date): Promise<FungibleResourcesCollectionItemVaultAggregated[]> {
    try {
      const ls_opts: LedgerStateSelector = { timestamp: d };

      const result = await gatewayApi.state.getEntityDetailsVaultAggregated(accountAddress, {}, ls_opts)

      const ress: FungibleResourcesCollectionItemVaultAggregated[] = result.fungible_resources.items;
      return ress;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Fehler beim Abrufen der Daten"));
    }
  }

  // returns all balances at timestamp
  static async getFungibleBalanceForVaultandTime(entityAddress: string, d: Date): Promise<string> {
    try {
      const ls_opts: LedgerStateSelector = { timestamp: d };


      const options: StateEntityDetailsOptions = {
        explicitMetadata: [],
        ancestorIdentities: true,
        nonFungibleIncludeNfids: false,
        packageRoyaltyVaultBalance: true,
        componentRoyaltyVaultBalance: true
      };

      const result: StateEntityDetailsResponseItem = await gatewayApi.state.getEntityDetailsVaultAggregated(entityAddress, options, ls_opts)

      const vaultDetails: (StateEntityDetailsResponseItemDetails | undefined | null) = result.details;

      if (vaultDetails) {
        console.log(vaultDetails);
      }



      return "vaultBalance";
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Fehler beim Abrufen der Daten"));
    }
  }

}
