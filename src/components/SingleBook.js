import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NoImage from "../assets/1024px-No_image_available.svg.png";
import { Link } from "react-router-dom";

const api_key = process.env.REACT_APP_API_KEY;

function SingleBook() {
   const { id } = useParams();
   const [book, setBook] = useState({});

   const fetchSingleBook = async () => {
      try {
         const request = await axios.get(`${id}?key=${api_key}`);
         setBook(request.data.volumeInfo);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchSingleBook();
   }, []);

   const { title, categories, authors, description } = book;

   return (
      <Wrapper>
         <div className="image_container">
            {book.imageLinks ? (
               <img src={book.imageLinks.large} alt="" />
            ) : (
               <img src={NoImage} alt="" />
            )}
         </div>
         {/* <img src={large} alt="" /> */}
         <div className="info">
            <h1>
               <span className="header">title : </span>
               {title}
            </h1>
            <p>
               <span className="header">categories : </span>
               {categories}
            </p>
            <p>
               <span className="header">authors : </span>
               {authors}
            </p>
            <div className="desc">
               <span className="header">description : </span>
               <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <Link to="/" className="details_btn">
               back to books
            </Link>
         </div>
      </Wrapper>
   );
}

export default SingleBook;

const Wrapper = styled.div`
   width: 80vw;
   max-width: 960px;
   margin: 2rem auto;
   text-align: center;
   display: grid;
   grid-gap: 2rem;
   grid-template-columns: 40rem 1fr;
   .image_container img {
      width: 100%;
      object-fit: contain;
   }

   .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h1 {
         font-size: 3rem;
         text-align: left;

         margin-bottom: 1rem;
      }
      p,
      .desc {
         text-align: left;
         font-size: 1.5rem;
         margin-bottom: 1rem;
      }
   }

   .header {
      text-transform: capitalize;
      color: green;
      font-weight: bolder;
   }
   .details_btn {
      margin-top: 2rem;
      background-color: tomato;
      width: auto;
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
      :hover {
         opacity: 1;
      }
   }
   @media (max-width: 834px) {
      grid-template-columns: 25rem 1fr;
      .info {
         h1 {
            font-size: 2rem;
            text-align: left;
            margin-bottom: 1rem;
         }
         p,
         .desc {
            text-align: left;
            font-size: 1.3rem;
            margin-bottom: 1rem;
         }
      }
   }
   @media (max-width: 768px) {
      grid-template-columns: 1fr;
      .details_btn {
         margin: 2rem auto;
      }
   }
`;
