import {Router} from 'express'
import {createComment} from '../controllers/comment.js'
import {authCheck} from '../utils/authCheck.js'

const router = new Router()

//Create comment
// http:localhost:3000/api/comments
router.post('/:id', authCheck, createComment)

export default router