import "./App.css";
import {useState} from "react";
import {FormCreator} from "./components/todo-creator";
import {TodoItem} from "./components/todo-item/todo-item";
import json from "./todos.json";

function App() {
    let [todos, setTodos] = useState(json);
    let [completedTodos, setCompletedTodos] = useState([]);

    const addTodo = (title) => {
        setTodos([
            ...todos, {
                title,
                isDone: false
            },
        ]);
    };

    const removeTodo = (index, isCompleted) => {
        return() => {
            if (isCompleted) {
                const ctds = [...completedTodos];
                ctds.splice(index, 1);
                setCompletedTodos(ctds);
            } else {
                const tds = todos.filter((todo, idx) => index !== idx);
                setTodos(tds);
            }
        };
    };

    const updateTitle = (index, newTitle, isCompleted) => {
        const newTodos = isCompleted ? [...completedTodos] : [...todos];
        newTodos[index] = {
            ... newTodos[index],
            title: newTitle
        };
        if (isCompleted) {
            setCompletedTodos(newTodos);
        } else {
            setTodos(newTodos);
        }
    };


    const toggleComplete = (index) => {
        const newTodos = [...todos];
        const completedTodo = newTodos[index];
        completedTodo.isDone = ! completedTodo.isDone;
        setTodos(newTodos.filter((todo, idx) => idx !== index));
        setCompletedTodos([
            ...completedTodos,
            completedTodo
        ]);
    };

    const incompleteTodos = todos.filter((todo) => !todo.isDone);
    const completedTodoItems = completedTodos.map((todo, index) => {
        return (
            <TodoItem key={index}
                itemIndex={index}
                removeItem={
                    removeTodo(index, true)
                }
                title={
                    todo.title
                }
                isDone={true}
                checkItem={
                    () => {}
                }
                updateTitle={
                    (newTitle) => updateTitle(index, newTitle, true)
                }/>
        );
    });

    return (
        <div className="App">
            <h1>Todo app</h1>
            <hr/>

            <FormCreator createTodo={addTodo}/>

            <h2>Incomplete Todos:</h2>
            {
            incompleteTodos.map((todo, index) => {
                return (
                    <TodoItem key={index}
                        itemIndex={index}
                        removeItem={
                            removeTodo(index, false)
                        }
                        title={
                            todo.title
                        }
                        isDone={
                            todo.isDone
                        }
                        checkItem={
                            () => toggleComplete(index)
                        }
                        updateTitle={
                            (newTitle) => updateTitle(index, newTitle, false)
                        }/>
                );
            })
        }

            <h2>Completed Todos:</h2>
            {completedTodoItems} </div>
    );
}

export default App;
