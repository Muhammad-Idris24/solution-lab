'use client';

export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="grid min-h-screen place-items-center bg-red-50 p-6 text-center">
          <div>
            <h2 className="text-2xl font-bold text-red-700">Unexpected error</h2>
            <p className="text-red-600">A runtime issue occurred. Please refresh.</p>
          </div>
        </div>
      </body>
    </html>
  );
}
