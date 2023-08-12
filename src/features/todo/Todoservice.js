import {db} from "../../firebase/config"
import {collection,addDoc,getDoc,getDocs,query,where,doc,deleteDoc} from "firebase/firestore"

const createTodo = async(todoData,user)=>{
    const colRef = await collection(db,"yapilacaklar");
    const docRef = await addDoc(colRef,{...todoData,uid:user.uid})

    const docSnap = await getDoc(docRef)

    return{...docSnap.data(),id:docSnap.id}

}
const gettodo = async (user)=>{
    const colRef=await collection(db,"yapilacaklar")

    const q =query(colRef,where("uid","==",user.uid))

    const querysnapShot=await getDocs(q);

    let dizi = [];

    querysnapShot.forEach((doc)=>{
        dizi.push({...doc.data(),id:doc.id})
    })
    return dizi
}
const deleteTodo =async(id)=>{
const docRef = await doc(db,"yapilacaklar",id)
await deleteDoc(docRef)
return id
}
const todoService={
    createTodo,
    gettodo,
    deleteTodo
}
export default todoService