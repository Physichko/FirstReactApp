import cssModule from "./Users.module.css";
import cn from "classnames";
import React, {useState} from "react";

type PaginatorPropsType = {
    totalItemsCount : number,
    pageSize : number,
    currentPage : number,
    onPageChangedCallback : (x : number) => void,
    countOfDisplayedPages? : number
}
const Paginator : React.FC<PaginatorPropsType> = ({totalItemsCount,pageSize,currentPage, onPageChangedCallback, countOfDisplayedPages = 10}) => {
    let pagesCount= Math.ceil(totalItemsCount / pageSize);
    let pages : Array<number> = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount =  Math.ceil(pagesCount / countOfDisplayedPages);
    let [currentPortionNumber, setCurrentPortionNumber] = useState(1);
    let leftPortionPageNumber = (currentPortionNumber -1 )* countOfDisplayedPages  + 1;
    let rightPortionPageNumber = currentPortionNumber * countOfDisplayedPages;


    return(
        <div>
            {
                currentPortionNumber > 1
                    ? <button onClick={() => setCurrentPortionNumber(currentPortionNumber - 1)}>
                        Prev
                      </button>
                    : <></>
            }
            {
                pages.filter(x => x >= leftPortionPageNumber && x <= rightPortionPageNumber).map(x => {
                    return(<span key={x} className={cn({[cssModule.selectedPage] : currentPage === x}, "")}
                                 onClick={(e) => onPageChangedCallback(x)}>
                        {` ${x}`}
                    </span>
                    );
                })
            }
            {
                portionCount > currentPortionNumber
                    ? <button onClick={() => setCurrentPortionNumber(currentPortionNumber + 1)}>
                        Next
                    </button>
                    : <></>
            }
        </div>
    );
};

export default Paginator;