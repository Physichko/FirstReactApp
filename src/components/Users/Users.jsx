import cssModule from "./Users.module.css";
import noAvatar from "../../assets/images/images.png";
import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
    let curPL = curP + 5;
    let slicedPages = pages.slice( curPF, curPL);


    return (
        <div>
            <div>
                {
                    slicedPages.map(x => {
                        return <span className={props.currentPage === x && cssModule.selectedPage} onClick={(e) => props.pageChanged(x)}> {x}</span>
                    })
                }
            </div>
            {
                props.users.map(x => (<div key={x.id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + x.id}>
                                <img className={cssModule.userPhoto} src={x.photos.small != null ? x.photos.small : noAvatar}/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                x.followed
                                    ? <button onClick={() =>{
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${x.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "e48c2589-1608-45ce-9dee-168e00faf266"
                                            }
                                        })
                                            .then(response => {
                                                if(response.data.resultCode === 0){
                                                    props.unfollow(x.id)
                                                }
                                            });

                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${x.id}`, {} ,{
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "e48c2589-1608-45ce-9dee-168e00faf266"
                                            }
                                        })
                                            .then(response => {
                                                if(response.data.resultCode === 0){
                                                    props.follow(x.id)
                                                }
                                            });
                                    }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                {x.name}
                            </div>
                            <div>
                                {x.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {"x.location.country"}
                            </div>
                            <div>
                                {"x.location.city"}
                            </div>
                        </span>
                    </span>
                </div>))
            }
        </div>);
}

export default Users;