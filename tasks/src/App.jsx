import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Welcome, Langavi 👋</h2>
      <input
      type="text"
      placeholder="Search tasks..."
      className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-200"
      />
      </div>


      {/* Task List */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">To Do</h3>
          <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
          <p>Website Development</p>
          <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">High</span>
          </div>
          <div className="flex justify-between items-center">
          <p>Update Contact Form</p>
          <span className="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Mild</span>
          </div>
        </div>
      </div>


    <div>
    <h3 className="text-lg font-semibold mb-2">In Progress</h3>
    <div className="bg-white shadow rounded-lg p-4">
    <div className="flex justify-between items-center border-b pb-2 mb-2">
    <p>Do back exercises</p>
    <span className="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Mild</span>
    </div>
    <div className="flex justify-between items-center">
    <p>Integrate Payment Gateway</p>
    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">Low</span>
    </div>
    </div>
    </div>


    <div>
    <h3 className="text-lg font-semibold mb-2">Done</h3>
    <div className="bg-white shadow rounded-lg p-4">
    <div className="flex justify-between items-center">
    <p>Visit a dermatologist</p>
    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">High</span>
    </div>
    </div>
    </div>
    </section>
    </main>
    </div>
  );
}

export default App
