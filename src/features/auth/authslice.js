import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import authservice from "./authservice"
import {toast} from "react-toastify"
const user=JSON.parse(localStorage.getItem("user")) //localstorage erişiyoruz
const initialState = {
    user:user?user:null,
    isError:false, // hata durumu
    isSuccess:false, //başarılı işlem
    isLoading:false, // bekleme
    message:""
}

export const authSlice = createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.isError=false
            state.isSuccess=false
            state.message=""
        }
    },
    extraReducers:(builder)=>{ // yüklenme esnasında yapılacak işler
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
        }) 
        .addCase(register.fulfilled,(state,action)=>{ //kayıt başarılı olunca yapılacak işler
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{ // kayıt başarısız olunca yapılacak işler
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
            state.user=null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isError=true
            state.isLoading=false
            state.message=action.payload
            state.user=null
        })
    }
})
                                                                //user bilgileri barındırır
export const register = createAsyncThunk("auth/register",async(user,thunkAPI)=>{
    try {
        return await authservice.register(user.email,user.parola,user.kullaniciad)
    } catch (error) {
        const  message=error.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout=createAsyncThunk("auth/logut",async()=>{
    await authservice.LogOut()
})
export const login=createAsyncThunk("auth/login",async(user,thunkAPI)=>{
try {
    return await authservice.Login(user.email,user.parola)
} catch (error) {
    const message="email veya parola girilmedi"
    return thunkAPI.rejectWithValue(message)
}
})


export const {reset}=authSlice.actions
export default authSlice.reducer;