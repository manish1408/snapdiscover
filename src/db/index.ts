export const MOCKUP_PRODUCTS = [
	{
		id: '1',
		images: [
			require('@/shared/assets/images/merlot-reserve.png'),
			require('@/shared/assets/images/budweiser.png'),
			require('@/shared/assets/images/captain-morgan.png'),
		],
		name: 'Merlot Reserve',
		score: 92,
		date: '2023-01-15T00:00:00Z',
		isVerified: true,
		points: 8,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,

		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',

		tasteProfile: {
			bitterness: 3,
			sweetness: 5,
			citrus: 4,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 4.0, totalRatings: 1200 },
			{ source: 'Ratebeer', rating: 4.5, totalRatings: 800 },
		],
		abv: 13,
		ibu: 25,
		ingredients: ['Merlot grapes', 'Yeast', 'Oak'],
		reviews: [
			{
				user: 'John Doe',
				comment: 'Great wine! Loved the rich flavor.',
			},
		],
		foodPairing: ['Grilled steak', 'Dark chocolate'],
		servingsSuggestions: 'Best served at room temperature.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '123 Vineyard Lane, Winetown, CA 12345',
		website: 'www.merlotreservewinery.com',
		soldBy: 'WineCo',
	},
	{
		id: '2',
		images: [
			require('@/shared/assets/images/budweiser.png'),
			require('@/shared/assets/images/merlot-reserve.png'),
			require('@/shared/assets/images/captain-morgan.png'),
		],
		name: 'Budweiser',
		score: 91,
		date: '2023-05-20T00:00:00Z',
		isVerified: true,
		points: 8,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 2,
			sweetness: 3,
			citrus: 1,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 3.8, totalRatings: 1800 },
			{ source: 'Ratebeer', rating: 4.2, totalRatings: 1000 },
		],
		abv: 5,
		ibu: 15,
		ingredients: ['Barley', 'Hops', 'Water', 'Yeast'],
		reviews: [
			{
				user: 'Jane Smith',
				comment: 'Classic and refreshing. A go-to choice for gatherings.',
			},
			{
				user: 'John Doe',
				comment: 'Great beer! Loved the rich flavor.',
			},
		],
		foodPairing: ['Grilled chicken', 'Spicy wings'],
		servingsSuggestions: 'Best served chilled.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '456 Brewery Street, Hopsville, CO 67890',
		website: 'www.budweiser.com',
		soldBy: 'HopBrew Co',
	},
	{
		id: '3',
		images: [require('@/shared/assets/images/chardonnay-elegance.png'), require('@/shared/assets/images/budweiser.png')],
		name: 'Chardonnay Elegance',
		score: 89,
		date: '2023-02-02T00:00:00Z',
		isVerified: false,
		points: 7,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 1,
			sweetness: 7,
			citrus: 2,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 3.5, totalRatings: 800 },
			{ source: 'Ratebeer', rating: 4.0, totalRatings: 600 },
		],
		abv: 12,
		ibu: 10,
		ingredients: ['Chardonnay grapes', 'Yeast', 'Oak'],
		reviews: [
			{
				user: 'Alex Johnson',
				comment: 'Delicate and smooth. Perfect for a relaxing evening.',
			},
		],
		foodPairing: ['Seafood pasta', 'Cheese platter'],
		servingsSuggestions: 'Chill before serving.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '789 Vineyard Road, Winetown, CA 56789',
		website: 'www.chardonnayelegance.com',
		soldBy: 'Elegance Wines',
	},
	{
		id: '4',
		images: [
			require('@/shared/assets/images/jack-daniels.png'),
			require('@/shared/assets/images/chardonnay-elegance.png'),
			require('@/shared/assets/images/captain-morgan.png'),
		],
		name: 'Jack Daniels',
		score: 95,
		date: '2023-03-10T00:00:00Z',
		isVerified: true,
		points: 9,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 4,
			sweetness: 6,
			citrus: 1,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 4.7, totalRatings: 2500 },
			{ source: 'Ratebeer', rating: 4.9, totalRatings: 2000 },
		],
		abv: 40,
		ibu: 0,
		ingredients: ['Corn', 'Rye', 'Barley', 'Water'],
		reviews: [
			{
				user: 'David Miller',
				comment: 'Classic and timeless. A must-have for whiskey lovers.',
			},
		],
		foodPairing: ['Barbecue ribs', 'Chocolate dessert'],
		servingsSuggestions: 'Serve over ice or in cocktails.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '123 Whiskey Lane, Distillville, TN 12345',
		website: 'www.jackdaniels.com',
		soldBy: 'Jack Daniels Distillery',
	},
	{
		id: '5',
		images: [require('@/shared/assets/images/captain-morgan.png'), require('@/shared/assets/images/jack-daniels.png')],
		name: 'Captain Morgan',
		score: 88,
		date: '2023-04-05T00:00:00Z',
		isVerified: false,
		points: 6,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 2,
			sweetness: 5,
			citrus: 3,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 3.9, totalRatings: 1200 },
			{ source: 'Ratebeer', rating: 4.1, totalRatings: 800 },
		],
		abv: 35,
		ibu: 0,
		ingredients: ['Caribbean rum', 'Spices'],
		reviews: [
			{
				user: 'Emily White',
				comment: 'Perfect for mixing. Adds a tropical flair to cocktails.',
			},
		],
		foodPairing: ['Pineapple chicken', 'Mango salsa'],
		servingsSuggestions: 'Best enjoyed in cocktails.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '456 Rum Street, Pirates Bay, Caribbean',
		website: 'www.captainmorgan.com',
		soldBy: 'Captain Morgan Distillers',
	},
	{
		id: '6',
		images: [require('@/shared/assets/images/citrus-forward-gin.png')],
		name: 'Citrus Forward Gin',
		score: 90,
		date: '2023-06-15T00:00:00Z',
		isVerified: true,
		points: 7,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 3,
			sweetness: 4,
			citrus: 5,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 4.2, totalRatings: 1500 },
			{ source: 'Ratebeer', rating: 4.4, totalRatings: 1000 },
		],
		abv: 45,
		ibu: 10,
		ingredients: ['Juniper berries', 'Citrus peel', 'Coriander'],
		reviews: [
			{
				user: 'Sophia Davis',
				comment: 'Refreshing and zesty. Perfect for gin lovers.',
			},
		],
		foodPairing: ['Citrus salad', 'Herb-crusted fish'],
		servingsSuggestions: 'Garnish with a twist of orange peel.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '789 Gin Lane, Citrusville, CA 56789',
		website: 'www.citrusforwardgin.com',
		soldBy: 'Citrus Spirits Co',
	},
];

export const MOCKUP_RELATED_PRODUCTS = [
	{
		id: '1',
		images: [
			require('@/shared/assets/images/merlot-reserve.png'),
			require('@/shared/assets/images/budweiser.png'),
			require('@/shared/assets/images/captain-morgan.png'),
		],
		name: 'Merlot Reserve',
		score: 92,
		date: '2023-01-15T00:00:00Z',
		isVerified: true,
		points: 8,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,

		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',

		tasteProfile: {
			bitterness: 3,
			sweetness: 5,
			citrus: 4,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 4.0, totalRatings: 1200 },
			{ source: 'Ratebeer', rating: 4.5, totalRatings: 800 },
		],
		abv: 13,
		ibu: 25,
		ingredients: ['Merlot grapes', 'Yeast', 'Oak'],
		reviews: [
			{
				user: 'John Doe',
				comment: 'Great wine! Loved the rich flavor.',
			},
		],
		foodPairing: ['Grilled steak', 'Dark chocolate'],
		servingsSuggestions: 'Best served at room temperature.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '123 Vineyard Lane, Winetown, CA 12345',
		website: 'www.merlotreservewinery.com',
		soldBy: 'WineCo',
	},
	{
		id: '2',
		images: [
			require('@/shared/assets/images/budweiser.png'),
			require('@/shared/assets/images/merlot-reserve.png'),
			require('@/shared/assets/images/captain-morgan.png'),
		],
		name: 'Budweiser',
		score: 91,
		date: '2023-05-20T00:00:00Z',
		isVerified: true,
		points: 8,
		isFavourite: true,
		rating: 4.2,
		totalRatings: 1600,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at nunc sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer viverra risus commodo enim.',
		tasteProfile: {
			bitterness: 2,
			sweetness: 3,
			citrus: 1,
		},
		ratingSource: [
			{ source: 'Untapped', rating: 3.8, totalRatings: 1800 },
			{ source: 'Ratebeer', rating: 4.2, totalRatings: 1000 },
		],
		abv: 5,
		ibu: 15,
		ingredients: ['Barley', 'Hops', 'Water', 'Yeast'],
		reviews: [
			{
				user: 'Jane Smith',
				comment: 'Classic and refreshing. A go-to choice for gatherings.',
			},
			{
				user: 'John Doe',
				comment: 'Great beer! Loved the rich flavor.',
			},
		],
		foodPairing: ['Grilled chicken', 'Spicy wings'],
		servingsSuggestions: 'Best served chilled.',
		flavourNotes: ['Medium Bitterness', 'Light Sweetness', 'Rich Citrus Aroma'],
		address: '456 Brewery Street, Hopsville, CO 67890',
		website: 'www.budweiser.com',
		soldBy: 'HopBrew Co',
	},
];