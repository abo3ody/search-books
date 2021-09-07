import React, { useRef } from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
   CHANGE_VALUE,
   selectBook,
   UPDATE_CATEGORY,
   UPDATE_ORDERBY,
} from "../features/bookSlice";

function SearchForm() {
   const { category, orderBy } = useSelector(selectBook);
   const dispatch = useDispatch();
   const inputRef = useRef();

   const handleSubmit = (e, value) => {
      e.preventDefault();
      const text = value.current.value;
      if (text) {
         dispatch(CHANGE_VALUE(text));
      }
   };

   const updateOrderBy = (e) => {
      const value = e.target.value;
      dispatch(UPDATE_ORDERBY(value));
   };

   const updateCategory = (e) => {
      const value = e.target.value;
      dispatch(UPDATE_CATEGORY(value));
   };

   return (
      <Wrapper>
         <h1>Search for books</h1>
         <form onSubmit={(e) => handleSubmit(e, inputRef)}>
            <input
               className="search_input"
               type="text"
               placeholder="Search book"
               ref={inputRef}
            />
            <i
               className="search_icon"
               onClick={(e) => handleSubmit(e, inputRef)}
            >
               <FaSearch />
            </i>
            <div className="filter">
               <div className="category_container">
                  <label htmlFor="category">Categories</label>

                  <select
                     name="category"
                     id="category"
                     className="category-input"
                     value={category}
                     onChange={updateCategory}
                  >
                     <option value="all">all</option>
                     <option value="art">art</option>
                     <option value="biography">biography</option>
                     <option value="computers">computers</option>
                     <option value="history">history</option>
                     <option value="medical">medical</option>
                     <option value="poetry">poetry</option>
                  </select>
               </div>
               <div className="sort_container">
                  <label htmlFor="sort" className="sort_label">
                     Sorting by
                  </label>
                  <select
                     name="sort"
                     id="sort"
                     className="sort-input"
                     value={orderBy}
                     onChange={updateOrderBy}
                  >
                     <option value="relevance">relevance </option>
                     <option value="newest">newest</option>
                  </select>
               </div>
            </div>
         </form>
      </Wrapper>
   );
}

export default SearchForm;

const Wrapper = styled.div`
   background-color: #222;
   width: 100vw;
   padding: 3rem 0;
   color: #fff;
   h1 {
      color: #fff;
      text-align: center;
      font-size: 3rem;
      letter-spacing: 0.1rem;
   }
   form {
      text-align: center;
      position: relative;
      width: 50vw;
      max-width: 760px;
      margin: 0 auto;
      margin-top: 1rem;
   }

   .search_input {
      width: 100%;
      /* height: 1.5rem; */
      border-radius: 0.5rem;
      font-size: 2rem;
      padding: 1rem;
      color: #111;
      border: 0.1rem solid #222;
   }
   .search_icon {
      position: absolute;
      color: gray;
      font-size: 2rem;
      right: 0;
      top: 0;
      padding: 1rem;
      cursor: pointer;
   }
   .filter {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
   }
   .sort_container {
      margin-left: 1rem;
   }
   label {
      margin-right: 0.5rem;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
   }
   .sort-input,
   .category-input {
      border-color: transparent;
      font-size: 1.5rem;
      text-transform: capitalize;
      padding: 0.25rem 0.5rem;
   }
   @media (max-width: 768px) {
      .filter {
         flex-direction: column;
      }
      .category_container {
         margin-bottom: 1rem;
      }
      .sort_container {
         margin-left: 0;
      }
      select {
         width: 11rem;
      }
   }
   @media (max-width: 576px) {
      form {
         width: 70vw;
      }
   }
`;
