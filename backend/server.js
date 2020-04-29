const express = require('express');
const graphqlHTTP  = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
//Allow cors
app.use(cors());

mongoose.connect('mongodb://localhost:27017/graphQLTutorial');
mongoose.connection.once('open', () =>{
  console.log('connected to database');
});
//Route for graphQL
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000,() => {
  console.log('Listening on port 4000')
});