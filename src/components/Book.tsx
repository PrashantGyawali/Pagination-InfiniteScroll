import { forwardRef } from 'react'
import { IBook } from '../lib/types'
import Stars from './Stars'




export default forwardRef(function Book({ title, author, publish_year, genre,rating, imageId}: IBook,ref:any) {
    return (
        <div className="flex flex-row h-[200px] my-[8px] w-[100%]  md:w-[80%] text-start">
            <div className="relative m-0 overflow-hidden text-black bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                    src={`https://covers.openlibrary.org/b/id/${imageId}-M.jpg`}
                    alt="card-image" className="h-[100%] w-[130px]"/>
            </div>
            <div className="py-2 px-4 overflow-hidden">
                <h4 className="block font-sans vsm:text-[4vw] sm:text-2xl text-[max(5vw,15px)] antialiased font-semibold leading-snug tracking-normal text-zinc-950">
                    {title}
                </h4>
                <div className=' flex flex-col align-middle justify-evenly'>
                    <p className="text-start block  font-sans  text-[max(2.4vw,14px)] sm:text-base antialiased font-normal leading-relaxed text-zinc-950 max-h-[46px] overflow-hidden text-ellipsis">
                        Authors: {author.join(", ")}
                    </p>
                    <p className="text-start block font-sans text-[max(2.4vw,14px)] sm:text-base antialiased font-normal leading-relaxed text-zinc-950  max-h-[46px] overflow-hidden text-ellipsis">
                        Publised year: {publish_year}
                    </p>
                    <p className="text-start block font-sans text-[max(2.4vw,14px)] sm:text-base antialiased font-normal leading-relaxed text-zinc-950  max-h-[46px] overflow-hidden ">
                        Genre: {genre.join(", ")}
                    </p>
                    <div className="text-start flex font-sans text-[max(2.4vw,14px)] sm:text-base antialiased font-normal leading-relaxed text-zinc-950  max-h-[46px] overflow-hidden text-ellipsis">
                        Rating: <Stars rating={rating} />
                    </div>
                </div>
                <div ref={ref}></div>
                
            </div>
        </div>
    )
})
