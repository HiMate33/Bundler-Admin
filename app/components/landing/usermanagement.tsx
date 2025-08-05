export default function UserManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Card */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-600">31,500</p>
        </div>
        {/* Add more cards or components as needed */}
      </div>
    </div>
  );
}