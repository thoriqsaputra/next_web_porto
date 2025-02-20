export default function Contact() {
    return (
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-8">
            Want to collaborate or just say hi? Feel free to reach out!
          </p>
          <a
            href="mailto:your.email@example.com"
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Email Me
          </a>
        </div>
      </section>
    );
  }