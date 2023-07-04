import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      username: {
         type: String,
      },
      text: {
         type: String,
         required: true
      },
      imgUrl: {
         type: String,
         default: ''
      },
      views: {
         type: Number,
         default: 0
      },
      author: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'User'
      },
      comments: [{
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'Comment'
      }]
   },
   { timestamps: true }
)

export default mongoose.model('Post', PostSchema)