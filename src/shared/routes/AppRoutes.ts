import { RouteItem } from '../interfaces/route-types';
import DetailPlant from '@/modules/private/detailPlant';
import PlantList from '@/modules/private/plantList';
import Favorite from '@/modules/private/home/sections/favorite';

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
import Scans from '@/modules/private/scans';
import Notifications from '@/modules/private/notifications';
const AppRoutes: RouteItem[] = [
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
	// {
	// 	path: 'notifications',
	// 	component: Notifications,
	// 	private: true,
	// },
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
	{
		path: 'scan',
		private: true,
		component: Scans,
	},
	{
		path: 'notifications',
		private: true,
		component: Notifications,
	},
];

export default AppRoutes;
