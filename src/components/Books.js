import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import {
   GET_BOOKS_BEGIN,
   GET_BOOKS_ERROR,
   GET_BOOKS_SUCCESS,
   MORE_BOOKS,
   selectBook,
} from "../features/bookSlice";
import BookCard from "./BookCard";
import axios from "../axios";

const api_key = process.env.REACT_APP_API_KEY;

function Books() {
   const {
      books = [],
      searchText,
      category,
      orderBy,
      step,
      totalItems,
      isLoading,
   } = useSelector(selectBook);
   const dispatch = useDispatch();
   // const { books, category, searchText, orderBy, step, isError } =
   //    useSelector(selectBook);

   const url = `?q=${category}+intitle:${searchText}&orderBy=${orderBy}&printType:books&key=${api_key}&maxResults=30&startIndex=${
      step + 1
   }`;

   const fetchData = async (url) => {
      dispatch(GET_BOOKS_BEGIN());
      try {
         const request = await axios.get(url);
         dispatch(GET_BOOKS_SUCCESS(request.data));
      } catch (error) {
         dispatch(GET_BOOKS_ERROR());
         console.log(error);
      }
   };
   const loadMore = () => {
      dispatch(MORE_BOOKS);
   };

   useEffect(() => {
      fetchData(url);
   }, [url]);
   console.log(step);
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
               onClick={() => dispatch(MORE_BOOKS())}
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
