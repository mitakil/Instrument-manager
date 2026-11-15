import Navbar from './Navbar'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="text-center text-xs text-gray-400 py-4">Lab Instrument Manager</footer>
    </div>
  )
}
