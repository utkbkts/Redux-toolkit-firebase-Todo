import {auth} from "../../firebase/config"
import {createUserWithEmailAndPassword,updateProfile,signOut,signInWithEmailAndPassword} from "firebase/auth"

const register = async(email,parola,kullaniciad)=>{

    const userResponse = await createUserWithEmailAndPassword(auth,email,parola);

    await updateProfile(userResponse.user,{
        displayName:kullaniciad //kullancının tanımladığı ad
    })
    //localstorage kaydetme işlemi
    if(userResponse.user){
        localStorage.setItem("user",JSON.stringify(userResponse.user))
    }
    return userResponse.user
}
const LogOut=async()=>{
    await signOut(auth)
    localStorage.removeItem("user")
}
const Login=async(email,parola)=>{
    const userResponse=  await signInWithEmailAndPassword(auth,email,parola)
    if(userResponse.user){
      localStorage.setItem("user",JSON.stringify(userResponse.user))
    }
    return userResponse.user
  }
const authservice = {
    register,
    LogOut,
    Login

}

export default authservice