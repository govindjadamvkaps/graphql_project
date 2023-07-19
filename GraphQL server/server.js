import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./src/schema/schemaGql.js";
import resolvers from "./src/resolvers/resolvers.js";
import { connectDb } from "./src/db/DbConfig.js";
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "./config.js";



// This is amiddleware
const context = ({req})=>{
    // console.log("reqqqqqq", req)
    // console.log("authorization",req.headers.authorization)
    const { authorization } = req.headers
   // console.log(authorization)
    if(authorization){
       const user =  jwt.verify(authorization, SECRET_KEY)
       const userId = user.userId
        // console.log("userId=>",userId)
        // console.log(userId)
        return {userId:userId}

    }
}         
 
const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,  
    context:context,
    
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    connectDb()
    console.log(`server is running the url ${url}`)
})



  








// import { ApolloServer, gql } from "apollo-server";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
// import { users, quotes } from "./src/fakedb.js";

// const typeDefs = gql`
//   type Query {
//     users: [User]
//   }
//   type User {
//     id: ID
//     firstName: String
//     lastName: String
//   } 
// `;

// const resolvers = {
//   Query: {
//     users: () => users,
//   },
// };

// const server = new ApolloServer({
//   typeDefs: typeDefs,
//   resolvers: resolvers,
//   plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
// });

// server.listen().then(({ url }) => {
//   console.log(`server is listning ${url}`);
// });
