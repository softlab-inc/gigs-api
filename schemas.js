  const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Query{
   test:String

 }

  type Mutation{
  test(value:String):String

}



  `;
