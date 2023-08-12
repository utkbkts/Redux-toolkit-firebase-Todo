import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Todoservice from "./Todoservice"
import todoService from "./Todoservice";
const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const TodoSlice = createSlice({
  name: "todos",
  initialState, 
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers:(builder)=>{
    builder
    .addCase(createTodo.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(createTodo.fulfilled,(state,action)=>{
    state.isSuccess=true  
    state.isLoading=false
    state.isError=false
    state.todos.unshift(action.payload)
    })
    .addCase(createTodo.rejected,(state,action)=>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message=action.payload
    })
    .addCase(getTodo.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getTodo.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.todos=action.payload
      state.isError=false
    })
    .addCase(getTodo.rejected,(state,action)=>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message=action.payload
      state.todos=[]
    })
    .addCase(deleteTodo.pending,(state)=>{
      state.isLoading=true
      state.isSuccess=true  
      state.isLoading=false
      state.isError=false
    })
    .addCase(deleteTodo.fulfilled,(state,action)=>{
          state.isLoading=false
          state.isError=false
          state.isSuccess=true
          state.todos=state.todos.filter((todo)=>todo.id!==action.payload)

    })
  }
});
export const createTodo=createAsyncThunk("todos/create",async(todoData,thunkAPI)=>{
  try {
    const user = thunkAPI.getState().auth.user
    return await Todoservice.createTodo(todoData,user)
  } catch (error) {
    const message = error.message
    return thunkAPI.rejectWithValue(message)
  }
})
  export const getTodo = createAsyncThunk("todos/getAll",async(_,thunkAPI)=>{
try {
  const user = thunkAPI.getState().auth.user
  return await todoService.gettodo(user)
} catch (error) {
  const message = error.message
  return thunkAPI.rejectWithValue(message)
}
  })
  export const deleteTodo=createAsyncThunk("todos/delete",async(id,thunkAPI)=>{
    try {
      return await todoService.deleteTodo(id)
    } catch (error) {
      const message = error.message
      return thunkAPI.rejectWithValue(message)
    }
  })
export const { reset } = TodoSlice.actions;
export default TodoSlice.reducer;
