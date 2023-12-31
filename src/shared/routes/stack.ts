import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Login from '@/modules/auth/login';
import CreateAccount from '@/modules/auth/createAccount';
import EnterOtp from '@/modules/auth/enterOtp';
import EnterNewPassword from '@/modules/auth/enterNewPassword';
import ForgotPassword from '@/modules/auth/forgotPassword';
import Welcome from '@/modules/auth/welcome';
import DetailPlant from '@/modules/private/detailPlant';
import PlantList from '@/modules/private/plantList';
import Favorite from '@/modules/private/home/sections/favorite';
import Notifications from '@/modules/private/home/sections/notifications';
import Reviews from '@/modules/private/detailPlant/sections/reviews';
import Checkout from '@/modules/private/checkout';
import EditProfile from '@/modules/private/profile/sections/editProfile';
import Vouchers from '@/modules/private/profile/sections/vouchers';

import NewPayment from '@/modules/private/profile/sections/payments/components/newPayment';
import Payments from '@/modules/private/profile/sections/payments';
import Tracking from '@/modules/private/orders/sections/tracking';
import EReceipt from '@/modules/private/orders/sections/eReceipt';

import NewAddress from '@/modules/private/profile/sections/newAddress';
import Language from '@/modules/private/profile/sections/language';
import Conversation from '@/modules/private/conversation';
import Chats from '@/modules/private/chats';
import DetailProduct from '@/modules/private/detailProduct';
import LocationPermission from '@/modules/auth/locationPermission';
import Terms from '@/modules/private/profile/terms';
import Privacy from '@/modules/private/profile/privacy';
import Earn from '@/modules/private/earn';

export type RootStackParamList = {
	login: undefined;
	tab: undefined;
	createAccount: undefined;
	enterOtp: undefined;
	enterNewPassword: undefined;
	forgotPassword: undefined;
	welcome: undefined;
	detailPlant: undefined;
	plantList: undefined;
	favorites: undefined;
	notifications: undefined;
	reviews: {
		productId: string;
	};
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
const RoutesStack: RouteItem[] = [
	{
		path: 'login',
		component: Login,
		private: false,
	},
	{
		path: 'createAccount',
		component: CreateAccount,
		private: false,
	},
	{
		path: 'enterOtp',
		component: EnterOtp,
		private: false,
	},
	{
		path: 'enterNewPassword',
		component: EnterNewPassword,
		private: true,
	},
	{
		path: 'forgotPassword',
		component: ForgotPassword,
		private: true,
	},
	{
		path: 'welcome',
		component: Welcome,
		private: true,
	},
	{
		path: 'detailPlant',
		component: DetailPlant,
		private: true,
	},
	{
		path: 'plantList',
		component: PlantList,
		private: true,
	},
	{
		path: 'favorites',
		component: Favorite,
		private: true,
	},
	{
		path: 'notifications',
		component: Notifications,
		private: true,
	},
	{
		path: 'reviews',
		component: Reviews,
		private: true,
	},
	{
		path: 'checkout',
		component: Checkout,
		private: true,
	},
	{
		path: 'editProfile',
		component: EditProfile,
		private: true,
	},
	{
		path: 'vouchers',
		component: Vouchers,
		private: true,
	},
	{
		path: 'payments',
		component: Payments,
		private: true,
	},
	{
		path: 'tracking',
		component: Tracking,
		private: true,
	},
	{
		path: 'eReceipt',
		component: EReceipt,
		private: true,
	},
	{
		path: 'newPayment',
		component: NewPayment,
		private: true,
	},
	{
		path: 'addNewAddress',
		component: NewAddress,
		private: true,
	},
	{
		path: 'language',
		component: Language,
		private: true,
	},
	{
		path: 'chats',
		component: Chats,
		private: true,
	},
	{
		path: 'conversation',
		component: Conversation,
		private: true,
	},
	{
		path: 'detailProduct',
		component: DetailProduct,
		private: true,
	},
	{
		path: 'locationPermission',
		component: LocationPermission,
		private: false,
	},

	{
		path: 'terms',
		component: Terms,
		private: true,
	},
	{
		path: 'privacy',
		component: Privacy,
		private: true,
	},
	{
		path: 'earn',
		component: Earn,
		private: true,
	},
];
export default RoutesStack;
