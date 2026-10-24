import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Orb3D from './components/Orb3D';
import ChatScreen from './screens/ChatScreen';
import { theme } from './constants/theme';

const Stack = createNativeStackNavigator();

function Home({ navigation }: any) {
  return (
    <LinearGradient colors={['#07070f', '#15103a']} style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.orb}>
        <Orb3D />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>LIFEVERSE AI</Text>
        <Text style={styles.sub}>Your intelligent universe, in your pocket.</Text>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.btnText}>Start Exploring</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.bg },
          headerTintColor: theme.text,
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'LIFEVERSE AI' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  orb: { flex: 1.3, marginTop: 40 },
  bottom: { flex: 1, alignItems: 'center', paddingHorizontal: 24 },
  title: { color: theme.text, fontSize: 34, fontWeight: '800', letterSpacing: 3 },
  sub: { color: theme.muted, marginTop: 8, textAlign: 'center' },
  btn: {
    marginTop: 32,
    backgroundColor: theme.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
