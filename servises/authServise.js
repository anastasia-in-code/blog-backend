import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config.js'

class authServise {
   createToken(id) {
      return jwt.sign(
         { id: id },
         JWT_SECRET,
         { expiresIn: '30d' }
      )
   }
   verifyToken(token) {
      return jwt.verify(token, JWT_SECRET)
   }
}

export default new authServise()