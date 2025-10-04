import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const NewTodoCreate = ({ onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const { backend_url } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backend_url}/api/todo/`,
        { title, description, priority, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
        if (onTodoCreated) onTodoCreated(res.data.todo);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating todo.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 outline-none py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="w-full  px-4 py-2 border outline-none rounded-md focus:ring-2 focus:ring-purple-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="date"
          className="w-full cursor-pointer outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
};

export default NewTodoCreate
