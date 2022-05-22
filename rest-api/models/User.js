const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    Country:{
        type:String,
        required:true,
    },
   
    Quantity:{
        type:Number,
        min :0
        },
    Year:{
       type:Number,
        min :2000
        }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User',userSchema);