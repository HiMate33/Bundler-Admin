export default function Revenue() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Example Card */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                    <p className="text-gray-600">$150,000</p>
                </div>
                {/* Add more cards or components as needed */}
            </div>
        </div>
)
}