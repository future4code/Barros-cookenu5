import * as bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

class HashManager {
    hash = async (password: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(password, salt)
        return result
    }

    compare = async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash)
    }
}

export default HashManager