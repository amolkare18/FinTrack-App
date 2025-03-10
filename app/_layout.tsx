// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
// import 'react-native-reanimated';
import { Appearance ,ImageBackground} from 'react-native';
import { Colors } from '@/constants/Colors';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
      <Stack screenOptions={{headerStyle:{backgroundColor:theme.background},headerShadowVisible:false}}>
      <Stack.Screen name="index" options={{ headerShown: false,headerStyle: { backgroundColor: "#4CAF50" }, // Change top bar color
    headerTintColor: "white", }} />
      <Stack.Screen name="history" options={{ headerShown: true ,headerStyle: { backgroundColor: "#4CAF50" }, // Change top bar color
    headerTintColor: "white",}} />
      <Stack.Screen name="addExpense" options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#4CAF50" }, // Change top bar color
    headerTintColor: "white",
       }} />
         {/* <Stack.Screen name="(coffee)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      
    
  );
}
