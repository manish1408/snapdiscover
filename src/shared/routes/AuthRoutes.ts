import { RouteItem } from '../interfaces/route-types';
import Login from '@/modules/auth/login';
import CreateAccount from '@/modules/auth/createAccount';
import EnterOtp from '@/modules/auth/enterOtp';
import EnterNewPassword from '@/modules/auth/enterNewPassword';
import ForgotPassword from '@/modules/auth/forgotPassword';
import Welcome from '@/modules/auth/welcome';
const AuthRoutes: RouteItem[] = [
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
];

export default AuthRoutes;
