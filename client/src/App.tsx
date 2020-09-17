import React, { FormEvent, useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from './API';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      const {
        data: { todos },
      }: ITodo[] | any = await getTodos();

      setTodos(todos);
    } catch (error) {
      throw new Error('Error! could not fetch todos');
    }
  };

  const handleSaveTodo = async (
    e: FormEvent,
    formData: ITodo,
  ): Promise<void> => {
    e.preventDefault();
    try {
      const { status, data } = await addTodo(formData);

      if (status !== 201) {
        throw new Error('Error! Todo was not saved');
      }

      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (todo: ITodo): Promise<void> => {
    try {
      const { status, data } = await updateTodo(todo);

      if (status !== 200) {
        throw new Error('Error! Todo not updated');
      }

      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (_id: string): Promise<void> => {
    try {
      const { status, data } = await deleteTodo(_id);
      if (status !== 200) {
        throw new Error('Error! Todo not deleted');
      }
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};
export default App;
