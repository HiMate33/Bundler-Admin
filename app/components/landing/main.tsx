import Dashboard from "./dashboard";
import Navigation from "./navigation";

export default function Main() {
  return (
    <div className="w-screen min-h-screen flex">
      {/* Sidebar Navigation */}
      <div className="w-1/5 bg-gray-800 text-white min-h-screen">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6 bg-white text-black">
        <h1 className="text-2xl font-bold mb-4">Welcome to Home Page</h1>
        <Dashboard />
      </div>
    </div>
  );
}
