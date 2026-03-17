const mongoose=require('mongoose')



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'User Name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    address:{
        type:[String],
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'User type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
        },
    profile:{
        type:String,
        dafault:'https://www.google.com/imgres?q=user%20%20image&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190909%2Fourmid%2Fpngtree-outline-user-icon-png-image_1727916.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Fuser-icon&docid=szqkvE-_5Cm9EM&tbnid=Doa_1z7CVcrbWM&vet=12ahUKEwi68PLn3YGTAxW1VqQEHTA2CYMQnPAOegQIHBAB..i&w=360&h=360&hcb=2&ved=2ahUKEwi68PLn3YGTAxW1VqQEHTA2CYMQnPAOegQIHBAB'
    }
},{timestamps:true})

module.exports=mongoose.model('User',userSchema );