export type TravelMapVisitedCountry = {
	countryId: string;
	countryName?: string;
};

export type TravelMapPoint = {
	id: string;
	x: number;
	y: number;
	imageSrc: string;
	note: string;
	imageAlt?: string;
	title?: string;
};

export type TravelMapSmallPoint = {
	id: string;
	x: number;
	y: number;
	label: string;
};

export type TravelMapConfig = {
	baseCountryColor: string;
	visitedCountryColor: string;
	borderColor: string;
	oceanColor: string;
	pointColor: string;
	pointHoverColor: string;
	pointRadius: number;
	smallPointColor: string;
	smallPointHoverColor: string;
	smallPointRadius: number;
	visitedCountries: readonly TravelMapVisitedCountry[];
	points: readonly TravelMapPoint[];
	smallPoints: readonly TravelMapSmallPoint[];
};

//后期可以关掉！
export const travelMapDevConfig = {
	enableCoordinatePicker: false,
} as const;

export const travelMapConfig: TravelMapConfig = {
	baseCountryColor: "#b6b2ab",
	visitedCountryColor: "#736d65",
	borderColor: "rgba(24, 23, 21, 0.2)",
	oceanColor: "#f9f9f9",
	pointColor: "#d3ecf6",
	pointHoverColor: "#0ac6d7",
	pointRadius: 4.8,
	smallPointColor: "#beebec",
	smallPointHoverColor: "#00c8cb",
	smallPointRadius: 2.3,
	visitedCountries: [
		{countryId: "cn",countryName: "China",},
        {countryId: "tw",countryName: "China",},
        {countryId: "jp",countryName: "Japan",},
        {countryId: "us",countryName: "United States",},
        {countryId: "kr",countryName: "South Korea",},
        {countryId: "th",countryName: "Thailand",},
        {countryId: "fr",countryName: "France",},
        {countryId: "it",countryName: "Italy",},
        {countryId: "ch",countryName: "Switzerland",},
        {countryId: "at",countryName: "Austria",},
        {countryId: "de",countryName: "Germany",},

	],
	points: [
		{
			id: "qingdao",
			title: "Qingdao",
			x: 683,
			y: 418,
			imageSrc: "/Qingdao.jpg",
			note: "I grew up beside the sea, where many stories started.",
		},
		{
			id: "hangzhou",
			title: "Hangzhou",
			x: 686,
			y: 436,
			imageSrc: "/Hangzhou.jpg",
			note: "I study in the Yangtze River Delta, where tech and life intersect.",
		},
		{
			id: "xiamen",
			title: "Xiamen",
			x: 686,
			y: 455,
			imageSrc: "/Xiamen.png",
			note: "I enjoy SUP, and go supping everywhere.",
		},
		{
			id: "chongqing",
			title: "Chongqing",
			x: 655,
			y: 440,
			imageSrc: "/Chongqing.jpg",
			note: "Many connections and memories here.",
		},
		{
			id: "iowa",
			title: "Iowa",
			x: 198,
			y: 412,
			imageSrc: "/Iowa.jpg",
			note: "Represented China in the Odyssey of the Mind World Finals and received a world gold award here.",
		},
		{
			id: "florida",
			title: "Florida",
			x: 215,
			y: 461,
			imageSrc: "/Florida.jpg",
			note: "Experiencing the American South local culture.",
		},
		{
			id: "osaka",
			title: "Osaka",
			x: 719,
			y: 420,
			imageSrc: "/Osaka.jpg",
			note: "I admire the thoughtful design everywhere here.",
		},
		{
			id: "illinois",
			title: "Illinois",
			x: 219,
			y: 420,
			imageSrc: "/uiuc.png",
			note: "My home university, a new chapter in my life.",
		},
		{
			id: "guiyang",
			title: "Guiyang",
			x: 658,
			y: 456,
			imageSrc: "/chinavis.jpg",
			note: "Presented our paper at ChinaVis 2026.",
		},
	],
	smallPoints: [
		{
			id: "Harbin",
			x: 681,
			y: 382,
			label: "Harbin",
		},
		{
			id: "bangkok",
			label: "Bangkok",
			x: 649,
			y: 491,
		},
		{
			id: "paris",
			x: 413,
			y: 399,
			label: "Paris"
		},
		{
			id: "Seoul",
			x: 697,
			y: 415,
			label: "Seoul",
		},
		{
			id: "Guangzhou",
			x: 679,
			y: 465,
			label: "Guangzhou",
		},
		{
			id: "Pennsylvania",
			x: 233,
			y: 422,
			label: "Pennsylvania",
		},
		{
			id: "Tokyo",
			x: 728,
			y: 417,
			label: "Tokyo",
		},
		{
			id: "Lanzhou",
			x: 644,
			y: 421,
			label: "Lanzhou",
		},
		{
			id: "Wuhan",
			x: 672,
			y: 438,
			label: "Wuhan",
		},
		{
			id: "Nanchang",
			x: 679,
			y: 446,
			label: "Nanchang",
		},
		{
			id: "Peking",
			x: 670,
			y: 408,
			label: "Peking",
		},
		{
			id: "Chengdu",
			x: 646,
			y: 436,
			label: "Chengdu",
		},
		{
			id: "Berlin",
			x: 434,
			y: 387,
			label: "Berlin",
		},
		{
			id: "Bern",
			x: 424,
			y: 406,
			label: "Bern",
		},
		{
			id: "Roma",
			x: 435,
			y: 421,
			label: "Roma",
		},
	],
};
