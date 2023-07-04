import authService from '../servises/authServise.js'

export const authCheck = (req, res, next) => {
   const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

   if (token) {
      try {
         const decoded = authService.verifyToken(token)
         req.userId = decoded.id
         next()
      } catch (error) {
         return res.json({
            message: 'Authorization failed'
         })
      }

   } else {
      return res.json({
         message: 'Authorization failed'
      })
   }
}