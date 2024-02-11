import { TodoList } from "../types/todoList";
import OpenTodoList from "./OpenTodoList";
import "./TodoListContainer.css";
import { useEffect, useState } from "react";
import ArtBoardSvg from "../assets/artBoard.svg";
import CompletedTodoList from "./CompletedTodoList";
// import * as http from "http";

export default function TodoListContainer() {
  const [todoList, setTodoList] = useState<TodoList>([]);
  const [listType, setListType] = useState<string>("open");
  const [openTodos, setOpenTodos] = useState<TodoList>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoList>([]);
  const [newTodo, setNewTodo] = useState<string>("" as string);

  const getData = () => {
    const requestOptions: RequestInit = {
      method: "GET",
    };

    fetch("http://localhost:3030/todo", requestOptions)
      .then((response) => response.json())
      .then((result) => setTodoList(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();

    return () => {
      changeInDatabase();
    };
  }, []);

  useEffect(() => {
    setOpenTodos(todoList.filter((item) => !item.completed));
    setCompletedTodos(todoList.filter((item) => item.completed));
  }, [todoList]);

  const openListToggle = (id: number) => {
    const updatedList = openTodos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setOpenTodos(updatedList);
  };

  const completedListToggle = (id: number) => {
    const updatedList = completedTodos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    console.log("updatedList", updatedList);
    setCompletedTodos(updatedList);
  };

  const changeInDatabase = () => {
    let changedTodos = [];
    if (listType === "completed") {
      changedTodos = completedTodos.filter((item) => item.completed === false);
    } else {
      changedTodos = openTodos.filter((item) => item.completed === true);
    }
    changedTodos.forEach((item) => {
      fetch(`http://localhost:3030/todo/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: item.completed }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          getData();
        })
        .catch((error) => console.log("error", error));
    });
  };

  const deleteTodo = (id: number) => {
    const requestOptions: RequestInit = {
      method: "DELETE",
    };

    fetch(`http://localhost:3030/todo/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((error) => console.log("error", error));
  };

  const toggleListType = () => {
    changeInDatabase();
    setListType(listType === "open" ? "completed" : "open");
  };

  const onsubmit = () => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo, completed: false }),
    };

    fetch("http://localhost:3030/todo", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getData();
      })
      .catch((error) => console.log("error", error));

    setNewTodo("");
  };

  return (
    <main className="todo-list-container">
      <div className="header">
        To-Do List
        <img src={ArtBoardSvg} alt="svg" className="logo" />
      </div>
      <div className="options">
        <div
          onClick={() => toggleListType()}
          className={`option ${listType === "open" ? "--is-active" : ""}`}
        >
          Open
        </div>
        <div
          onClick={() => toggleListType()}
          className={`option ${listType === "completed" ? "--is-active" : ""}`}
        >
          Completed
        </div>
      </div>
      {listType === "open" && (
        <div className="input-box">
          <input
            type="text"
            className="input"
            placeholder="Add your task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={() => onsubmit()} className="submit-btn">
            +
          </button>
        </div>
      )}
      {listType === "open" && (
        <OpenTodoList
          data={openTodos}
          openListToggle={openListToggle}
          deleteTodo={deleteTodo}
        />
      )}
      {listType === "completed" && (
        <CompletedTodoList
          data={completedTodos}
          completedListToggle={completedListToggle}
          deleteTodo={deleteTodo}
        />
      )}
    </main>
  );
}
