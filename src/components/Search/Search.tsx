import { useContext, useEffect, useState } from "react"
import { PaginationDetailsContext } from "../../App";
import Select from 'react-select'
import {StarOption} from "../Stars.tsx";

import SearchIcon from "../../assets/SearchIcon.tsx"


import genres from "./genre.json"
import { MultiValue } from "react-select";
import { readURLParameters } from "../../lib/utils";

export default function Search() {
    const [search, setSearch] = useState(readURLParameters("title"));   
    const [minRating,setMinRating]=useState<number>(parseInt(readURLParameters("minRating")) || 0);
    const [genre,setGenre]=useState<MultiValue<{ value: string; label: string; }>>(readURLParameters("genre").split(",").filter(e=>e!="").map((e) => {  return { value: e, label: e } }) || []);

    const { setTitleSearch,setMinRatingSearch,setGenreSearch } = useContext(PaginationDetailsContext);


    useEffect(() => {
        let debounceTimer = setTimeout(() => {
            setTitleSearch(search);
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [search])

    useEffect(() => {
        let debounceTimer = setTimeout(() => {
            setMinRatingSearch(minRating);
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [minRating])

    useEffect(() => {
        let debounceTimer = setTimeout(() => {
            setGenreSearch(genre);
        }, 2000);

        return () => clearTimeout(debounceTimer);
    }, [genre])


    const options = genres;

    return (<>
        <div className="sm:min-w-[80vw] w-[100%] text-black">

            <div className="flex flex-col ">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="relative mb-5 w-full flex  items-center justify-between rounded-md">
                            <SearchIcon/>
                            <input type="name" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search book title" />
                        </div>

                        <div className="flex flex-col md:flex-row text-start  text-black">

                            <div className="flex flex-grow flex-col ms-2 md:ms-0">
                            <label htmlFor="genre" className="text-sm font-medium text-stone-600">Genre</label>
                            <Select isMulti name="genre" options={options} className="w-[100%]" value={genre} onChange={(e)=>setGenre(e)}/>
                            </div>

                        <div className="flex  flex-col ms-2 ">
                            <label htmlFor="manufacturer" className="text-sm font-medium text-stone-600">Min. Rating</label>
                            <select id="manufacturer"
                                className=" block w-full rounded-md border border-black bg-white px-2 py-2 shadow-sm outline-5 outline-black focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={minRating} 
                                onChange={e => setMinRating(parseInt(e.target.value))} 
                                >
                                <option value={5} className="flex"><StarOption rating={5}/></option>
                                <option value={4} className="flex"><StarOption rating={4} /></option>
                                <option value={3} className="flex"><StarOption rating={3} /></option>
                                <option value={2} className="flex"><StarOption rating={2} /></option>
                                <option value={1} className="flex"><StarOption rating={1} /></option>
                                <option value={0} className="flex"><StarOption rating={0} /></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>
    )
}
