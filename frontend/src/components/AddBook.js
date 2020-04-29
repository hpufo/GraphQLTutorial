import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';


const AddBook = (props) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorID, setAuthorID] = useState(0);
  const data = props.getAuthorsQuery;

  const submitForm = e => {
    e.preventDefault();
    //To pass vars to a gql query you need to send an object containing variables with the key value pairs
    props.addBookMutation({
      variables:{
        name: name,
        genre: genre,
        authorid: authorID
      },
      refetchQueries: [{query: getBooksQuery}]  //This will refetch a query after a mutation
    });
  };

  return (
  <form onSubmit={submitForm}>
    <div className="field">
      <label>Book name:</label>
      <input type="text" onChange={e => setName(e.target.value)} />
    </div>

    <div className="field">
      <label>Genre:</label>
      <input type="text" onChange={e => setGenre(e.target.value)} />
    </div>
    
    <div className="field">
      <label>Author:</label>
      <select onChange={e => setAuthorID(e.target.value)}>
        {data.loading?
        <option disabled>Loading Authors...</option>:
        data.authors.map(author => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
    </div>

    <button>+</button>
  </form>);
}
//add these gql queries 
export default compose(
  graphql(getAuthorsQuery,{name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);