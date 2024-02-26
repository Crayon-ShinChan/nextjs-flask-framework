"use client";

import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const todos = useStore((state) => state.todos);
  const fetchTodos = useStore((state) => state.fetchTodos);

  const [message, setMessage] = useState("");
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("/api/hello")
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => {
        setMessage(data.message); // Set the message in state
      })
      .catch((error) => {
        console.error("Failed to fetch data from '/api/hello':", error);
        setMessage("Failed to fetch message");
      });
  }, []); // The empty array ensures this effect runs once on mount

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto max-w-md p-4">
      <TodoForm />
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {todos.length === 0 ? (
        <p className="text-center">No Todos Found</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
      <p>Message from API: {message}</p>
    </div>
  );
};

export default Home;
