import React from "react";
import styled from "styled-components/macro";
import NoImage from "../assets/1024px-No_image_available.svg.png";
import { Link } from "react-router-dom";

function BookCard({ book }) {
   const {
      volumeInfo: { authors = [], categories, title },
   } = book;

   return (
      <Wrapper>
         <img
            className="book_image"
            src={
               book.volumeInfo.imageLinks === undefined
                  ? NoImage
                  : book.volumeInfo.imageLinks.thumbnail
            }
            alt={title}
         />
         <div className="card_body">
            <p className="category">
               {!categories ? "no categories provided" : categories.slice(0, 1)}
            </p>
            <h1 className="title">
               {title && title.length > 30
                  ? title.substring(0, 30) + "..."
                  : title}
            </h1>
            <p className="author">
               {authors.length > 2 ? authors.slice(0, 2) : authors}
            </p>
         </div>
         <Link className="details_btn" to={`/books/${book.id}`}>
            details
         </Link>
      </Wrapper>
   );
}

export default BookCard;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   background-color: #f6f6f6;
   padding: 2rem;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
   align-items: center;
   transition: transform 0.3s ease-in;

   /* cursor: pointer; */
   :hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
   }
   .book_image {
      width: 13rem;
      height: 20rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      object-fit: contain;
      margin-bottom: 2rem;
      background-color: #f6f6f6;
   }
   .card_body {
      display: flex;
      flex-direction: column;
      text-align: left;
      width: 100%;
   }
   .category {
      color: gray;
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
   }
   .title {
      font-size: 1.5rem;
      font-weight: bolder;
      margin-bottom: 0.5rem;
   }
   .author {
      color: gray;
      font-size: 1.3rem;
      margin-bottom: 1rem;
   }
   .details_btn {
      margin: 0 auto;
      margin-top: auto;

      background-color: tomato;
      width: 12rem;

      text-align: center;
      border-radius: 1rem;
      padding: 1rem;
      font-size: 1.5rem;
      text-decoration: none;
      color: #fff;
      font-weight: bolder;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      opacity: 0.8;
      transition: opacity 0.3s ease-in-out;
   }
   .details_btn:hover {
      opacity: 1;
   }
`;
