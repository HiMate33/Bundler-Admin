import Dashboard from "./dashboard";
import Footer from "./footer";
import Header from "./header";
import Navigation from "./navigation";



export default function Main() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation (fixed) */}
      <div className="w-65 fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-black text-white shadow-lg hidden md:flex flex-col z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-gray-100 ml-0 md:ml-65">
        <div className="bg-white shadow sticky top-0 z-30">
          <Header />
        </div>
        <div className="flex-grow overflow-y-auto p-3">
          <Dashboard />
        </div>
        <div className="h-8 bg-white shadow flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}
