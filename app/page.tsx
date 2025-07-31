'use client'; // This directive marks the component as a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

// Define the type for a single Note object
interface Note {
  id: string; // Unique identifier for each note
  title: string;
  content: string;
}

export default function Home() {
  // useState hook to manage the list of notes
  // The initial state is an empty array of Note objects
  const [notes, setNotes] = useState<Note[]>([]);

  // useState hooks to manage the input fields for a new note
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteContent, setNewNoteContent] = useState<string>('');

  /**
   * Handles adding a new note to the list.
   * Generates a unique ID, creates a new Note object, and updates the notes state.
   */
  const addNote = () => {
    // Basic validation: ensure title or content is not empty
    if (newNoteTitle.trim() === '' && newNoteContent.trim() === '') {
      alert('Please enter a title or content for your note.');
      return;
    }

    // Create a unique ID for the new note (simple timestamp + random number)
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Create the new note object
    const newNote: Note = {
      id,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
    };

    // Update the notes array by adding the new note
    // We use the spread operator (...) to create a new array, ensuring immutability
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Clear the input fields after adding the note
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  /**
   * Handles deleting a note from the list based on its ID.
   * Filters out the note with the matching ID and updates the notes state.
   * @param id The ID of the note to be deleted.
   */
  const deleteNote = (id: string) => {
    // Filter out the note that matches the given ID
    // This creates a new array without the deleted note
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    // Main container for the app, centered with responsive padding
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6 sm:p-8 space-y-8">
        {/* Navigation to Tasks Page */}
        <div className="flex justify-end mb-4">
          <Link href="/tasks" passHref>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
              Go to Tasks
            </button>
          </Link>
        </div>

        {/* Image at the top of the Notes page */}
        <img
          src="/notebook.jpg" // Path to the image in the public folder
          alt="Notebook illustration"
          className="w-32 h-32 mx-auto mb-8 rounded-full object-cover shadow-lg" // Tailwind classes for styling
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/128x128/cccccc/000000?text=Image+Error'; // Fallback image
            e.currentTarget.alt = 'Image failed to load';
          }}
        />

        {/* Application Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">
          My Simple Notes
        </h1>

        {/* New Note Input Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Add New Note</h2>
          {/* Note Title Input */}
          <input
            type="text"
            placeholder="Note Title (optional)"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)} // Update state on input change
            // Added text-gray-800 for better contrast
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 placeholder-gray-500"
          />
          {/* Note Content Textarea */}
          <textarea
            placeholder="Write your note here..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)} // Update state on textarea change
            rows={5}
            // Added text-gray-800 for better contrast
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-y text-gray-800 placeholder-gray-500"
          ></textarea>
          {/* Add Note Button */}
          <button
            onClick={addNote} // Call addNote function on click
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Add Note
          </button>
        </div>

        {/* Notes List Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Notes</h2>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notes yet. Start adding some!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Map over the notes array to display each note */}
              {notes.map((note) => (
                <div
                  key={note.id} // Unique key for list rendering optimization
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col justify-between transition duration-300 ease-in-out hover:shadow-lg"
                >
                  <div>
                    {/* Note Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {note.title || 'Untitled Note'} {/* Display "Untitled Note" if title is empty */}
                    </h3>
                    {/* Note Content */}
                    <p className="text-gray-700 text-base break-words whitespace-pre-wrap">
                      {note.content || 'No content.'} {/* Display "No content" if content is empty */}
                    </p>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNote(note.id)} // Pass note ID to delete function
                    className="mt-4 self-end bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
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
