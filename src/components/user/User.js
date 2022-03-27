import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPersonal, fetchUserInformation} from "../../store/userSlice";

function User(){
    const userState = useSelector(state => state.users.users);
    const personalState = useSelector(state => state.users);
    const dispatch = useDispatch();
    const data = localStorage.getItem("user");
    const parse = JSON.parse(data);
    useEffect(() => {
        if (parse) {
            dispatch(addPersonal({data: parse}))
        } else if (userState && !parse){
            dispatch(fetchUserInformation({name: userState.user_metadata.user_name}));
        }
    }, [userState])



    if (personalState.informationUser) {
        return (
            <div className="mt-2">
                <div className="d-flex">
                <div>
                    <img src={personalState.informationUser.avatar_url} className="avatar_img"/>
                </div>
                <div className="d-flex align-items-end">
                    <ul>
                        <li><span>Имя:</span> <b>{personalState.informationUser.name ? personalState.informationUser.name : "Имя не указано"}</b></li>
                        <li><span>Логин:</span> <b>{personalState.informationUser.login ? personalState.informationUser.login : "Логин не указано"}</b></li>
                        <li><span>E-mail:</span> <b>{personalState.informationUser.email ? personalState.informationUser.email : "E-mail не указано"}</b></li>
                        <li><span>Компания:</span> <b>{personalState.informationUser.company ? personalState.informationUser.company : "Компания не указано"}</b></li>
                        <li><span>Местоположение:</span> <b>{personalState.informationUser.location ? personalState.informationUser.location : "Местоположение не указано"}</b></li>
                        <li><span>Описание профиля:</span> <b>{personalState.informationUser.bio ? personalState.informationUser.bio : "Описание не указано"}</b></li>
                        <li><span>Ссылка на профиль:</span> <b>{personalState.informationUser.html_url ? <a href={personalState.informationUser.html_url}> {personalState.informationUser.html_url} </a> : "Ссылка не указано"}</b></li>
                    </ul>
                </div>
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-outline-success
                    form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">Изменить</button>
                </div>
            </div>
        );
    }

    return (
        <h1 className="text-center mt-5">
            Загрузка...
        </h1>
    )
};

export default User;