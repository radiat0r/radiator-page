import { Wallet } from '../../assets/wallet/wallet-service'

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
        project: 'CerbyNFT',
        maxCashback: 20,
        limitRdt: 500,
        vikingland: 'https://www.vikingland.io/collection/CerbyNFT',
        telegram: 'https://t.me/radix_radiator/5611',
        limitedProject: 'vikingland_cerbynft',
        calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
            if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
                return config.maxCashback
            } else {
                return null
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
                return config.maxCashback
            } else {
                return null
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
                return config.maxCashback
            } else {
                return null
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
                return config.maxCashback
            } else {
                return null
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
                return config.maxCashback
            } else {
                return null
            }
        },
    },
    {
        project: 'RadFam',
        maxCashback: 25,
        limitRdt: 500,
        limitNordicStake: 1000,
        vikingland: 'https://www.vikingland.io/collection/RadFam',
        telegram: 'https://t.me/radix_radiator/3059',
        calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
            if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
                if (wallet.staked_at_nordic >= config.limitNordicStake) {
                    return config.maxCashback
                } else {
                    return 20
                }
            } else {
                return null
            }
        },
    },
    {
        project: 'Mutant Cat Society',
        maxCashback: 20,
        limitRdt: 150,
        limitNordicStake: 1000,
        vikingland: 'https://www.vikingland.net/collection/Mutant%20Cat%20Society',
        telegram: 'https://t.me/radix_radiator/1886',
        calcCashbackBenefit: (config: CashbackConfig, wallet: Wallet): number => {
            if (wallet.rdt >= config.limitRdt && wallet.rdt_7_days_ago >= config.limitRdt) {
                if (wallet.staked_at_nordic >= config.limitNordicStake) {
                    return config.maxCashback
                } else {
                    return 15
                }
            } else {
                return null
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
                    return config.maxCashback
                } else {
                    return 20
                }
            } else {
                return null
            }
        },
    },
]
