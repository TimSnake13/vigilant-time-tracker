import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";

const GET_TITLE = gql`
  query GetAllBooks {
    books {
      title
      author
    }
  }
`;

const apollo = () => {
  const { loading, error, data } = useQuery(GET_TITLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      Apollo Client Test:
      {data.books.map((book) => (
        <div key={book.title}>
          Book: {book.title} {book.author}
        </div>
      ))}
    </div>
  );
};

export default apollo;
