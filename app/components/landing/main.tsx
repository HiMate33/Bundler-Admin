import Dashboard from "./dashboard";
import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";

export default function Main() {
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar Navigation */}
      <div className="w-90 bg-gradient-to-b from-gray-900 to-black text-white shadow-lg flex flex-col">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100">
      <div className="h-16 bg-white shadow flex items-center justify-between px-6">
        <Header />
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <Dashboard />
      </div>
      <div className="h-16 bg-white shadow flex items-center justify-center">
        <Footer />
      </div>
      </div>
    </div>
  );
}
