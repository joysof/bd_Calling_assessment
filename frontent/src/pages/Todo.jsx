import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NewTodoCreate from "./NewTodoCreate";
import { toast } from "react-toastify";
import {FaCheckCircle} from 'react-icons/fa'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const {backend_url} = useContext(AuthContext)
  const [editingTodo, setEditingTodo] = useState(null);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get( backend_url +"/api/todo/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        setTodos(res.data.todos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, [token]);
  const handleNewTodo = (todo) => {
    setTodos([todo, ...todos]);
  };


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backend_url}/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTodos(todos.filter((todo) => todo._id !== id)); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    
  }
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };
   const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${backend_url}/api/todo/${editingTodo._id}`,
        {
          title: editingTodo.title,
          description: editingTodo.description,
          priority: editingTodo.priority,
          dueDate: editingTodo.dueDate,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Todo updated successfully!");
        setTodos(todos.map((t) => (t._id === editingTodo._id ? res.data.todo : t)));
        setEditingTodo(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleComplete = async (todo) => {
    try {
      const res = await axios.put(
        `${backend_url}/api/todo/${todo._id}`,
        { isCompleted: !todo.isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Todo status updated!");
        setTodos(
          todos.map((t) => (t._id === todo._id ? res.data.todo : t))
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <NewTodoCreate onTodoCreated={handleNewTodo}/>
      <h1 className="text-3xl font-bold mb-4">My Todos</h1>
      <ul className="space-y-2">
        {Array.isArray(todos) && todos.map((todo) => (
          <div key={todo._id} className="p-3 flex justify-between bg-gray-100 rounded shadow">
            <div>
              <h2 className={`flex gap-2 items-center font-semibold capitalize`}>
              <span onClick={()=>handleComplete(todo)}> {todo.isCompleted ? <FaCheckCircle  className="text-green-500" /> : <RiCheckboxBlankCircleLine /> } </span>
              {todo.title}</h2>
            <p>{todo.description}</p>
            <p>Priority : {todo.priority}</p>
            <p className="text-sm text-gray-400">
            Created: {new Date(todo.createdAt).toLocaleString()}
            </p>
             <p className="text-sm text-gray-500">
      Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "-"}
    </p>
            </div>

            <div className="flex flex-col gap-2">
           
                 <button
          onClick={() => handleEdit(todo)}
          className="bg-blue-500 cursor-pointer h-10 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Edit
              </button>
              <button
              onClick={() => handleDelete(todo._id)}
              className="bg-red-500 h-10 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
    
            
            </div>

            {/* show when user click edit todo btn   */}

        {editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingTodo.title}
                onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                value={editingTodo.description}
                onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
              <select
                value={editingTodo.priority}
                onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
             <input
             type="date"
            value={editingTodo.dueDate ? editingTodo.dueDate.split("T")[0] : ""}
            onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingTodo(null)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
          </div>
          
        ))}
      </ul>
    </div>
  );
};

export default Todo;
