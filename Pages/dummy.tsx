/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    useState,
    useEffect,
    use,
} from 'react'

import {
    View,
    Text,
    Button,
    TextInput,
    FlatList,
    ScrollView,
    StyleSheet,
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { url } from 'inspector'

export function Dummy() {
    const [input,setInput] = useState("")
    const [data,setData] = useState([])
    const [loader,setLoader] = useState(false)
    const URL = ``

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(URL)
                const data = await res.json()
                setData([])
            }
            catch(error) {
                console.error(error)
            }
        }
        getData()
    },[])

    if (!loader) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    else {
        return (
            <View>
                <Text>hello</Text>
                <Button 
                    title="Press Me"
                />
                <TextInput
                    placeholder='Enter data'
                    value={input}
                    onChangeText={setInput}
                />
                {
                    data.length > 0 ? (
                        data.map((obj,idx) => (
                            <View key={idx}>
                                
                            </View>
                        ))
                    ) : (
                        <View>
                            <Text>Didn't recieve any data form API</Text>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
})