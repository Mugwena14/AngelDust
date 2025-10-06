import React, { useState } from "react";
import { Search, LogOut, Settings, LayoutDashboard, CheckSquare, User } from "lucide-react";

export default function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between p-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">TaskPro</h1>
          <nav className="space-y-4">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 hover:scale-[1.02] transition-all duration-200 font-medium text-gray-700 flex items-center gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 hover:scale-[1.02] transition-all duration-200 font-medium text-gray-700 flex items-center gap-2">
              <CheckSquare size={18} /> Tasks
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 hover:scale-[1.02] transition-all duration-200 font-medium text-gray-700 flex items-center gap-2">
              <Search size={18} /> Search
            </button>
          </nav>
        </div>

        <div className="space-y-2 border-t pt-4">
          <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 font-medium text-gray-700 flex items-center gap-2">
            <Settings size={18} /> Settings
          </button>
          <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100 hover:scale-[1.02] transition-all duration-200 font-medium text-gray-700 flex items-center gap-2">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl font-semibold">Welcome, Langavi 👋</h2>

          {/* Profile section */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Langavi</p>
                <p className="text-xs text-gray-500">langavi@gmail.com</p>
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-10">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <User size={16} /> View Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Settings size={16} /> Account Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>
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