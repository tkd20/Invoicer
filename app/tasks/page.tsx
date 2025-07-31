'use client'; // This directive marks the component as a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

// Define the type for a single Task object
interface Task {
  id: string; // Unique identifier for each task
  text: string;
  completed: boolean; // Status of task completion
}

export default function TasksPage() {
  // useState hook to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // useState hook to manage the input field for a new task
  const [newTaskText, setNewTaskText] = useState<string>('');

  /**
   * Handles adding a new task to the list.
   * Generates a unique ID, creates a new Task object, and updates the tasks state.
   */
  const addTask = () => {
    if (newTaskText.trim() === '') {
      alert('Please enter a task description.');
      return;
    }

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newTask: Task = {
      id,
      text: newTaskText.trim(),
      completed: false, // New tasks are not completed by default
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText(''); // Clear the input field
  };

  /**
   * Toggles the completion status of a task.
   * @param id The ID of the task to toggle.
   */
  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Deletes a task from the list.
   * @param id The ID of the task to delete.
   */
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    // Main container for the tasks app, centered with responsive padding
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-8 space-y-8">
        {/* Navigation to Home Page */}
        <div className="flex justify-end mb-4">
          <Link href="/" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Go to Notes
            </button>
          </Link>
        </div>

        {/* Image at the top of the Tasks page */}
        <img
          src="/task_done.jpg" // Path to the image in the public folder
          alt="Task completion illustration"
          className="w-32 h-32 mx-auto mb-8 rounded-full object-cover shadow-lg" // Tailwind classes for styling
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/128x128/cccccc/000000?text=Image+Error'; // Fallback image
            e.currentTarget.alt = 'Image failed to load';
          }}
        />

        {/* Application Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          My Task List
        </h1>

        {/* New Task Input Section */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">Add New Task</h2>
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
          />
          <button
            onClick={addTask}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Add Task
          </button>
        </div>

        {/* Tasks List Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks yet. Start adding some!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 transition duration-300 ease-in-out ${
                    task.completed ? 'bg-green-100 border-green-300' : ''
                  }`}
                >
                  <div className="flex items-center flex-grow">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                    />
                    <span
                      className={`ml-3 text-lg ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md shadow-sm transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
