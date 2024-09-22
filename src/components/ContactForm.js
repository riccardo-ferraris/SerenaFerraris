import React, { useState } from 'react';
import Divider from './Divider';
import emailjs from 'emailjs-com';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		cellulare: '',
		wedding_date: null,
		message: '',
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({});

	const nameRegex = /^[a-zA-Z\s]+$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const cellularRegex = /^\+?[0-9\s-]+$/;

	const validateForm = () => {
		let formErrors = {};
		let valid = true;

		// Validazione nome (solo lettere e spazi)
		if (!nameRegex.test(formData.name)) {
			valid = false;
			formErrors.name = 'Il nome deve contenere solo lettere e spazi';
		}

		// Validazione email (formato standard email)
		if (!emailRegex.test(formData.email)) {
			valid = false;
			formErrors.email = 'Inserisci una email valida';
		}

		// Validazione cellulare (solo numeri e formati accettabili)
		if (!cellularRegex.test(formData.cellulare)) {
			valid = false;
			formErrors.cellulare = 'Inserisci un numero di cellulare valido';
		}

		// Validazione messaggio (minimo 10 caratteri)
		if (formData.message.length < 10) {
			valid = false;
			formErrors.message = 'Il messaggio deve contenere almeno 10 caratteri';
		}

		setErrors(formErrors);
		return valid;
	};


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setFormData({ ...formData, wedding_date: date });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if(validateForm()){
			const formDataToSend = {
				...formData,
				wedding_date: formData.wedding_date
					? formData.wedding_date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
					: '',
			};
			emailjs.send('service_ef5ypa2', 'template_u619rzr', formDataToSend, '9td0FTMQbTXiveDeG')
				.then((response) => {
					console.log('SUCCESS!', response.status, response.text);
					setIsSubmitted(true);
					setFormData({ name: '', email: '', cellulare: '', wedding_date: null, message: '' });
				}, (err) => {
					console.log('FAILED...', err);
				});
		}
	};

	return (
		<div className="py-8 px-8 bg-gray-100">
			<Divider text={"Contattami"} />
			<div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
				{isSubmitted ? (
					<p className="text-green-500 text-center">Grazie! Il tuo messaggio è stato inviato.</p>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-[#102e5e] font-bold mb-2">
								Nome
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
							{errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-[#102e5e] font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
							{errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<div className="mb-4">
								<label htmlFor="cellulare" className="block text-[#102e5e] font-bold mb-2">
									Cellulare
								</label>
								<input
									type="text"
									id="cellulare"
									name="cellulare"
									value={formData.cellulare}
									onChange={handleChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								{errors.cellulare && <p className='text-red-500 text-sm'>{errors.cellulare}</p>}
							</div>
							<div className="mb-4">
								<label htmlFor="wedding_date" className="block text-[#102e5e] font-bold mb-2">
									Data matrimonio
								</label>
								<DatePicker 
									selected={formData.wedding_date}
									onChange={handleDateChange}
									dateFormat="dd/MM/yyyy"
									className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="message" className="block text-[#102e5e] font-bold mb-2">
								Messaggio
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								rows="5"
								required
							/>
							{errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors duration-300"
							>
								Invia Messaggio
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ContactForm;