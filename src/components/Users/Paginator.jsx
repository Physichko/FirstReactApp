import cssModule from "./Users.module.css";
import React, {useState} from "react";

const Paginator = ({totalItemsCount,pageSize,currentPage, pageChanged, countOfDisplayedPages = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
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
                    return <span className={currentPage === x && cssModule.selectedPage} onClick={(e) => pageChanged(x)}> {x}</span>
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