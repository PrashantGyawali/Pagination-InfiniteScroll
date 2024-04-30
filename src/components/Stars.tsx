import { Fragment } from "react/jsx-runtime";
export default function Stars({ rating }: { rating: number }) {
    const stars:number[] = new Array(Math.floor(rating)).fill(1)
    for(let i=0;stars.length<5;i++) stars.push(0);
    return <>
            <div className="text-yellow-400">
                {stars.map((n, i) => <Fragment key={i} >{n==1?"★":"☆"}</Fragment>)} 
            </div>
        {rating}
        </>
}

export function StarOption({ rating }: { rating: number }) {
    const stars:number[] = new Array(Math.floor(rating)).fill(1)
    for(let i=0;stars.length<5;i++) stars.push(0);
    return <>
                {stars.map((n, i) => <Fragment key={i} >{n==1?"★":"☆"}</Fragment>)} 
        {rating}
        </>
}