import cssModule from "./Users.module.css";
import React from "react";

const Paginator = ({totalUsersCount,pageSize,currentPage, pageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = currentPage;
    let curPF = ((curP - 6) <= 0) ?  0  : curP - 6;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);


    return(
        <div>
            {
                slicedPages.map(x => {
                    return <span className={currentPage === x && cssModule.selectedPage} onClick={(e) => pageChanged(x)}> {x}</span>
                })
            }
        </div>
    );
};

export default Paginator;