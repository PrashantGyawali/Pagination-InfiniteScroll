import  { ReactNode, useContext } from "react";
import { PaginationLoadingContext,PaginationTypeContext } from "../App";
import { cn } from "../lib/utils";

const BookWrapper = ({ children }: { children: ReactNode }) => {
    const isLoading = useContext(PaginationLoadingContext);
    const paginationType = useContext(PaginationTypeContext);
    return <section className="relative">
        <div className={cn("h-[100%] w-[100%] absolute opacity-75 select-none pointer-events-none rounded-lg backdrop:blur-sm ", paginationType == "pagination" && isLoading && "loading-anim")}></div>
        {children}
        {paginationType == "infinite" && isLoading && <div className="w-[100%] flex justify-center"><div className=" text-2xl text-black loader"></div></div>}
    </section>
}

export default BookWrapper;