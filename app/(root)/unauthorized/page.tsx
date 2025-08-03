export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">⛔</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600 transition"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
