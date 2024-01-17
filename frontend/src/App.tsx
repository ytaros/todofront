import { useEffect, useState } from 'react';
import { getTodos } from './api';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  // Todo削除後、削除されたTodoを除いたTodoリストを表示する関数
  const handleTodoDelete = async (todoId: number) => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <TodoForm />
      <TodoList todos={todos} onTodoDelete={handleTodoDelete} />
    </div>
  );
};

export default App;

// Appコンポーネントでは、useStateフックを使用して、todosという変数を定義しています。
// また、useEffectフックを使用して、コンポーネントがマウントされた時にgetTodos関数を呼び出しています。

// getTodos関数は、APIから取得したデータをtodosData変数に格納しています。
// そして、setTodos関数を使用して、todos変数にtodosDataをセットしています。

// このセットされた todos変数は、{todos.map((todo: any) => (<li key={todo.id}>{todo.title}</li>))}の部分で使用され、画面にTodoデータを表示しています。