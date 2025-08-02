export default function Template() {
  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-black text-white shadow-lg flex flex-col">
        <div className="p-4 text-center border-b border-gray-700">
          <h1 className="text-xl font-bold">CREATIVE TIM</h1>
        </div>
        <div className="p-4 flex items-center space-x-2 border-b border-gray-700">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span>Tania Andrew</span>
        </div>
        <nav className="flex-grow p-4 space-y-3">
          <button className="w-full flex items-center space-x-3 p-2 rounded bg-cyan-600">
            <span className="material-icons">dashboard</span>
            <span>Dashboard</span>
          </button>
          {["Pages", "Components", "Forms", "Tables", "Maps", "Widgets"].map((item) => (
            <button key={item} className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded">
              <span className="material-icons">menu</span>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-grow bg-gray-100">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm"
            />
            <span className="material-icons">search</span>
            <span className="material-icons">grid_view</span>
            <div className="relative">
              <span className="material-icons">notifications</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">5</span>
            </div>
            <span className="material-icons">person</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="flex-grow overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Card */}
          <div className="bg-white p-4 rounded shadow flex items-start gap-4">
            <div className="bg-orange-500 p-3 rounded shadow">
              <span className="material-icons text-white">content_copy</span>
            </div>
            <div>
              <p className="text-sm">Used Space</p>
              <h3 className="text-lg font-bold">49/50 GB</h3>
              <p className="text-xs text-red-500 mt-2">⚠ Get more space</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-start gap-4">
            <div className="bg-green-500 p-3 rounded shadow">
              <span className="material-icons text-white">store</span>
            </div>
            <div>
              <p className="text-sm">Revenue</p>
              <h3 className="text-lg font-bold">$34,245</h3>
              <p className="text-xs text-gray-500 mt-2">Last 24 Hours</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-start gap-4">
            <div className="bg-red-500 p-3 rounded shadow">
              <span className="material-icons text-white">info</span>
            </div>
            <div>
              <p className="text-sm">Fixed Issues</p>
              <h3 className="text-lg font-bold">75</h3>
              <p className="text-xs text-gray-500 mt-2">Tracked from GitHub</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow flex items-start gap-4">
            <div className="bg-cyan-500 p-3 rounded shadow">
              <span className="material-icons text-white">twitter</span>
            </div>
            <div>
              <p className="text-sm">Followers</p>
              <h3 className="text-lg font-bold">+245</h3>
              <p className="text-xs text-gray-500 mt-2">Just Updated</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="h-16 bg-white shadow flex items-center justify-center">
          <p className="text-sm text-gray-500">&copy; 2025 Creative Dashboard</p>
        </footer>
      </main>
    </div>
  );
}
