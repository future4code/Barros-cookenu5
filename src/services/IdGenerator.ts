import { v4 } from 'uuid'

class IdGenerator {
    idGenerator = () => {
        return v4()
    }
}

export default IdGenerator