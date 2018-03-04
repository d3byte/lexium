export default class CacheManager {
    writeData = (key, data) => {
        return new Promise((resolve, reject) => {
            localStorage.setItem(key, JSON.stringify(data))
            resolve(true)
        })
    }

    readData = key => {
        return new Promise((resolve, reject) => {
            const data = localStorage.getItem(key)
            if (data !== '' && data !== null && data !== undefined)
                resolve(JSON.parse(data))
            else
                throw new Error(`Отсутствует запись запрошенных данных: ${key}`)
        })
    }

    removeData = key => {
        return new Promise((resolve, reject) => {
            localStorage.removeItem(key)
            resolve(true)
        })
    }

    updateData = async (key, data) => {
        const oldData = await this.readData(key)
        if (typeof oldData == 'object' || typeof oldData == 'array') {
            return new Promise((resolve, reject) => {
                this.removeData(key)
                let newData = Object.assign({}, oldData, data)
                this.setData(key, newData)
                resolve(true)
            })
        } else {
            return new Promise((resolve, reject) => {
                this.removeData(key)
                this.setData(key, data)
                resolve(true)
            })
        }
    }
}