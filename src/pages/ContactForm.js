import React, { useState, useRef } from 'react';
import Divider from '../components/Divider';
import emailjs from 'emailjs-com';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import RadioGroup from '../components/RadioGroup';
import FormCards from '../components/FormCards';

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

	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const cellulareRef = useRef(null);
	const weddingDateRef = useRef(null);
	const messageRef = useRef(null);
	const photoServiceRef = useRef(null);
	const reportageKnowledgeRef = useRef(null);
	const albumPreferenceRef = useRef(null);
	const firstCharacteristicRef = useRef(null);
	const secondCharacteristicRef = useRef(null);

	// Stati separati per ciascun gruppo di radio button
	const [photoServicePreference, setPhotoServicePreference] = useState('');
	const [reportageKnowledge, setReportageKnowledge] = useState('');
	const [albumPreference, setAlbumPreference] = useState('');
	const [otherPreference1, setOtherPreference1] = useState('');
	const [otherPreference2, setOtherPreference2] = useState('');
	const [firstCharacteristic, setFirstCharacteristic] = useState('');
	const [secondCharacteristic, setSecondCharacteristic] = useState('');

	// Stato per il caricamento dell'invio del form
	const [loading, setLoading] = useState(false);  // Nuovo stato per il caricamento

	const options1 = [
		{ label: 'Stupire amici e parenti con foto indimenticabili', value: 'Stupire amici e parenti con foto indimenticabili' },
		{ label: 'Condivido i valori di semplicità e naturalezza', value: 'Condivido i valori di semplicità e naturalezza' },
		{ label: 'Vivere un\'esperienza unica da poter ricordare attraverso le foto', value: 'Vivere un\'esperienza unica da poter ricordare attraverso le foto' },
		{ label: 'Altro', value: 'Altro' }
	];

	const options2 = [
		{ label: 'Sì, e sto cercando questo stile', value: 'Sì, e sto cercando questo stile' },
		{ label: 'Ne ho sentito parlare ma vorrei più info', value: 'Ne ho sentito parlare ma vorrei più info' },
		{ label: 'Mai sentito', value: 'Mai sentito' },
		{ label: 'Altro', value: 'Altro' }
	];

	const options3 = [
		{ label: 'No, niente album', value: 'No, niente album' },
		{ label: 'Sì, album tradizionale', value: 'Sì, album tradizionale' },
		{ label: 'Sì, album fotolibro', value: 'Sì, album fotolibro' },
		{ label: 'Non saprei', value: 'Non saprei' }
	];

	const optionsCharacteristics = [
		{ label: 'Creatività', value: 'Creatività' },
		{ label: 'Emozioni', value: 'Emozioni' },
		{ label: 'Affidabilità', value: 'Affidabilità' },
		{ label: 'Alti Standard', value: 'Alti Standard' },
		{ label: 'Attenzione ai dettagli', value: 'Attenzione ai dettagli' },
		{ label: 'Ascolto/Osservo', value: 'Ascolto/Osservo' },
		{ label: 'Controllo e Leadership', value: 'Controllo e Leadership' },
	];

	const nameRegex = /^[a-zA-Z\s]+$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const cellularRegex = /^\+?[0-9\s-]+$/;

	const validateForm = () => {
		let formErrors = {};
		let valid = true;
		let firstInvalidField = null;

		// Validazione nome (solo lettere e spazi)
		if (!nameRegex.test(formData.name)) {
			valid = false;
			formErrors.name = 'Il nome deve contenere solo lettere e spazi';
			if (!firstInvalidField) firstInvalidField = 'name';
		}

		// Validazione email (formato standard email)
		if (!emailRegex.test(formData.email)) {
			valid = false;
			formErrors.email = 'Inserisci una email valida';
			if (!firstInvalidField) firstInvalidField = 'email';
		}

		// Validazione cellulare (solo numeri e formati accettabili)
		if (!cellularRegex.test(formData.cellulare)) {
			valid = false;
			formErrors.cellulare = 'Inserisci un numero di cellulare valido';
			if (!firstInvalidField) firstInvalidField = 'cellulare';
		}

		// Validazione wedding_date (non può essere vuoto)
		if (!formData.wedding_date) {
			valid = false;
			formErrors.wedding_date = 'Seleziona una data per il matrimonio';
			if (!firstInvalidField) firstInvalidField = 'wedding_date';
		}
		// Validazione messaggio (minimo 10 caratteri)
		if (formData.message.length < 10) {
			valid = false;
			formErrors.message = 'Il messaggio deve contenere almeno 10 caratteri';
			if (!firstInvalidField) firstInvalidField = 'message';
		}

		// Validazione radio button
		if (!photoServicePreference) {
			valid = false;
			formErrors.photoServicePreference = 'Seleziona un\'opzione per il servizio fotografico';
			if (!firstInvalidField) firstInvalidField = 'photoServicePreference';
		}
		if (!reportageKnowledge) {
			valid = false;
			formErrors.reportageKnowledge = 'Seleziona un\'opzione per il reportage';
			if (!firstInvalidField) firstInvalidField = 'reportageKnowledge';
		}
		if (!albumPreference) {
			valid = false;
			formErrors.albumPreference = 'Seleziona un\'opzione per l\'album';
			if (!firstInvalidField) firstInvalidField = 'albumPreference';
		}
		if (!firstCharacteristic) {
			valid = false;
			formErrors.firstCharacteristic = 'Seleziona la prima caratteristica';
			if (!firstInvalidField) firstInvalidField = 'firstCharacteristic';
		}
		if (!secondCharacteristic) {
			valid = false;
			formErrors.secondCharacteristic = 'Seleziona la seconda caratteristica';
			if (!firstInvalidField) firstInvalidField = 'secondCharacteristic';
		}

		// Controllo che le due caratteristiche non siano uguali
		if (firstCharacteristic !== '' && secondCharacteristic !== '' && firstCharacteristic === secondCharacteristic) {
			valid = false;
			formErrors.characteristics = 'La prima e la seconda caratteristica devono essere diverse';
		}

		setErrors(formErrors);
		return { valid, firstInvalidField };
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setFormData({ ...formData, wedding_date: date });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { valid, firstInvalidField } = validateForm();

		if (!valid) {
			// Porta il focus al primo campo non valido
			if (firstInvalidField === 'name') {
				nameRef.current.focus();
			} else if (firstInvalidField === 'email') {
				emailRef.current.focus();
			} else if (firstInvalidField === 'cellulare') {
				cellulareRef.current.focus();
			} else if (firstInvalidField === 'wedding_date') {
				weddingDateRef.current.setFocus();
			} else if (firstInvalidField === 'message') {
				messageRef.current.focus();
			} else if (firstInvalidField === 'photoServicePreference') {
				photoServiceRef.current.scrollIntoView({behavior: 'smooth'});
			} else if (firstInvalidField === 'reportageKnowledge') {
				reportageKnowledgeRef.current.scrollIntoView({behavior: 'smooth'});
			} else if (firstInvalidField === 'albumPreference') {
				albumPreferenceRef.current.scrollIntoView({behavior: 'smooth'});
			} else if (firstInvalidField === 'firstCharacteristic') {
				firstCharacteristicRef.current.scrollIntoView({behavior: 'smooth'});
			} else if (firstInvalidField === 'secondCharacteristic') {
				firstCharacteristicRef.current.scrollIntoView({behavior: 'smooth'});
			}
			return;
		}

		if (validateForm()) {
			setLoading(true);

			const formDataToSend = {
				...formData,
				photoServicePreference: photoServicePreference === 'Altro' ? otherPreference1 : photoServicePreference,
				reportageKnowledge: reportageKnowledge === 'Altro' ? otherPreference2 : reportageKnowledge,
				albumPreference,
				firstCharacteristic,
				secondCharacteristic,
				wedding_date: formData.wedding_date
					? formData.wedding_date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
					: '',
			};
			emailjs.send('service_ef5ypa2', 'template_u619rzr', formDataToSend, '9td0FTMQbTXiveDeG')
				.then((response) => {
					console.log('SUCCESS!', response.status, response.text);
					setIsSubmitted(true);
					setLoading(false);
					setFormData({ name: '', email: '', cellulare: '', wedding_date: null, message: '' });
					setPhotoServicePreference('');
					setReportageKnowledge('');
					setAlbumPreference('');
					setFirstCharacteristic('');
					setSecondCharacteristic('');
					setOtherPreference1('');
					setOtherPreference2('');
				}, (err) => {
					console.log('FAILED...', err);
					setLoading(false);
				});
		}
	};

	return (
		<div className="py-4 px-8 bg-gray-100">
			<Divider text={"Contattami"} />
			<div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
				{isSubmitted ? (
					<p className="text-green-500 text-center">Grazie! Il tuo messaggio è stato inviato.</p>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="name" className="block text-[#102e5e] font-bold mb-2">
								Nome
							</label>
							<input
								ref={nameRef}
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							/>
							{errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
						</div>
						<div className="mb-4">
							<label htmlFor="email" className="block text-[#102e5e] font-bold mb-2">
								Email
							</label>
							<input
								ref={emailRef}
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							/>
							{errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<div className="mb-4">
								<label htmlFor="cellulare" className="block text-[#102e5e] font-bold mb-2">
									Cellulare
								</label>
								<input
									ref={cellulareRef}
									type="text"
									id="cellulare"
									name="cellulare"
									value={formData.cellulare}
									onChange={handleChange}
									className={`w-full px-4 py-2 border ${errors.cellulare ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}

								/>
								{errors.cellulare && <p className='text-red-500 text-sm'>{errors.cellulare}</p>}
							</div>
							<div className="mb-4">
								<label htmlFor="wedding_date" className="block text-[#102e5e] font-bold mb-2">
									Data matrimonio
								</label>
								<DatePicker
									ref={weddingDateRef}
									selected={formData.wedding_date}
									onChange={handleDateChange}
									dateFormat="dd/MM/yyyy"
									className={`w-full px-4 py-2 border ${errors.wedding_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
								/>
								{errors.wedding_date && <p className="text-red-500 text-sm">{errors.wedding_date}</p>}  {/* Mostra errore */}
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="message" className="block text-[#102e5e] font-bold mb-2">
								Messaggio
							</label>
							<textarea
								ref={messageRef}
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
								rows="5"
							/>
							{errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
						</div>

						{/* Gruppo di radio buttons per "Cosa vorresti da un servizio fotografico?" */}
						<RadioGroup
							ref={photoServiceRef}
							title={'Cosa vorresti da un servizio fotografico?'}
							options={options1}
							selectedOption={photoServicePreference}
							onChange={(e) => setPhotoServicePreference(e.target.value)}
							otherOptionValue={otherPreference1}
							setOtherOptionValue={(value) => setOtherPreference1(value)}
						/>
						{errors.photoServicePreference && <p className='text-red-500 text-sm mb-4'>{errors.photoServicePreference}</p>}

						{/* Gruppo di radio buttons per "Conosci il reportage?" */}
						<RadioGroup
							ref={reportageKnowledgeRef}
							title={'Conosci il reportage?'}
							options={options2}
							selectedOption={reportageKnowledge}
							onChange={(e) => setReportageKnowledge(e.target.value)}
							otherOptionValue={otherPreference2}
							setOtherOptionValue={(value) => setOtherPreference2(value)}
						/>
						{errors.reportageKnowledge && <p className='text-red-500 text-sm mb-4'>{errors.reportageKnowledge}</p>}

						{/* Gruppo di radio buttons per "Vorresti un album?" */}
						<RadioGroup
							ref={albumPreferenceRef}
							title={'Vorresti un album?'}
							options={options3}
							selectedOption={albumPreference}
							onChange={(e) => setAlbumPreference(e.target.value)}
						/>
						{errors.albumPreference && <p className='text-red-500 text-sm mb-4'>{errors.albumPreference}</p>}

						<FormCards />

						<RadioGroup
							ref={firstCharacteristicRef}
							title={'Pensa alla tua personalità e scegli la PRIMA caratteristica che più la definisce.'}
							options={optionsCharacteristics}
							selectedOption={firstCharacteristic}
							onChange={(e) => setFirstCharacteristic(e.target.value)}
						/>
						{errors.firstCharacteristic && <p className='text-red-500 text-sm mb-4'>{errors.firstCharacteristic}</p>}

						<RadioGroup
							ref={secondCharacteristicRef}
							title={'Ora pensa alla tua personalità e scegli la SECONDA caratteristica che più la definisce.'}
							options={optionsCharacteristics}
							selectedOption={secondCharacteristic}
							onChange={(e) => setSecondCharacteristic(e.target.value)}
						/>
						{errors.secondCharacteristic && <p className='text-red-500 text-sm mb-4'>{errors.secondCharacteristic}</p>}

						{/* Messaggio di errore se le caratteristiche sono uguali */}
						{errors.characteristics && <p className='text-red-500 text-sm mb-4'>{errors.characteristics}</p>}

						<div className="text-center">
							{loading ? (
								<p className="text-blue-500 font-bold">Invio in corso...</p>  // Indicatore di caricamento
							) : (
								<button
									type="submit"
									className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors duration-300"
								>
									Invia Messaggio
								</button>
							)}
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ContactForm;