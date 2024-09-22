import React from 'react';
import Divider from './Divider';

// const packages = [
//   { name: 'Deluxe', price: '€1000', description: 'Servizio di giornata intera, album e 100 foto modificate.' },
//   { name: 'Premium', price: '€500', description: 'Servizio di 5 ore, 50 foto modificate.' },
//   { name: 'Basic', price: '€200', description: 'Servizio di 2 ore, 10 foto modificate.' },
// ];

const packages = [
	{
		name: 'Deluxe',
		price: '€1300',
		discountedPrice: '€1000',
		benefits: [
			'Servizio fotografico di una giornata intera',
			'100 foto modificate incluse',
			'Album fotografico deluxe',
			'Video del servizio incluso',
			'Consegna digitale immediata'
		],
	},
	{
		name: 'Premium',
		price: '€630',
		discountedPrice: '€500',
		benefits: [
			'Servizio fotografico di 5 ore',
			'50 foto modificate incluse',
			'Album fotografico stampato',
			'Consegna digitale in 24 ore'
		],
	},
	{
		name: 'Basic',
		price: '€250',
		discountedPrice: '€200',
		benefits: [
			'Servizio fotografico di 2 ore',
			'10 foto modificate incluse',
			'Consegna digitale in 48 ore'
		],
	},
];

const Packages = () => {
	return (
		<div id="services" className="py-8 bg-gray-100">
			<Divider text={"Pacchetti"} />
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				{packages.map((pkg) => {
					const priceValue = parseFloat(pkg.price.replace('€', ''));
					const discountedPriceValue = parseFloat(pkg.discountedPrice.replace('€', ''));
					const discountPercentage = ((priceValue - discountedPriceValue) / priceValue) * 100;

					return (
						<div key={pkg.name} className="bg-white p-6 shadow-lg rounded-lg flex flex-col relative">
							{/* Chip di risparmio */}
							<div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
								-{discountPercentage.toFixed(0)}%
							</div>
							<div className="flex-grow">
								<h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
								{/* Prezzo originale barrato e prezzo scontato */}
								<p className="text-gray-500 line-through mt-4">{pkg.price}</p>
								<p className="text-4xl font-bold text-red-500 mb-4">{pkg.discountedPrice}</p>
								{/* <p className="text-gray-700 mt-4">{pkg.description}</p> */}
								<ul className="list-disc list-inside text-gray-700">
									{pkg.benefits.map((benefit, index) => (
										<li key={index}>{benefit}</li>
									))}
								</ul>

							</div>
							<button className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors duration-300"            >
								Acquista
							</button>
						</div>
					)
				}
				)}
			</div>
		</div>
	);
};

export default Packages;