import React, {useEffect, useState} from 'react';
import {supabase} from "./client";
import {useDispatch} from "react-redux";
import {addUsers} from "./store/userSlice";
import Router from "./route/Router";
import 'antd/dist/antd.css';


function App() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        checkUser();
        window.addEventListener('hashchange', function() {
            checkUser();
        });
    }, [])
    async function checkUser() {
        const user = supabase.auth.user();
        setUser(user);
    }
    async function signInWithGithub() {
        await supabase.auth.signIn({
            provider: 'github'
        });
    }

    useEffect(() => {
        if (user){
            dispatch(addUsers({user}))
        }
    })

    if (user) {
        return <Router/>
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
            <h1>Вход в аккаунт через GitHub</h1>
            </div>
                <div className="pt-3">
            <button className="btn form-control btn-outline-success" onClick={signInWithGithub}>Sign In</button>
                </div>
        </div>
    );
}


export default App;