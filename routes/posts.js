import { Router } from 'express'
import { authCheck } from '../utils/authCheck.js'
import { createPost, getAll, getById, getMyPosts, updatePost, deletePost, getPostComments } from '../controllers/posts.js'

const router = new Router()

//Add post
// http:localhost:3000/api/posts
router.post('/', authCheck, createPost)

//Get all posts
// http:localhost:3000/api/posts
router.get('/', getAll)

//Get post by Id
// http:localhost:3000/api/posts/:id
router.get('/:id', getById)

//Get my posts
// http:localhost:3000/api/posts/user/me
router.get('/user/me', authCheck, getMyPosts)

//Delete post
// http:localhost:3000/api/posts/:id
router.delete('/:id', authCheck, deletePost)

//Update post 
// http:localhost:3000/api/posts/:id
router.put('/:id', authCheck, updatePost)

//Get comments
// http:localhost:3000/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router