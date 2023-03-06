export interface LimitedCashbacks {
    time: string
    cashbacks: LimitedCashback[]
}

export interface LimitedCashback {
    project: string
    "max-cashback-count": number
    "total-cashback-count": number
}

export class LimitedCashbacksService {
    static loadLimitedCashbacks(): Promise<LimitedCashbacks> {
        return new Promise((resolve, reject) => {
            fetch("http://a8c0085.online-server.cloud:5742/limited-cashbacks")
            //fetch("http://127.0.0.1:5742/limited-cashbacks")
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