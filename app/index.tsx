import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});


// import { Stack } from 'expo-router';
// import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';
// import HomeScreen from './screens/HomeScreen';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// const Stack = createStackNavigator();

// export default function Page() {
//   const colorScheme = useColorScheme();

//   return (
//     // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack.Navigator initialRouteName='Home' >
//         <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
//         {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
//       </Stack.Navigator>
//       // <StatusBar style="auto" />
//     // </ThemeProvider>
//   );
// }




