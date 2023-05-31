import { Wallet } from '../../assets/js/wallet/wallet-service';

export type CashbackConfig = {
  project: string,
  maxCashback: number,
  limitRdt: number,
  limitNordicStake?: number,
  vikingland: string,
  telegram: string,
  limitedProject?: string,
  calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet) => number,
}

export const Cashbacks = [
  {
    project: 'Arcane Labyrinth NFT',
    maxCashback: 20,
    limitRdt: 500,
    vikingland: 'https://www.vikingland.io/collection/Arcane%20Labyrinth%20NFT',
    telegram: 'https://twitter.com/radix_radiator/status/1663848979203751942?s=20',
    limitedProject: 'vikingland_arcanelabyrinth',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'Babylon Carnival',
    maxCashback: 25,
    limitRdt: 500,
    vikingland: 'https://www.vikingland.net/collection/Babylon%20Carnival',
    telegram: 'https://twitter.com/radix_radiator/status/1658120082772439045?s=46&t=SBC-RzgKlYcQymn02a8ytg',
    limitedProject: 'vikingland_babyloncarnival',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'CerbyNFT',
    maxCashback: 20,
    limitRdt: 500,
    vikingland: 'https://www.vikingland.io/collection/CerbyNFT',
    telegram: 'https://t.me/radix_radiator/5611',
    limitedProject: 'vikingland_cerbynft',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'CerberRADS',
    maxCashback: 20,
    limitRdt: 666,
    vikingland: 'https://www.vikingland.io/collection/CerberRADS',
    telegram: 'https://t.me/radix_radiator/5556',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'Radix Ratz',
    maxCashback: 30,
    limitRdt: 500,
    vikingland: 'https://www.vikingland.io/collection/Radix%20Ratz',
    telegram: 'https://t.me/radix_radiator/4886',
    limitedProject: 'vikingland_radixratz',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'Horrible Heads',
    maxCashback: 25,
    limitRdt: 500,
    vikingland: 'https://www.vikingland.io/collection/Horrible%20Heads',
    telegram: 'https://t.me/radix_radiator/4571',
    limitedProject: 'vikingland_horribleheads',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'Roidettes',
    maxCashback: 20,
    limitRdt: 300,
    vikingland: 'https://www.vikingland.io/collection/Roidettes',
    telegram: 'https://t.me/radix_radiator/3605',
    limitedProject: 'vikingland_roidettes',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        return config.maxCashback;
      } else {
        return null;
      }
    },
  },
  {
    project: 'Shardeez',
    maxCashback: 25,
    limitRdt: 150,
    limitNordicStake: 1000,
    vikingland: 'https://www.vikingland.net/collection/Shardeez',
    telegram: 'https://t.me/radix_radiator/1249',
    calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
      if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
        if (wallet.staked_at_nordic >= config.limitNordicStake) {
          return config.maxCashback;
        } else {
          return 20;
        }
      } else {
        return null;
      }
    },
  },
];
