import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
   name: "book",
   initialState: {
      books: [],
      searchText: "",
      category: "all",
      totalItems: 0,
      step: 0,
      orderBy: "relevance",
      isLoading: false,
      isError: false,
      isModalOpen: false,
   },

   reducers: {
      GET_BOOKS_BEGIN: (state) => {
         return { ...state, isLoading: true };
      },
      GET_BOOKS_SUCCESS: (state, action) => {
         if (action.payload.items && action.payload.items.length > 0) {
            return {
               ...state,
               books: [...action.payload.items, ...state.books],
               totalItems: action.payload.totalItems,
               isLoading: false,
            };
         } else {
            return {
               ...state,

               totalItems: action.payload.totalItems,
               isLoading: false,
            };
         }
      },
      GET_BOOKS_ERROR: (state) => {
         return { ...state, isLoading: false, isError: true };
      },
      CHANGE_VALUE: (state, action) => {
         return {
            ...state,
            books: [],
            searchText: action.payload,
            step: 0,
         };
      },
      UPDATE_CATEGORY: (state, action) => {
         return {
            ...state,
            books: [],
            category: action.payload,
            step: 0,
         };
      },
      UPDATE_ORDERBY: (state, action) => {
         return {
            ...state,
            books: [],
            orderBy: action.payload,
            step: 0,
         };
      },
      MORE_BOOKS: (state) => {
         if (state.step >= state.totalItems) {
            return { ...state, step: state.totalItems };
         } else return { ...state, step: state.step + 30 };
      },
   },
});

export const {
   GET_BOOKS_BEGIN,
   GET_BOOKS_SUCCESS,
   GET_BOOKS_ERROR,
   CHANGE_VALUE,
   UPDATE_CATEGORY,
   UPDATE_ORDERBY,
   MORE_BOOKS,
} = bookSlice.actions;

export const selectBook = (state) => state.books;

export default bookSlice.reducer;
