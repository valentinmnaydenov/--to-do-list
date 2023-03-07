import "./todo-item.css";

export function TodoItem({ title, checkItem, removeItem }) {
  return (
    <div className="todo__item">
      <input type="checkbox" onChange={checkItem} />
      {title}
      <button onClick={removeItem}>X</button>
    </div>
  );
}
