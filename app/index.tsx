import {
  StyleSheet, 
  View,
} from "react-native";
import Landing from "../Pages/landing";

export default function Page() {
  return (
    <View style={styles.container}>
      <Landing />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 24, 
  }, 
});
