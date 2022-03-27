import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchNext, fetchSearch, repositoriesAdd, searchHandler} from "../store/userSlice";
import {Collapse} from "antd";
import {toast} from "react-toastify";

let num = 1

const { Panel } = Collapse;

const Search = () => {
    const searchState = useSelector(state => state.users);
    const dispatch = useDispatch();

    const btnSearch = () => {
        if (searchState.textSearch.trim()) {
            dispatch(fetchSearch({text: searchState.textSearch, count: num}))
        }
    }

    const mapSearch = searchState.searchMas.map((item, i) => {
        return <div key={i} className="card m-1" style={{width: "12rem"}}>
            <img src={item.avatar_url} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-center">{item.login}</h5>
                    <a onClick={() => infoGit(item.id)} href="#" className="btn btn-outline-secondary form-control" type="button" data-bs-toggle="offcanvas"
                       data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Репозитории</a>
                </div>
        </div>
    })

    const infoGit = async id => {
        const res = searchState.searchMas.find(item => item.id === id);

        const repositories = await fetch(res.repos_url);
        const reposJson = await repositories.json();

        if (!reposJson.length){
            toast.error("Нету репозитории")
        }
        if (repositories.ok){
            dispatch(repositoriesAdd({reposJson}))
        }


    }

    const btnNext = () => {
        num += 1;
        dispatch(fetchNext({text: searchState.textSearch, count: num}))
    }

    if (searchState.users) {
        return (
            <div className="search">
                <h2>Поиск других пользователей</h2>
                <div className="input-group mb-3">
                    <input onChange={(e) => dispatch(searchHandler({text: e.target.value}))} type="text" className="form-control" placeholder="Поиск других"
                           aria-label="Recipient's username" aria-describedby="button-addon2" value={searchState.textSearch}/>
                        <button onClick={btnSearch} className="btn btn-outline-secondary " type="button" id="button-addon2">Поиск</button>
                </div>
                <div>
                    { searchState.total ?
                        <span>
                            Общая колечество найденный: <b> {searchState.total}</b>
                        </span> : null
                    }
                </div>
                <div className="d-flex flex-wrap">
                    {mapSearch}
                </div>
                {searchState.next && searchState.searchMas.length >= 20 ?
                    <div className="d-flex justify-content-center mt-2 mb-4">
                        <button onClick={btnNext} type="button" className="btn btn-outline-secondary">Загрузить еще
                        </button>
                    </div>
                    : null
                }

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
                     aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel"> Пубичные репозитории</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {searchState.repositories.length ?
                            <Collapse accordion>
                                {searchState.repositories.map(item => {

                                return <Panel header={item.name} key={item.id}>
                                    <p className="res">Назвние репозитории: <b> {item.name}</b> </p>
                                    <p className="res">Ссылка: <a className="res" href={item.html_url}> {item.html_url}</a > </p>
                                        </Panel>
                            })}
                            </Collapse>
                        : <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        );

    }

    return  <h2>Загрузка...</h2>
};

export default Search;