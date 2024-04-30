import { MultiValue } from "react-select"

interface IBook {
    title: string,
    author: string[],
    publish_year: number,
    genre: string[]
    key: string,
    rating: number,
    imageId: string,
}

interface IPaginationDetails<T> {
    currentPage: T,
    lastPage: T,
    currentPageResults: IBook[] | [],
    titleSearch: string,
    minRatingSearch:number
    genreSearch: MultiValue<{ value: string; label: string; }>,

    setCurrentPageResults: React.Dispatch<React.SetStateAction<IBook[] | []>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<T>>,
    setLastPage: React.Dispatch<React.SetStateAction<T>>
    setTitleSearch: React.Dispatch<React.SetStateAction<string>>
    setMinRatingSearch:React.Dispatch<React.SetStateAction<number>>
    setGenreSearch: React.Dispatch<React.SetStateAction<MultiValue<{ value: string; label: string; }>>>
}

type BooksResponse = {
    results: IBook[],
    lastPage: number
}
interface ServerResponse {
    data: BooksResponse
}

interface IURLParams {
    [key: string]: string
}


export type { IBook, IPaginationDetails,BooksResponse,ServerResponse,IURLParams }