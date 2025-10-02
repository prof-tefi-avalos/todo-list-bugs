import { useState, useEffect, useMemo, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  background: ${({ theme }) => theme?.bodyBg || "#fff"};
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState("list");
  const [darkMode, setDarkMode] = useState(false); // estado de modo oscuro

  const todosMemo = useMemo(() => todos, [todos]); // memorizo todos

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = useCallback((task) => {
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    })
      .then(res => res.json())
      .then(newTodo => setTodos(prev => [...prev, newTodo]));
  }, []);

  const toggleTodo = useCallback((id) => {
    // Esto cambia el estado de un todo: hago un PUT al backend para "marcarlo hecho/no hecho" 
    // (ver como está aplicado al back, perosolo solucionarlo acá)
    // y después actualizo la lista local reemplazando solo el todo que cambió.
    fetch(`http://localhost:4000/todos/${id}`, { method: "PUT" })
      .then(res => res.json())
      //acá el updated es el objeto actualizado dspues del put
      .then(taskUpdated => setTodos(estadoPrevio => taskUpdated.map(task => estadoPrevio.id === id ? updated : task)));
  }, []);

  const deleteTodo = useCallback((id) => {
    fetch(`http://localhost:4000/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)));
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container>
        <h1>Todo List</h1>
        <button onClick={() => setPage(page === "list" ? "form" : "list")}>
          {page === "list" ? "Agregar Todo" : "Volver a la lista"}
        </button>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginLeft: "10px" }}>
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>

        {page === "list" && (
          <TodoList todos={todosMemo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        )}

        {page === "form" && <TodoForm addTodo={addTodo} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;

