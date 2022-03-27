import React from 'react';
import Header from "../components/menu/Menu";
import {useSelector} from "react-redux";
import ModalEdit from "../components/modal/ModalEdit";

const Control = () => {
    const controlState = useSelector(state => state.users.users);

    if (controlState){
    return (
        <div>
            <Header/>
            <ModalEdit/>
        </div>
    );
};


    return <h1>Загрузка</h1>
}

export default Control;