import { Todo } from "../types/todo";
import { TodoList } from "../types/todoList";
import "./CompletedTodoList.css";
import CompletedTodo from "./CompletedTodo";

export default function CompletedTodoList({
  data,
  completedListToggle,
  deleteTodo,
}: {
  data: TodoList;
  completedListToggle: (id: number) => void;
  deleteTodo: (id: number) => void;
}) {
  return (
    <div id="completed-todo-list">
      {data.length > 0 ? (
        data
          .filter((item) => item.completed)
          .map((item: Todo, index: number) => {
            return (
              <CompletedTodo
                key={index}
                item={item}
                index={index}
                completedListToggle={completedListToggle}
                deleteTodo={deleteTodo}
              />
            );
          })
      ) : (
        <div
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          No Completed To-Do
        </div>
      )}
    </div>
  );
}
