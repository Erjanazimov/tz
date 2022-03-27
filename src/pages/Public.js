import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPublic, fetchPublicNext} from "../store/userSlice";
import {Collapse} from "antd";

const { Panel } = Collapse;
let num = 1;
const Public = () => {
    const userState = useSelector(state => state.users.users);
    const publicState = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem("supabase.auth.token");
        const parse = JSON.parse(data);

        if (userState) {

            dispatch(fetchPublic({name: userState.user_metadata.user_name, token: parse.currentSession.access_token}))
        }
    }, [userState])

    const nextPublic = () => {
        num++;
        dispatch(fetchPublicNext({name: userState.user_metadata.user_name, count: num}))
    }

    return (
        <div className="wid">
            <h2>Публичные репозитории</h2>
            <Collapse accordion>

                {publicState.public.length ?
                    publicState.public.map(item => {
                        return  <Panel header={item.full_name} key={item.id}>
                            <p>Название: <b>{item.full_name} </b></p>
                            <p>Ссылка: <a href={item.html_url}>{item.html_url}</a> </p>
                        </Panel>
                    })
                    : <h2>Загрузка...</h2>
                }

            </Collapse>
            {publicState.nextPublic ?
                <div className="mt-3">
                    <button onClick={nextPublic} type="button" className="btn btn-outline-secondary form-control">Загрузить еще</button>
                </div> : null
            }

        </div>
    );
};

export default Public;