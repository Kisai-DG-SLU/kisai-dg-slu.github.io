import { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = `Message de ${name} - Portfolio`;
    const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:kisai.dg.slu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative pb-4">
          Contact
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-primary)] rounded-full"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Restons en contact</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              N'hésitez pas à me contacter pour discuter de projets, d'opportunités ou simplement pour échanger sur l'IA et la technologie.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 w-20">Email :</span>
                <a href="mailto:kisai.dg.slu@gmail.com" className="text-[var(--color-primary)] hover:underline font-medium">
                  kisai.dg.slu@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 w-20">LinkedIn :</span>
                <a href="https://www.linkedin.com/in/damienguesdon/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline font-medium">
                  damienguesdon
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 w-20">GitHub :</span>
                <a href="https://github.com/Kisai-DG-SLU" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline font-medium">
                  Kisai-DG-SLU
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 ${ 
                  status === 'success' ? 'bg-teal-500 scale-[0.98]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:-translate-y-1'
                }`}
                disabled={status === 'success'}
              >
                {status === 'success' ? 'Message envoyé ! ✓' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
