import { createContext, useEffect, useState, useRef } from 'react'
import { IBook, IPaginationDetails, ServerResponse, BooksResponse } from './lib/types';
import { MultiValue } from 'react-select';


import './App.css'
import Books from './pages/Books';
import Search from './components/Search/Search';
import axios, { isCancel } from 'axios';
import { cn, readURLParameters, updateURLParameter } from './lib/utils';

const basePaginationDetails: IPaginationDetails<number> = {
  currentPage: 1,
  lastPage: 1,
  currentPageResults: [],
  titleSearch: "",
  minRatingSearch: 0,
  genreSearch: [],

  setCurrentPageResults: () => { },
  setCurrentPage: () => { },
  setLastPage: () => { },
  setTitleSearch: () => { },
  setMinRatingSearch: () => { },
  setGenreSearch: () => { }
}

export const PaginationTypeContext = createContext("pagination");
export const PaginationDetailsContext = createContext<IPaginationDetails<number>>(basePaginationDetails);
export const PaginationLoadingContext = createContext(false);


function App() {
  const [paginationType, setPaginationType] = useState<string>("infinite");
  const [titleSearch, setTitleSearch] = useState<string>(readURLParameters("title"));

  const [minRatingSearch, setMinRatingSearch] = useState<number>(parseInt(readURLParameters("minRating")) || 0);

  const [genreSearch, setGenreSearch] = useState<MultiValue<{ value: string; label: string; }>>(readURLParameters("genre").split(",").filter(e => e != "").map((e) => { return { value: e, label: e } }) || [])

  const [currentPage, setCurrentPage] = useState<number>(parseInt(readURLParameters("page")) || 1);
  const [lastPage, setLastPage] = useState<number>(parseInt(readURLParameters("page")) || 1);
  const [currentPageResults, setCurrentPageResults] = useState<IBook[] | []>([]);



  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryChanged = useRef(false);


  useEffect(() => {
    currentPage > lastPage ? setCurrentPage(lastPage) : null;
    currentPage < 1 ? setCurrentPage(1) : null;
  }, [currentPage, lastPage])



  useEffect(() => {
    const pageFetchController = new AbortController();
    (async () => {

      setIsLoading(true);
      // The first type argument is the type that is returned by the api. This defaults to any.
      try {

        let res = await axios.get<BooksResponse, ServerResponse>(import.meta.env.VITE_API_URL||`http://localhost:3000/books`,
          {
            params: { title: titleSearch, page: 1, minimumRating: minRatingSearch, genre: genreSearch.map((e) => e.value).join(",") },
            signal: pageFetchController.signal
          });

        if (queryChanged.current == true) {
          setCurrentPage(1);
        }

        updateURLParameter({ title: titleSearch, minRating: minRatingSearch.toString(), genre: genreSearch.map((e) => e.value).join(",") })

        queryChanged.current = true;

        setIsLoading(false)
        setCurrentPageResults(res.data["results"]);
        setLastPage(res.data["lastPage"]);
      }
      catch (e) {
        if (e == axios.AxiosError || isCancel(e)) {console.log("Request cancelled")}
        else {console.log(e);}
      }

    }
    )();


    return () => { pageFetchController.abort(); setIsLoading(false) }
  }, [titleSearch, minRatingSearch, genreSearch])



  useEffect(() => {
    const pageFetchController = new AbortController();

    (async () => {

      setIsLoading(true)
      try {
        //If query changed and currentPage is 1, then no need to fetch the data
        if (queryChanged.current == false || currentPage > 1 && paginationType == "pagination") {
          // The first type argument is the type that is returned by the api. This defaults to any.
          let res = await axios.get<BooksResponse, ServerResponse>(import.meta.env.VITE_API_URL||`http://localhost:3000/books`,
            {
              params: { title: titleSearch, page: currentPage, minimumRating: minRatingSearch, genre: genreSearch.map((e) => e.value).join(",") },
              signal: pageFetchController.signal
            });


          setCurrentPageResults(res.data["results"]);
          setLastPage(res.data["lastPage"]);
          updateURLParameter({ title: titleSearch, minRating: minRatingSearch.toString(), genre: genreSearch.map((e) => e.value).join(",") })
        }

        setIsLoading(false)


        if (queryChanged.current) { queryChanged.current = false; }
      }
      catch (e) {
        if (e == axios.AxiosError || isCancel(e)) {console.log("Request cancelled")}
        else {console.log(e);}
      }
    }
    )();


    return () => { pageFetchController.abort(); setIsLoading(false) }
  }, [currentPage])

  useEffect(() => {
    setCurrentPageResults([]);
    setCurrentPage(1);
  }, [paginationType])

  return (
    <>
      <PaginationDetailsContext.Provider value={{
        minRatingSearch,
        genreSearch,
        currentPage,
        lastPage,
        titleSearch,
        currentPageResults,
        setCurrentPageResults,
        setCurrentPage,
        setLastPage,
        setTitleSearch,
        setGenreSearch,
        setMinRatingSearch
      }}>
        <PaginationTypeContext.Provider value={paginationType}>
          <PaginationLoadingContext.Provider value={isLoading}>
            <header className="text-center text-4xl text-black font-semibold my-2">Books Search</header>
            <div>
              <div className="flex justify-center">
                <button onClick={() => setPaginationType("infinite")} className={cn("bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2", paginationType == "infinite" && "bg-blue-500")}>Infinite</button>
                <button onClick={() => setPaginationType("pagination")} className={cn("bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2", paginationType == "pagination" && "bg-blue-500")}>Pagination</button>
              </div>
            </div>

            <Search />
            <Books />
          </PaginationLoadingContext.Provider>
        </PaginationTypeContext.Provider>
      </PaginationDetailsContext.Provider>

    </>
  )
}

export default App;
