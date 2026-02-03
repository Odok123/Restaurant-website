import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">School Management System</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/students" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Students</h3>
              <p className="mt-2 text-sm text-gray-500">Manage student information and enrollments</p>
            </Link>
            <Link href="/teachers" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Teachers</h3>
              <p className="mt-2 text-sm text-gray-500">Manage teacher profiles and assignments</p>
            </Link>
            <Link href="/courses" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Courses</h3>
              <p className="mt-2 text-sm text-gray-500">Manage course offerings and schedules</p>
            </Link>
            <Link href="/grades" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Grades</h3>
              <p className="mt-2 text-sm text-gray-500">View and manage student grades</p>
            </Link>
            <Link href="/attendance" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
              <p className="mt-2 text-sm text-gray-500">Track student attendance</p>
            </Link>
            <Link href="/reports" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-medium text-gray-900">Reports</h3>
              <p className="mt-2 text-sm text-gray-500">Generate reports and analytics</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}