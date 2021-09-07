import React, { useEffect } from "react";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Books from "./components/Books";
import SearchForm from "./components/SearchForm";
import SingleBook from "./components/SingleBook";
import { useDispatch, useSelector } from "react-redux";
import {
   GET_BOOKS_BEGIN,
   GET_BOOKS_ERROR,
   GET_BOOKS_SUCCESS,
   selectBook,
} from "./features/bookSlice";

const api_key = process.env.REACT_APP_API_KEY;
function App() {
   const { books, category, searchText, orderBy, step, isError } =
      useSelector(selectBook);
   const dispatch = useDispatch();

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

   useEffect(() => {
      fetchData(url);
   }, [category, searchText, orderBy, step]);
   return (
      <div className="App">
         <Router>
            <SearchForm />
            <Switch>
               <Route path="/" exact>
                  {isError && <h1>no books found</h1>}
                  {!isError && <Books />}
               </Route>
               <Route path="/books/:id" children={<SingleBook />}></Route>
            </Switch>
         </Router>
      </div>
   );
}

export default App;
