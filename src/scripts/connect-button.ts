import {
  RadixDappToolkit,
  DataRequestBuilder,
  WalletDataStateAccount
} from '@radixdlt/radix-dapp-toolkit';
import { GatewayApiClient, LedgerStateSelector, StateEntityDetailsOptions } from '@radixdlt/babylon-gateway-api-sdk';
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


  /*static getWalletAccountAddress(): string {
    return rdt.walletApi.getWalletData()!!.accounts[0].address;
  }

  static getWalletDetails(): string {
    return rdt.walletApi.getWalletData()!!.accounts[0].label;
  }*/


  static async getFungibleBalanceForAccount(accountAddress: string, resourceAddress: string): Promise<number> {
    const result = await gatewayApi.state.getEntityDetailsVaultAggregated(accountAddress);

    console.info('Failed to determine amount of fungibles in wallet. Please try again later.');

    const fungibles = result.fungible_resources.items.find((item) => item.resource_address === resourceAddress)?.vaults.items || [];
    const balance = fungibles.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    console.info(`Account: ${accountAddress} | Fungible Resources: ${resourceAddress} | Balance: ${balance}`);

    return balance;
  }

  static async getFungibleBalanceForAccountAndTime(accountAddress: string, resourceAddress: string, d: Date): Promise<number> {
    const options: StateEntityDetailsOptions = {}

    const ls_opts: LedgerStateSelector = { timestamp: d };

    const result = await gatewayApi.state.getEntityDetailsVaultAggregated(accountAddress, options, ls_opts)

    console.info('Failed to determine amount of fungibles in wallet. Please try again later.');

    const fungibles = result.fungible_resources.items.find((item) => item.resource_address === resourceAddress)?.vaults.items || [];
    const balance = fungibles.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    console.info(`Account: ${accountAddress} | Fungible Resources: ${resourceAddress} | Balance: ${balance}`);

    return balance;
  }

}
