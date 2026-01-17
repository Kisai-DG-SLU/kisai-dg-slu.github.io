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
    <section id="contact" className="contact">
        <div className="container">
            <h2 className="section__title">Contact</h2>
            <div className="contact__content">
                <div className="contact__info">
                    <h3>Restons en contact</h3>
                    <p>N'hésitez pas à me contacter pour discuter de projets, d'opportunités ou simplement pour échanger sur l'IA et la technologie.</p>
                    <div className="contact__details">
                        <div className="contact__item">
                            <span className="contact__label">Email :</span>
                            <a href="mailto:kisai.dg.slu@gmail.com" className="contact__link">kisai.dg.slu@gmail.com</a>
                        </div>
                        <div className="contact__item">
                            <span className="contact__label">LinkedIn :</span>
                            <a href="https://www.linkedin.com/in/damienguesdon/" target="_blank" rel="noopener noreferrer" className="contact__link">damienguesdon</a>
                        </div>
                        <div className="contact__item">
                            <span className="contact__label">GitHub :</span>
                            <a href="https://github.com/Kisai-DG-SLU" target="_blank" rel="noopener noreferrer" className="contact__link">Kisai-DG-SLU</a>
                        </div>
                    </div>
                </div>
                <div className="contact__form">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Nom</label>
                            <input type="text" id="name" name="name" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea id="message" name="message" className="form-control" rows={5} required></textarea>
                        </div>
                        <button 
                          type="submit" 
                          className={`btn btn--primary btn--full-width ${status === 'success' ? 'btn--success' : ''}`}
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
