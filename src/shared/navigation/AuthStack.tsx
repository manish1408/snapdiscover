import AuthRoutes from '../routes/AuthRoutes';
import { RootStackParamList, RouteItem } from '../interfaces/route-types';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();

function AuthStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={'welcome'} screenOptions={{ headerShown: false }}>
				{AuthRoutes.map((route) => {
					return <Stack.Screen key={route.path} name={route.path} component={route.component} />;
				})}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AuthStack;
