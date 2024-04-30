import { ReactNode, useContext } from "react"
import { PaginationDetailsContext } from "../../App"
import { cn } from "../../lib/utils";
import "./Pagination.css"


function PageGenerator(currentPage:number,lastPage:number,toShow?:number):ReactNode{


    const pages=[];
    const pagesElements:ReactNode[]=[];

    let noOfPagesToShow=toShow || 7;

    if(lastPage<=noOfPagesToShow)
    {   for(let i=1;i<=lastPage;i++)
        {
            {pagesElements.push(<Page key={i} currentPage={currentPage} lastPage={lastPage} i={i}/>)}
        }
        return pagesElements;
    }
    for(let i=1;i<=lastPage;i++)
    { 
        if(i==1)
        {
            pages.push(1);
            continue;
        }
        if(i==lastPage)
        {
            pages.push(lastPage);
            continue;
        }
        if(i==currentPage)
        {
            pages.push(currentPage);
            continue;
        }
        if(i>=currentPage-(noOfPagesToShow-5)*0.5 && i<=currentPage+(noOfPagesToShow-5)*0.5)
        {
            !pages.includes(i) && pages.push(i);
            continue;
        }
    }

    if(currentPage<=4)
    {
        for(let i=1;pages.length<noOfPagesToShow-1;i++)
        {
            !pages.includes(i) && pages.push(i);
        }
        pages.push(lastPage-0.75);
    }
    else if(currentPage>=lastPage-3)
    {
        for(let i=lastPage;pages.length<noOfPagesToShow-1;i--)
        {
            !pages.includes(i) && pages.push(i);
        }
        pages.push(1.75);
    }
    else{
            pages.push(currentPage-(noOfPagesToShow-5)*0.5-0.75);
            pages.push(currentPage+(noOfPagesToShow-5)*0.5+0.75);
    }
    

    pages.sort((a,b)=>a-b).forEach((i)=>pagesElements.push(<Page key={i} currentPage={currentPage} lastPage={lastPage} i={i}/>));
    return pagesElements;
}

function Page({currentPage,lastPage,i}:{currentPage:number,lastPage:number,i:number}){
    const {setCurrentPage}=useContext(PaginationDetailsContext);

    return <>
    <div className={cn("pagenumber",
            i==1 && "rounded-l-md bg-gray-300",
            i==lastPage && "rounded-r-md bg-gray-300",
            i==currentPage && "bg-blue-500 text-white",
        )} onClick={()=>setCurrentPage(Math.round(i))}>{Math.round(i)!=i?"...":i}</div>
        </>
}





export default function Pagination()
{
    const {currentPage,lastPage}=useContext(PaginationDetailsContext)
    const pages=PageGenerator(currentPage,lastPage)

    return <div className="flex flex-row justify-center">{pages}</div>
}