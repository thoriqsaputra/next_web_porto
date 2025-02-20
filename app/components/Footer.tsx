export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} thoriq. All rights reserved.</p>
          <div className="mt-2">
            <a href="https://github.com/thoriq" className="text-gray-400 hover:text-white mx-2">
              GitHub
            </a>
            <a href="https://linkedin.com/in/thoriq" className="text-gray-400 hover:text-white mx-2">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  }