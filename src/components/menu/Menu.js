import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {supabase} from "../../client";
import {useDispatch} from "react-redux";
import {nullAccounts} from "../../store/userSlice";
const { SubMenu } = Menu;

const Header = () => {
    const {push} = useHistory();
    const dispatch  = useDispatch()
    function handleClick(e) {
        if (Number(e.key) === 1){
            push('/')
        } else if(Number(e.key) === 2){
            async function signOut() {
                await supabase.auth.signOut();
                dispatch(nullAccounts())
            }
            signOut()
            push("/")
            window.location.reload()
        } else if(Number(e.key) === 5){
            push("/public")
        } else if(Number(e.key) === 9){
            push("/search")
        }else if(Number(e.key) === 6){
            push("/private")
        }
    }



    return (
        <div className="mt-1">
        <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
            <SubMenu key="sub1" icon={<MailOutlined />} title="Личный кобинет">
                    <Menu.Item key="1">Личная информация</Menu.Item>
                    <Menu.Item key="2">Выйти</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Репозитории">
                <Menu.Item key="5">Публичный репозитории</Menu.Item>
                <Menu.Item key="6">Приватные репозитории</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Другие пользователи">
                <Menu.Item key="9">Поиск</Menu.Item>
            </SubMenu>
        </Menu>

        </div>
    );
};

export default Header;