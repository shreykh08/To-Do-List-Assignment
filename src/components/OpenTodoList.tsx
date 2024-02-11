import { Todo } from "../types/todo";
import { TodoList } from "../types/todoList";
import "./OpenTodoList.css";
import OpenTodo from "./OpenTodo";

export default function OpenTodoList({
  data,
  openListToggle,
  deleteTodo,
}: {
  data: TodoList;
  openListToggle: (id: number) => void;
  deleteTodo: (id: number) => void;
}) {
  return (
    <div id="open-todo-list">
      {data.length > 0 ? (
        data.map((item: Todo, index: number) => {
          return (
            <OpenTodo
              key={index}
              item={item}
              index={index}
              openListToggle={openListToggle}
              deleteTodo={deleteTodo}
            />
          );
        })
      ) : (
        <div
          style={{
            color: "black",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          No Pending To-Do
        </div>
      )}
    </div>
  );
}
