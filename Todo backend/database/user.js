const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        required:true
    },
    mobile_number:{
    type:Number,
    required:true,
    },
    password: String,
    todo:{
        type:Array,
        childrenSchema:{
            type:Object,
            childrenSchemas:{
                task_name:{
                    type:String,
                    required:true
                },
                pending:{
                    type:Boolean,
                    required:true
                },
                tag:{
                    type:String,
                    required:true
                }
            }
        }
    },
},
{
    timestamps: true
})

const User = mongoose.model("user", userSchema);

module.exports = User;