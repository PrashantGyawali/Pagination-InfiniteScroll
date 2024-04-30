import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { PaginationDetailsContext, PaginationLoadingContext, PaginationTypeContext } from "../App"
import Pagination from "../components/Pagination/Pagination"
import { IBook } from "../lib/types"
import Book from "../components/Book"
import BookWrapper from "./BooksWrapper"

export default function Books() {
  const paginationType=useContext(PaginationTypeContext)
  const [ toShowBooks,setToShowBooks]=useState<IBook[]>([]);
  const  {currentPageResults,setCurrentPage,currentPage,lastPage,titleSearch,genreSearch,minRatingSearch}=useContext(PaginationDetailsContext)
  const isLoading=useContext(PaginationLoadingContext);

  const firstLoad=useRef(true);

  let hasmore=lastPage>currentPage;

  const observer=useRef<IntersectionObserver|null>(null);



  const lastElementRef=useCallback((node:HTMLDivElement)=>{
    if(isLoading) return;
    if(observer.current) observer.current.disconnect();
    observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting)
      {
        if(paginationType=="infinite" && hasmore)
        {
          setCurrentPage((prev)=>prev+1)
        }
      }
    })
    if(node) observer?.current?.observe(node)
  },[hasmore,isLoading])



  useEffect(()=>{
    firstLoad.current=false;
    if(paginationType=="pagination")
      {
        setToShowBooks(currentPageResults)
      }
    else{
      if(currentPage!=1)
        {
          setToShowBooks([...toShowBooks,...currentPageResults])
        }
        if(currentPage==1)
          {
            setToShowBooks([...currentPageResults])
          }
    }
  },[currentPageResults])
  
  useEffect(()=>{
    setToShowBooks([])
  },[titleSearch,genreSearch,minRatingSearch])





  return (
    <>
      {toShowBooks.length>0 && <div className="text-center text-4xl text-black font-semibold my-2">Results</div>}
    <BookWrapper>
      {toShowBooks.map((b:IBook,i)=>i!==toShowBooks.length-1?<Book title={b.title} author={b.author} genre={b.genre} imageId={b.imageId} publish_year={b.publish_year} rating={b.rating} key={b.imageId}/>:<Book ref={lastElementRef} title={b.title} author={b.author} genre={b.genre} imageId={b.imageId} publish_year={b.publish_year} rating={b.rating} key={b.key}/>)}
      {toShowBooks.length==0 && firstLoad && isLoading && paginationType=="pagination" &&<div className="text-center text-2xl text-black">Loading ...</div>}
      {currentPageResults.length==0 && !firstLoad.current && !isLoading &&<div className="text-center text-2xl text-black text-bold">No books found 🙁🙁</div>}
    </BookWrapper>
      {!isLoading && paginationType=="pagination" && <Pagination/>}
    </>
  )
}





