import localforage from 'localforage'
import EncryptionManager from './encrypt'

export default class CacheManager extends EncryptionManager {
    constructor() {
        super()
    }

    writeData = (key, data) => {
        return new Promise(async (resolve, reject) => {
            const encryptedData = this.encrypt(data)
            localforage.setItem(key, encryptedData).then(() => resolve(true))
        })
    }

    readData = key => {
        return new Promise(async (resolve, reject) => {
            const encryptedData = await localforage.getItem(key)
            const decryptedData = this.decrypt(encryptedData)
            console.log(decryptedData)
            if (decryptedData !== '' && decryptedData !== null && decryptedData != undefined)
                resolve(decryptedData)
            else
                throw new Error(`Отсутствует запись запрошенных данных: ${key}`)
        })
    }

    removeData = key => {
        return new Promise(async (resolve, reject) => {
            localforage.removeItem(key).then(() => resolve(true))
        })
    }

    clear = () => {
        localforage.clear()
    }
}