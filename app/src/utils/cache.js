import EncryptionManager from './encrypt'

export default class CacheManager extends EncryptionManager {
    constructor() {
        super()
    }

    writeData = (key, data) => {
        return new Promise((resolve, reject) => {
            const encryptedData = this.encrypt(data)
            localStorage.setItem(key, encryptedData)
            resolve(true)
        })
    }

    readData = key => {
        return new Promise((resolve, reject) => {
            const encryptedData = localStorage.getItem(key)
            console.log('Encrypted data:', encryptedData)
            const decryptedData = this.decrypt(encryptedData)
            if (decryptedData !== '' && decryptedData !== null && decryptedData != undefined)
                resolve(decryptedData)
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

    clear = () => {
        localStorage.clear()
    }

    updateData = (key, data) => {
        return new Promise((resolve, reject) => {
            const encryptedOldData = this.readData(key),
                decryptedOldData = this.decrypt(encryptedOldData)
            if (typeof decryptedOldData == 'object') {
                this.removeData(key)
                let newData = Object.assign({}, decryptedOldData, data)
                this.setData(key, newData)
                return true
            } else {
                this.removeData(key)
                const encryptedData = this.encrypt(data)
                this.setData(key, encryptedData)
                return true
            }
        })
    }
}