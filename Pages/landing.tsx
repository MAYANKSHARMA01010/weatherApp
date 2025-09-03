import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Button,
    Image,
    ToastAndroid,
} from "react-native";
import { useState, useEffect } from "react";

export default function Landing() {
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const API_KEY = process.env.WEATHER_API_KEY || "86d5a676f1124ee98f623830250309";

    useEffect(() => {
        if (searchTerm === "") {
            setWeatherData(null);
        }
        if (!searchTerm) return;
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchTerm}&aqi=no`
                );
                const json = await response.json();
                setWeatherData(json);
            } 
            catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchData();
    }, [searchTerm, API_KEY]);

    function handlePress() {
        if (searchTerm === "") {
            ToastAndroid.show("Please enter a location", ToastAndroid.SHORT);
            setWeatherData(null);
            return;
        }
        // Will trigger useEffect because searchTerm changes
        setWeatherData(weatherData);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Landing Page</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Search location"
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
            />

            <Button title="Search" onPress={handlePress} />

            {
                weatherData && weatherData.location && (
                    <View style={styles.card}>
                        <Text style={styles.city}>{weatherData.location.name}</Text>
                        <Text style={styles.temp}>{weatherData.current.temp_c}°C</Text>
                        <Text>{weatherData.current.condition.text}</Text>
                        <Image 
                            source={{ uri: "https:" + weatherData.current.condition.icon }}
                            style={{ width: 64, height: 64 }}
                        />
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 }, 
    text: { fontSize: 20, fontWeight: "600" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginTop: 16,
    },
    card: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
    },
    city: { fontSize: 22, fontWeight: "700" },
    temp: { fontSize: 18, marginVertical: 8 },
});
