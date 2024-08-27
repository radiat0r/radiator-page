import { RadixNetwork } from '@radixdlt/radix-dapp-toolkit';

interface Config {
  applicationName: string;
  crumbsupUrl: string;
  crumbsToken: string;
  daoCreationFee: number;
  proposalCreationFee: number;
  networkId: number;
  radixDashboardUrl: string;
  radixGatewayUrl: string;
  dAppDefinitionAddress: string;
  componentAddress: string;
  daoResourceAddress: string;
  proposalResourceAddress: string;
  daoAdminBadgeAddress: string;
  voteNftAddress: string;
}



export function getConfig(): Config {
  return {
    applicationName: 'CrumbsUp',
    crumbsupUrl: 'https://crumbsup.io',
    crumbsToken: 'resource_rdx1t5xg95m0mhnat0wv59ed4tzmevd7unaezzm04f337djkp8wghz2z7e',
    daoCreationFee: 100000.0,
    proposalCreationFee: 0.0,
    networkId: RadixNetwork.Mainnet,
    radixDashboardUrl: 'https://dashboard.radixdlt.com',
    radixGatewayUrl: 'https://mainnet.radixdlt.com',
    dAppDefinitionAddress: 'account_rdx169dlzydn4f2pekcd2an2nj0506g9v7fytp9a4thkw6secy7zjt0zg2',
    componentAddress: 'component_rdx1cpupsxrv4y36n46d0d9elev9qwjw8p4up58h6ll6yff5p8sh20qckm',
    daoResourceAddress: 'resource_rdx1nfrc5swndv3dhntzzc2zfzpttmx57y9sfk3ajmldqpey5trvwm8p8z',
    proposalResourceAddress: 'resource_rdx1n2drsjp9fagqhn90jz2lwfy72wa00ka77a8fufk06udltqcykxtz0r',
    daoAdminBadgeAddress: 'resource_rdx1n2dp5tgpqvtdu3keznue70fh8wcgmn40t5tz3er84cwm5fum38jrt3',
    voteNftAddress: 'resource_rdx1ntra9m8nevh0njvaqfrkvy6erzdwclzqjnnjzvvc3swvufv6y27lwy',
  };
}
