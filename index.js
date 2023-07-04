import express from 'express'
import start from './database/startDB.js'
import {PORT} from './config.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comment.js'

const app = express()

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

app.get('/', (req, res) => {
   res.json({
      message: 'all is fine'
   })
})

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

start()

app.listen(PORT, () => {
   console.log(`server has been started on port:${PORT}`)
})