//Registration 
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import authServise from '../servises/authServise.js'


export const signup = async (req, res) => {
   try {
      const { username, password } = req.body
      const isUsed = await User.findOne({ username })

      if (isUsed) {
         return res.json({
            message: 'This username is in use'
         })
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const newUser = new User({
         username,
         password: hash
      })

      await newUser.save()

      const token = authServise.createToken(newUser._id)

      res.json({ newUser, token, message: "User was created successfully" })
   } catch (error) {
      res.json({
         message: error
      })
   }
}
//login
export const signin = async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      const isPasswordValid = user ? await bcrypt.compare(password, user.password) : null

      if (!user || !isPasswordValid) {
         return res.json({
            message: 'Username or password is invalid'
         })
      }
      const token = authServise.createToken(user._id)

      res.json({ user, token, message: 'You were logged in' })
   } catch (error) {
      res.json({
         error
      })
   }
}
//get me 
export const getMe = async (req, res) => {
   try {
      const user = await User.findById(req.userId)
      if(!user) {
         return res.json({
            message: 'Authorization failed'
         })
      }
      const token = authServise.createToken(user._id)
      res.json({
         user, 
         token
      })
   } catch (error) {
      res.json({
         error
      })
   }
}