import React from 'react';
import {graphql} from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = (props) => {
  const {book} = props.data;
  return (
  <div id="book-details">
    {book ?
    <div>
      <h2>{book.name}</h2>
      <p>By: {book.author.name}</p>
      <p>Genre: {book.genre}</p>
    <p>All books by this author:</p>
    <ul className="other-books">
      {book.author.books.map(item => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
    </div>:
    <div>No book slected</div>}
  </div>);
}
//whenever the prop changes rerun the query, and feed it the id 
export default graphql(getBookQuery,{
  options: (props) => {
    return {
      variables: {
        id: props.bookID
      }
    }
  }
})(BookDetails);