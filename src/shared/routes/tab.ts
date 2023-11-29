import Home from '@/modules/private/home';
// import { home as HomeIcon, shippingCart, user as UserIcon, shoppingBag } from '@/shared/assets/icons';
import { heartOutline as HeartIcon, scan as ScanIcon, user as UserIcon, camera100 as CameraIcon, cash as CashIcon } from '@/shared/assets/icons-8';
import Cart from '@/modules/private/cart';
import Profile from '@/modules/private/profile';
import Orders from '@/modules/private/orders';
import Scans from '@/modules/private/scans';
import Favourites from '@/modules/private/favourites';
import Camera from '@/modules/private/camera';

export default [
	// {
	// 	id: '1',
	// 	displayName: 'general.home',
	// 	name: 'homeTab',
	// 	icon: HomeIcon,
	// 	component: Home,
	// },
	{
		id: '1',
		displayName: 'general.home',
		name: 'scanTab',
		icon: ScanIcon,
		component: Scans,
	},
	{
		id: '2',
		displayName: 'general.home',
		name: 'favouriteTab',
		icon: HeartIcon,
		component: Favourites,
	},
	{
		id: '3',
		displayName: 'general.profile',
		name: 'camera',
		icon: CameraIcon,
		component: Camera,
	},
	{
		id: '4',
		displayName: 'general.profile',
		name: 'earn',
		icon: CashIcon,
		component: Home,
	},
	{
		id: '5',
		displayName: 'general.profile',
		name: 'profile',
		icon: UserIcon,
		component: Profile,
	},
];
