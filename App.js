import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8vXJUgbiPI8v93rerx31jkHU8Q_4R5mU",
  authDomain: "temperaturaambiente-97f8b.firebaseapp.com",
  databaseURL: "https://temperaturaambiente-97f8b-default-rtdb.firebaseio.com",
  projectId: "temperaturaambiente-97f8b",
  storageBucket: "temperaturaambiente-97f8b.appspot.com",
  messagingSenderId: "6813849236",
  appId: "1:6813849236:web:30947b8d5aff452e414681"
};

export default function App() {
  
  const [temperatura, setTemperatura] = useState("0")  

  useLayoutEffect(() => {
    try {
      const app = initializeApp(firebaseConfig)
      const database = getDatabase();

      onValue(ref(database, '/temp/'), (snapshot) => {
        if (snapshot.exists()) {
          var temp = snapshot.val();
          setTemperatura(temp)
        };
      })

    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.textMinor}>Agora fazem</Text>
      <Text style={styles.textTemperature}>{temperatura}°</Text>
      <Text style={styles.textMinor}>Graus</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34a1eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMinor: {
    fontSize: 50
  },
  textTemperature: {
    fontSize: 70,
    fontWeight: "bold"
  }
});
