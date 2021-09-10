import React from "react";
// import axios from "./axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Books from "./components/Books";
import SearchForm from "./components/SearchForm";
import SingleBook from "./components/SingleBook";
import { useSelector } from "react-redux";
import { selectBook } from "./features/bookSlice";

function App() {
   const { isError } = useSelector(selectBook);

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
