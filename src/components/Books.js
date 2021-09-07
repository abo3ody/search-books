import React from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MORE_BOOKS, selectBook } from "../features/bookSlice";
import BookCard from "./BookCard";

function Books() {
   const { books = [], totalItems, isLoading } = useSelector(selectBook);
   const dispatch = useDispatch();
   return (
      <Wrapper>
         <h4>Found {totalItems} results</h4>
         <div className="booksList">
            {books.length >= 1
               ? books.map((book, index) => {
                    return <BookCard key={`${book.id}${index}`} book={book} />;
                 })
               : []}
         </div>
         {isLoading && <div className="loading"></div>}
         {books.length > 1 && books.length <= totalItems && (
            <button
               type="button"
               className="load_more_btn"
               onClick={dispatch(MORE_BOOKS)}
            >
               load more
            </button>
         )}
      </Wrapper>
   );
}

export default Books;

const Wrapper = styled.div`
   width: 80vw;
   max-width: 960px;
   margin: 2rem auto;
   text-align: center;
   h4 {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 4rem;
   }
   .booksList {
      margin: 2rem auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
   }
   .load_more_btn {
      margin-top: 2rem;
      font-size: 2rem;
      border: none;
      border-radius: 0.8rem;
      cursor: pointer;
      background-color: tomato;
      color: #fff;
      text-transform: uppercase;
      padding: 1rem 2rem;
      font-weight: bolder;
   }
   @media (max-width: 834px) {
      .booksList {
         grid-template-columns: repeat(3, 1fr);
      }
   }
   @media (max-width: 576px) {
      .booksList {
         grid-template-columns: repeat(2, 1fr);
      }
   }
   @media (max-width: 414px) {
      width: 98vw;
      .booksList {
         grid-gap: 1rem;
      }
   }
   @media (max-width: 320px) {
      width: 90vw;
      .booksList {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`;
