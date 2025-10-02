import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
`;

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (task.trim() === "") return;
    addTodo(task);
    setTask("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input value={task} onChange={e => setTask(e.target.value)} placeholder="Nueva tarea..." />
      <button type="submit">Agregar</button>
    </Form>
  );
}

export default TodoForm;
