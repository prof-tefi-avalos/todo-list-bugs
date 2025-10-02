import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const Li = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: ${props => (props.done ? "#d3ffd3" : "#fff")};
  border-bottom: 1px solid #ddd;
`;

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <Ul>
      {todos.map(todo => (
        <li key={todo.id} done={todo.done}>
          <span onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.done ? "line-through" : "none", cursor: "pointer" }}>
            {todo.task}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
        </li>
      ))}
    </Ul>
  );
}

export default TodoList;
