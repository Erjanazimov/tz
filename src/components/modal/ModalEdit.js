import React, {useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {editUser} from "../../store/userSlice";
import {toast} from "react-toastify";

const ModalEdit = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const personalState = useSelector(state => state.users);

    const onFinish = (values) => {
        let obj = values;
        obj.avatar_url = personalState.informationUser.avatar_url
        dispatch(editUser({data: obj}))
        localStorage.setItem("user", JSON.stringify(obj));
        toast.success("Успешно изменилось")

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (personalState.informationUser) {
            form.setFieldsValue({
                bio: personalState.informationUser.bio,
                company: personalState.informationUser.company,
                email: personalState.informationUser.email,
                location: personalState.informationUser.location,
                login: personalState.informationUser.login,
                name: personalState.informationUser.name
            });
        }
    }, [personalState.informationUser])


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Редактировать </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={ onFinish}
                            // preserve={obj}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Имя"  name="name" rules={[{ required: true,
                                        message: 'Заполните свое имя',
                                    },]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Логин" name="login" rules={[{ required: true,
                                message: 'Заполните свое имя',
                            },]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="E-mail" name="email" rules={[{ required: true,
                                message: 'Заполните свое E-mail',
                            },]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Компания" name="company" rules={[{ required: true,
                                message: 'Заполните свое E-mail',
                            },]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Метополжение" name="location" rules={[{ required: true,
                                message: 'Заполните свое Метополжение',
                            },]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Описание" name="bio" rules={[{ required: true,
                                message: 'Заполните свое Описание',
                            },]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary form-control" htmlType="submit">
                                    Изменить
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;