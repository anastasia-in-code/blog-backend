import mongoose from 'mongoose'
import { DB_USER, DB_PASSWORD, DB_NAME } from '../config.js'

const start = async () => {
   try {
      await mongoose.connect(
         `mongodb+srv://${DB_USER}:${DB_PASSWORD}@blog.gly0lej.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
      )
      console.log('DB: connected')
   } catch (error) {
      console.log(error)
   }
}

export default start