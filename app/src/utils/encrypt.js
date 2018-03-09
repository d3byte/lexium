import jwt from 'jsonwebtoken'

export default class EncryptionManager {
    constructor() {
        this.secret = 'aMbCfyQHiQ3yFkCG4Wwr92x5y8lmVuqPZlmL33mKxQrctDSMHMt2hvfffAShBMEbK7S24OjJBXu1m92DfuvFvp7h6NLODZqqfVzW2LAgv6zHkIazCtCRCJxYBIi45qBx'
    }

    encrypt = data => {
        const encryptedData = jwt.sign({ data }, this.secret)
        return encryptedData
    }

    decrypt = encryptedData => {
        const { data } = jwt.verify(encryptedData, this.secret)
        return data
    }
}