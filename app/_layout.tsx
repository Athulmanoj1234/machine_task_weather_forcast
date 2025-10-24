import { useColorScheme } from '@/hooks/use-color-scheme';
import { createStackNavigator } from '@react-navigation/stack';
// import { Stack } from 'expo-router';
import 'react-native-reanimated';
import HomeScreen from './screens/HomeScreen';


export const unstable_settings = {
  anchor: '(tabs)',
};

const Stack = createStackNavigator();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //   <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    // </Stack>

    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
    </Stack.Navigator>

    // <StatusBar style="auto" />
    // </ThemeProvider>
  );
}
