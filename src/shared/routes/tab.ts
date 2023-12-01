import Home from '@/modules/private/home';
// import { home as HomeIcon, shippingCart, user as UserIcon, shoppingBag } from '@/shared/assets/icons';
import {
	heart as HeartIcon,
	scan as ScanIcon,
	user as UserIcon,
	camera100 as CameraIcon,
	cash as CashIcon,
	scanFilled,
	heartFilled,
	camera100Filled,
	cashFilled,
	userFIlled,
} from '@/shared/assets/icons-8';
import Cart from '@/modules/private/cart';
import Profile from '@/modules/private/profile';
import Orders from '@/modules/private/orders';
import Scans from '@/modules/private/scans';
import Favourites from '@/modules/private/favourites';
import Camera from '@/modules/private/camera';
import Earn from '@/modules/private/earn';

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
		activeIcon: scanFilled,
		component: Scans,
	},
	{
		id: '2',
		displayName: 'general.home',
		name: 'favouriteTab',
		icon: HeartIcon,
		activeIcon: heartFilled,
		component: Favourites,
	},
	{
		id: '3',
		displayName: 'general.profile',
		name: 'camera',
		icon: CameraIcon,
		activeIcon: camera100Filled,
		component: Camera,
	},
	{
		id: '4',
		displayName: 'general.profile',
		name: 'earn',
		icon: CashIcon,
		activeIcon: cashFilled,
		component: Earn,
		// component: Home,
	},
	{
		id: '5',
		displayName: 'general.profile',
		name: 'profile',
		icon: UserIcon,
		activeIcon: userFIlled,
		component: Profile,
	},
];
