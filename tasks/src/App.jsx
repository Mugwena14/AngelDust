import React, { useState } from "react";
import {
  LogOut,
  Settings,
  LayoutDashboard,
  CheckSquare,
  Search,
  ChevronDown,
  User,
} from "lucide-react";

export default function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [view, setView] = useState("list"); // "list" or "board"

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between p-4 transition-all">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">TaskPro</h1>
          <nav className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: CheckSquare, label: "Tasks" },
              { icon: Search, label: "Search" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2 border-t pt-4">
          <button className="w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 transition-all">
            <Settings size={16} /> Settings
          </button>
          <button className="w-full text-left py-2 px-3 rounded-lg flex items-center gap-2 text-gray-700 font-medium hover:bg-gray-100 transition-all">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* White Header Section */}
        <div className="bg-white rounded-2xl shadow-sm px-6 py-4 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Langavi 👋</h2>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Langavi</p>
                <p className="text-xs text-gray-500">langavi@email.com</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 animate-fadeIn">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                  <User size={14} /> View Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                  <Settings size={14} /> Account Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* My Tasks Container */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {/* Top Bar (My Tasks & View Toggle) */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">My Tasks</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  view === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setView("board")}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  view === "board"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                Board
              </button>
            </div>
          </div>

          {/* Conditional Rendering */}
          {view === "list" ? (
            <div className="space-y-6">
              {/* To Do */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">To Do</h3>
                <div className="bg-gray-50 shadow-sm rounded-lg p-4">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <p>Website Development</p>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      High
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Update Contact Form</p>
                    <span className="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                      Mild
                    </span>
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">In Progress</h3>
                <div className="bg-gray-50 shadow-sm rounded-lg p-4">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <p>Do back exercises</p>
                    <span className="text-sm bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                      Mild
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Integrate Payment Gateway</p>
                    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                      Low
                    </span>
                  </div>
                </div>
              </div>

              {/* Done */}
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Done</h3>
                <div className="bg-gray-50 shadow-sm rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p>Visit a dermatologist</p>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      High
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Board View
            <div className="grid grid-cols-3 gap-4">
              {["To Do", "In Progress", "Done"].map((column) => (
                <div key={column} className="bg-gray-50 rounded-lg shadow-sm p-4">
                  <h4 className="font-semibold mb-3 text-gray-700">{column}</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-white hover:shadow-md transition-all">
                      <p className="font-medium text-gray-800">
                        {column === "Done"
                          ? "Visit a dermatologist"
                          : column === "In Progress"
                          ? "Integrate Payment Gateway"
                          : "Website Development"}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                        <span>Nov 17</span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            column === "Done"
                              ? "bg-red-100 text-red-600"
                              : column === "In Progress"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {column === "Done"
                            ? "High"
                            : column === "In Progress"
                            ? "Mild"
                            : "Low"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
