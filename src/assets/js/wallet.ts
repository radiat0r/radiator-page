export interface Wallet {
    rdt: number;
}

export function loadWallet(key: string): Wallet {
    getBalances(key)
    return {
        rdt: 123
    };
}

function getBalances(walletKey: string) {

    let requestBody = {
        network_identifier: {
            network: "mainnet"
        },

        account_identifier: {
            address: walletKey
        }
    }

    fetch("https://mainnet.radixdlt.com/account/balances",
        {
            method: 'POST',
            body: JSON.stringify(requestBody),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

