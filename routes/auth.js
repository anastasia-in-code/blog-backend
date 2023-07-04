import {Router} from 'express'
import {signup, signin, getMe} from '../controllers/auth.js'
import {authCheck} from '../utils/authCheck.js'

const router = new Router()

//Registration
router.post('/signup', signup)

//Login
router.post('/signin', signin)

//Get me
router.get('/me', authCheck, getMe)

export default router