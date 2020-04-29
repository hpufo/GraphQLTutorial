import React,{useState} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';
//To make a graphQL query you need to use gql

function BookList(props) {
  const data = props.data;
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <ul id="book-list">
        {data.loading? 
        <div>loading...</div>:
        data.books.map((book) => (
          <li key={book.id} onClick={e => {setSelected(book.id)}}>{book.name}</li>
          ))}
      </ul>
      <BookDetails bookID={selected}/>
    </div>
  );
}
//Binds the response from the query to the component in props
export default graphql(getBooksQuery)(BookList);
