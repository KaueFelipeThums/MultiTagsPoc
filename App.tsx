/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  NativeModules,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// IMPORTANTE: Para acessar a integradora definida no build.gradle
// Descomente a linha abaixo quando precisar usar ADMINISTRATOR em tempo de execução
// const ADMINISTRATOR = NativeModules.SettingsManager?.settings?.ADMINISTRATOR || 'REDE';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  // Exemplo: Se precisar exibir a integradora na tela
  // const integradora = ADMINISTRATOR;

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
      {/* Exemplo de como exibir a integradora (descomente se necessário)
      <View style={styles.administratorInfo}>
        <Text style={styles.administratorText}>
          Integradora: {integradora}
        </Text>
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  administratorInfo: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  administratorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
