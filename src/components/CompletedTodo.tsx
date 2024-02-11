import { Todo } from "../types/todo";
import "./CompletedTodo.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";

const CompletedTodo = ({
  item,
  index,
  completedListToggle,
  deleteTodo,
}: {
  item: Todo;
  index: number;
  completedListToggle: (id: number) => void;
  deleteTodo: (id: number) => void;
}) => {
  const handleCompletedListToggle = () => {
    completedListToggle(item.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(item.id);
  };

  return (
    <>
      <div className="todo-item" key={index}>
        <label htmlFor="todo" className="todo-label">
          {item.title}
        </label>
        <div onClick={handleCompletedListToggle} className="todo-icon">
          <BsArrowCounterclockwise />
        </div>
        <div onClick={handleDeleteTodo} className="todo-icon">
          <FaRegTrashAlt style={{ color: "red" }} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default CompletedTodo;
