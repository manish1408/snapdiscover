import React from 'react';
import { View } from 'react-native';

import RoutesTab from '@/shared/routes/TabRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { semantic } from '@/shared/constants/colors';
import useDarkMode from '@/shared/hooks/useDarkMode';
import { normalize } from '@/shared/helpers';
import Icon from '../components/icon';

const Tab = createBottomTabNavigator();
function TabNavigation() {
	const { isDarkMode } = useDarkMode();
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			{RoutesTab.map((route) => (
				<Tab.Screen
					key={route.name}
					name={route.name}
					component={route.component}
					options={{
						tabBarStyle: {
							backgroundColor: isDarkMode ? semantic.background.dark.d500 : semantic.background.white.w500,
						},
						tabBarIcon: ({ focused }) => {
							// const iconStyle =
							// 	route.name === 'camera'
							// 		? { tintColor: focused ? palette.main.p500 : semantic.text.grey, width: 30, height: 30 }
							// 		: { tintColor: focused ? palette.main.p500 : semantic.text.grey };
							const iconStyle = route.name === 'camera' ? { width: 30, height: 30 } : {};
							const wrapStyle =
								route.name === 'camera'
									? {
											borderRadius: 100,
											borderWidth: 1,
											borderColor: semantic.fill.f04,
											height: 70,
											width: 70,
											alignItems: 'center',
											backgroundColor: semantic.fill.f04,
											alignSelf: 'center',
											justifyContent: 'center',
											padding: normalize(20),
											marginBottom: normalize(30),
									  }
									: {};

							return (
								<View style={wrapStyle}>
									<Icon customStyles={iconStyle} icon={focused ? route.activeIcon : route.icon} />
								</View>
							);
						},
						tabBarLabel: ({ focused }) => {
							return null;
						},
					}}
				/>
			))}
		</Tab.Navigator>
	);
}

export default TabNavigation;
