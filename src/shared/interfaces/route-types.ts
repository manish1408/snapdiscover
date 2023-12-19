import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
export type RootStackParamList = {
	login: undefined;
	createAccount: undefined;
	enterOtp: undefined;
	enterNewPassword: undefined;
	forgotPassword: undefined;
	welcome: undefined;
	tab: undefined;
	detailPlant: undefined;
	plantList: undefined;
	favorites: undefined;
	notifications: undefined;
	reviews: undefined;
	checkout: undefined;
	editProfile: undefined;
	vouchers: undefined;
	tracking: undefined;
	eReceipt: undefined;
	payments: undefined;
	newPayment: undefined;
	addNewAddress: undefined;
	language: undefined;
	conversation: undefined;
	chats: undefined;
	detailProduct: {
		id: string;
	};
	locationPermission: undefined;
	welcomeModal: undefined;
	terms: undefined;
	privacy: undefined;
	earn: undefined;
	scan: undefined;
};

export type RouteItem = {
	path: keyof RootStackParamList;
	component: any;
	private: boolean;
};
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export interface TasteProfile {
	bitterness: number;
	sweetness: number;
	citrus: number;
}

export interface RatingSource {
	source: string;
	rating: number;
	totalRatings: number;
}

export interface Review {
	user: string;
	comment: string;
}
