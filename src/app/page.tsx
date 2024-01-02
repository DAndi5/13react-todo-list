import 'bootstrap/dist/css/bootstrap.css';
import TodoListContextProvider from "./contexts/TodoLisContext";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
      <div className="App">
        <TodoListContextProvider>
          <TodoList />
        </TodoListContextProvider>
      </div>
  )
}
