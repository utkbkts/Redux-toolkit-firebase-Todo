import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/Todoslice";
const Todoform = () => {
  const [todo, settodo] = useState("");

  const dispatch = useDispatch();
  const onsubmit = (e) => {
    e.preventDefault();

    if(todo!==""){
        dispatch(createTodo({todo}))
        settodo("")
    }
  };
  return (
    <div>
      <form className="form-group-control" action="#" onSubmit={onsubmit}>
        <div className="form-group">
          <label htmlFor="text">Yapılacak</label>
          <input
            type="text"
            name="text"
            value={todo}
            onChange={(e) => settodo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn" type="submit">
            Yapılacak Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todoform;
