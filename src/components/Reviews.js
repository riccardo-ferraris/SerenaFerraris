import { React, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Divider from './Divider';
import emailjs from 'emailjs-com';

const reviewsData = [
  { name: 'Riccardo ed Eleonora', review: "L'esperienza è stata affascinante fin dal primo momento, focalizzata sulla scoperta dei nostri desideri. La chiara comunicazione sin dall'inizio ha permesso di soddisfare le nostre aspirazioni nel modo migliore possibile. La fase di autoanalisi iniziale ci ha messo in sintonia con lei, trasformando i nostri pensieri e desideri di quel giorno nei suoi. Un aspetto che ho apprezzato particolarmente è la capacità di farci sentire a nostro agio, un elemento che non è affatto scontato quando ci si trova di fronte all'obiettivo. Nonostante la situazione non convenzionale, ha creato un'atmosfera rilassata che ci ha permesso di svagarci e ridere come se nulla stesse accadendo. Inoltre, l'analisi iniziale approfondita ha contribuito a far emergere le nostre emozioni, consentendo alla sessione fotografica di catturare non solo la nostra esteriorità, ma anche le nostre sfumature emotive. Il risultato finale è stato straordinario: le foto riflettono le nostre emozioni, esattamente come ci era stato promesso. In sostanza, l'esperienza è stata non solo professionale, ma anche empatica e coinvolgente, trasformando semplici scatti in ricordi straordinariamente significativi.", rating: 5 },
  { name: 'Antonio e Mariarosaria', review: "Attraverso i suoi scatti riesci a vivere l’emozione e il sentimento. Ha la capacità di catturare un momento e renderlo unico perché si basa non su semplici pose costruite ma su attimi che durano per sempre.", rating: 5 },
];

const Reviews = () => {
  const [showForm, setShowForm] = useState(false); // Stato per visualizzare il form
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 }); // Stato per i dati del form
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Stato per il loader

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsSubmitted(false);
  };

  // Funzione per gestire il cambiamento dei campi del form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funzione per gestire il cambiamento del rating
  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  // Funzione per validare i campi del form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio.';
    }
    if (!formData.review.trim()) {
      newErrors.review = 'La recensione è obbligatoria.';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'La valutazione è obbligatoria.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Invia la recensione tramite EmailJS
    emailjs.send('service_r3t8a6m', 'template_70vhm1p', {
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
    }, 'nbN3E8DNXi23ZEJgo')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
        setFormData({ name: '', review: '', rating: 0 }); // Ripristina il form
        setLoading(false);
      }, (err) => {
        console.log('FAILED...', err);
        setLoading(false);
      });
  };

  return (
    <div className="py-8 px-8 bg-gray-100">
      <Divider text={"Dicono di me"} />
      <div className="container mx-auto grid grid-cols-1 gap-8">
        {reviewsData.map((review, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
            <div className="flex items-center mb-4">
              {Array(review.rating).fill().map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-2">"{review.review}"</p>
            <p className="text-gray-900 font-bold mt-2">- {review.name}</p>
          </div>
        ))}
      </div>

      {/* Pulsante per inserire recensione */}
      {!showForm && (
        <div className="text-center mt-8">
          <button
            onClick={toggleForm}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Inserisci recensione
          </button>
        </div>
      )}

      {/* Form per inserire una nuova recensione */}
      {showForm && (
        <div className="mt-8 bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto">
          {isSubmitted ? (
            <p className="text-green-500 text-center">Grazie! La tua recensione è stata inviata.</p>
          ) :
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="review" className="block text-gray-700 font-bold mb-2">
                  Recensione
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.review ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                />
                {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Valutazione
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`cursor-pointer ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>
              <div className="text-center">
                {loading ? (
                  <p className="text-blue-500 font-bold">Invio in corso...</p>  // Indicatore di caricamento
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Invia recensione
                  </button>
                )}
              </div>
            </form>
          }

        </div>
      )}
    </div>
  );
};

export default Reviews;