const { TOKEN_SECRET } = process.env

import { verify } from 'jsonwebtoken'

import { AuthToken } from '../types'

class Auth {
  get(authorization: string): string {
    const token = authorization.substr(7)

    if (!token) {
      throw new Error('Invalid token')
    }

    const { userId } = verify(token, TOKEN_SECRET) as AuthToken

    if (!userId) {
      throw new Error('Invalid token')
    }

    return userId
  }
}

export const auth = new Auth()
