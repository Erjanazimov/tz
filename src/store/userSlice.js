import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

export const fetchUserInformation = createAsyncThunk(
    "users/fetchUserInformation",
    async function(user, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://api.github.com/users/${user.name}`);
            if (!response.ok){
                throw new Error("Что то пошло не так")
            }
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(addPersonal({data}))
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)
let num = 20;

export const fetchPublic = createAsyncThunk(
    "users/fetchPublic",
    async function(user, {rejectWithValue, dispatch}){
        try {
            let options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `token ${user.token}`
                }
            }
            const response = await fetch(`https://api.github.com/users/${user.name}/repos?page=1`)
            const data = await response.json();
            dispatch(addPublic({data}))


            if (data.length >= 29){
                dispatch(nextPublicBtn())
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchPublicNext = createAsyncThunk(
    "users/fetchPublicNext",
    async function(user, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://api.github.com/users/${user.name}/repos?page=${user.count}`)
            const data = await response.json();
            dispatch(publicPush({data}))
            if (!data.length){
               dispatch(nextPublicNot())
            } else{
                dispatch(nextPublicBtn())
            }
        } catch (error){
            return rejectWithValue(error.message)
        }
    }
)

export const fetchSearch = createAsyncThunk(
    "users/fetchSearch",
    async function(search, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${search.text}&per_page=${num}&page=1`)
            if (!response.ok){
                dispatch(endNext())
            }
            const data = await response.json();

            if (!data.total_count){
                 toast.error("Нечего не найдено")
            }
            if (response.ok) {
                dispatch(searchAdd({data}))
                dispatch(nextGet())
            }


        } catch (error){

            return rejectWithValue(error.message)
        }
    }
)

export const fetchNext = createAsyncThunk(
    "users/fetchNext",
    async function(search, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${search.text}&per_page=${num}&page=${search.count}`)
            if (!response.ok){
                toast.error("Конец списка по рейтингов")
                dispatch(endNext())
            }
            const data = await response.json();
           if (response.ok) {
               dispatch(addNext({data}))
               dispatch(nextGet())
           }

        } catch (error){

            return rejectWithValue(error.message)
        }
    }
)

const UserSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
        informationUser: null,
        textSearch: "",
        searchMas: [],
        next: false,
        total: 0,
        repositories: [],
        public: [],
        nextPublic: false
    },
    reducers: {
        addUsers(state, action){
            state.users = action.payload.user
        },
        addPersonal(state, action){
            state.informationUser = action.payload.data
        },
        nullAccounts(state){
            state.users = null;
            state.informationUser = null
        },
        searchHandler(state, action){
            state.textSearch = action.payload.text
        },
        searchAdd(state, action){
            state.searchMas = action.payload.data.items;
            state.total = action.payload.data.total_count;
        },
        nextGet(state){
            state.next = true;
        },
        endNext(state){
            state.next = false
        },
        addNext(state, action){
            state.searchMas.push(...action.payload.data.items)
        },
        repositoriesAdd(state, action){
            state.repositories = action.payload.reposJson;
        },
        editUser(state, action){
            state.informationUser = action.payload.data
        },
        addPublic(state, action){
            state.public = action.payload.data
        },
        publicPush(state, action){
            state.public.push(...action.payload.data)
        },
        nextPublicBtn(state){
            state.nextPublic = true
        },
        nextPublicNot(state){
            state.nextPublic = false
        }
    }
})

export const {addUsers, addPersonal, nullAccounts, searchHandler,
    searchAdd, nextGet, endNext, addNext, repositoriesAdd, editUser, addPublic, publicPush, nextPublicBtn, nextPublicNot} = UserSlice.actions

export default UserSlice.reducer;