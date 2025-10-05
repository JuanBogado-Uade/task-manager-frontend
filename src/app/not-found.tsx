export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Página no encontrada</h1>
        <p className="mb-6">La página que buscas no existe o ha sido movida.</p>
        <a
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Volver al login
        </a>
      </div>
    </main>
  );
}