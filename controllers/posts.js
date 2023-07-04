import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

//Create post
export const createPost = async (req, res) => {
   try {
      const { title, text } = req.body
      const user = await User.findById(req.userId)

      const postData = {
         username: user.username,
         title,
         text,
         author: req.userId
      }

      if (req.files) {
         let fileName = Date.now().toString() + req.files.image.name
         const __dirname = dirname(fileURLToPath(import.meta.url))
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

         postData.imgUrl= fileName
      } else {
         postData.imgUrl= ''
      }

      const newPost = new Post (postData)
      await newPost.save()
      await User.findOneAndUpdate({_id: req.userId}, {
         $push: {posts: newPost}
      })

      res.json(newPost)
   } catch (error) {
      console.log(error)
      res.json({
         message: 'Something went wrong('
      })
   }
}

export const getAll = async (req, res) => {
   try {
      const posts = await Post.find().sort('-createdAt')
      const popularPosts = await Post.find().limit(5).sort('-views')

      if(!posts) {
         return res.json({
            message: 'No posts yet'
         })
      }
      res.json({posts, popularPosts})
   } catch (error) {
      console.log(error)
   }
}

export const getById = async (req, res) => {
   try {
      const post = await Post.findOneAndUpdate({_id :req.params.id}, {
         $inc: {views : 1}
      })

      res.json(post)
   } catch (error) {
      console.log(error)
   }
}

export const getMyPosts = async (req, res) => {
   try {
      const user = await User.findById(req.userId)
      const list = await Promise.all(
         user.posts.map(post=> {
            return Post.findById(post._id)
         })
      )
      
      res.json(list)
   } catch (error) {
      console.log(error)
      res.json({
         message: 'Something went wrong('
      })
   }
}

export const deletePost= async (req, res) => {
   try {
      const post = await Post.findByIdAndDelete(req.params.id)
      if(!post) return res.json({message: 'Post doesn`t exist'})

      await User.findByIdAndUpdate(req.userId, {
         $pull : {posts: req.params.id}
      })

      res.json({id: req.params.id, message : 'Post was successfully deleted'})
   } catch (error) {
      console.log(error)
   }
}

export const updatePost = async (req, res) => {
   try {
      const {title, text, id} = req.body
      const post = await Post.findById(id)

      if (req.files) {
         let fileName = Date.now().toString() + req.files.image.name
         const __dirname = dirname(fileURLToPath(import.meta.url))
         req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

         post.imgUrl= fileName
      } 
      post.title = title
      post.text = text

      await post.save()
      res.json(post)
   } catch (error) {
      console.log(error)
      res.json({
         message: 'Something went wrong('
      })
   }
}

export const getPostComments = async (req, res) => {
   try {
      const post = await Post.findById(req.params.id)

      const list = await Promise.all(
         post.comments.map(comment => {
            return Comment.findById(comment)
         })
      )

      res.json(list)
   } catch (error) {
      console.log(error)
      res.json({
         message: 'Something went wrong('
      })
   }
}