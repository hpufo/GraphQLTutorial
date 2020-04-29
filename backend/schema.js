const {
  GraphQLObjectType,
  GraphQLString, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLNonNull
} = require('graphql');
const Book = require('./models/book');
const Author = require('./models/author');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({                //wrapped in a function so it has access to things later defined
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.findById(parent.authorid);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({authorid: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    book: {           //Name of the entry point
      type: BookType,
      args: {id: {type: GraphQLID}}, //params you are expecting
      resolve(parent, args){              //parent is for relationships, args are what's specified above
        return Book.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Author.findById(args.id);
      }
    }
  }
});
//For create,update,deletion
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor:{
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){  //Where we actually do the mutation
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save(); //Returns the object after creating it
      }
    },
    addBook: {
      type: BookType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorid: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid
        });
        return book.save();
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});