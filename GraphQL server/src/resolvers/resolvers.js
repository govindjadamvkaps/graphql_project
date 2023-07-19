import { users,quotes } from "../fakedb.js";
import  {randomBytes} from 'crypto'
import UserModel from "../models/UserModel.js";
import bcrype from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js";
import QuotesModel from "../models/QuotesModel.js";
const resolvers = {

    Query:{
        users:async()=>{
            const user = await UserModel.find()
            return user
        },

        user:async(parents,args )=>{
            const user = await UserModel.findById(args._id)
            return user
        },
        quotes:async()=>{
            // quotes
            let quote = await QuotesModel.find().populate("by")
            
            // console.log("quotessss",quote)
            return quote
        },
        iquotes:async(parents,args)=>{
            //for facke db.js
            // quotes.filter(item=>item.by==args.by)

            // for mongodb database
            // console.log(args.by)
            const quotes = await QuotesModel.findOne({by:args.by})
           
            // console.log(quotes)
            return quotes
            
        },
        myprofile:async(_, args, context)=>{
            try {
                const userId = context.userId
                // console.log("userIdd", userId)
                if(!userId) throw new Error('You must be Login')
                const user = await UserModel.findOne({_id:userId})

                // console.log("user", user)
                return user 
            } catch (error) {
                
            }
        }
    },

    UserModel:{
     quotes:async(ur)=>{
        // console.log("====>",ur)
        // quotes.filter(item=>item.by==ur._id)
        const user = await QuotesModel.find({by:ur._id})
        return user
     }
    },

    Mutation:{
        signupUser:async(_,{userNew}) =>{
            // const _id = randomBytes(5).toString('hex')
            // users.push({
            //     _id,
            //     ...userNew
            // })
            // return users.find(user=>user._id==_id)


            const user  = await UserModel.findOne({email:userNew.email})

            if(user){
                throw new Error(`user already exist`)
            }
           const hashPassword =  await bcrype.hash(userNew.password,10)

           const newUser = new UserModel({
            ...userNew,
           password: hashPassword
           })

           return await newUser.save()

        } ,


        singinUser:async(_,{usersignIn}) =>{
        
         const user = await UserModel.findOne({email:usersignIn.email})
         if(!user){
            throw new Error(`user does not exist`)
         }
        const isPasswordMatch = await bcrype.compare(usersignIn.password, user.password)

        if(!isPasswordMatch){
            throw new Error('email or password is invalid')
        }
        const token = jwt.sign({userId:user._id},SECRET_KEY)

        // return {token:token, firstName: user.firstName, lastName:user.lastName, _id:user._id}
        return {token:token,user:user}

        } ,

        createQuote:async(_, {name},context)=>{
            // console.log("contextt",context)
            const userId = context.userId
            if(!userId){
                throw new Error(`you must be logged in`)
            }
            const quotes =new QuotesModel({name , by:userId})

            const savedQuote = await quotes.save()
            return "quotes created successfully"
            // return {name:savedQuote}
        }
    }
}


export default resolvers