import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import ResultsNotFound from "./ResultsNotFound";



const searchUser = ({navigation}) => {


    const API_URL = "https://api.github.com/search/users?q="
    const [userName, setUserName] = useState("")
    const [profiles, setProfiles] = useState([])
    const [count, setCount] = useState()

    const search = () => {
        fetch(API_URL + userName)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProfiles(data.items)
                setCount(data.total_count)
            })
            .catch((error) => {
                console.log(error);
            })
            .finally()
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/background.jpg')}
                style={StyleSheet.absoluteFillObject}
                //blurRadius={200}
            />

            <View style={styles.searchCard}>
                <TextInput style={styles.input} placeholder={"User Name"} onChangeText={(e) => setUserName(e)} />
                <View style={{ justifyContent:'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => search()}>
                        <Text style={styles.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {profiles.length ?
                    <View>
                        <View style={styles.searchCard}>
                            <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>{count} Results found</Text>
                        </View>

                        {profiles.map(user => (
                            <View key={user.id} style={styles.cardview}>
                                <Image style={{
                                    width:70,height:70,borderRadius:50,marginRight:10
                                }}
                                source= {{uri:user.avatar_url}}
                                />
                                <View>
                                    <Text style={{ fontSize:13,fontWeight:'700',color:'black' }}>
                                        {user.login}
                                    </Text>
                                    <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('repos' , {repoURL :user.repos_url})}> 
                                        <Text style={{color:'white'}}>View Repo</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))
                        }
                    </View>
                    :
                    <ResultsNotFound/>
                }

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    searchCard: {
        flexDirection:'row',
        padding: 20,
        marginBottom: 10,
        margin: 10,
        borderRadius: 12,
        backgroundColorwhite: 'white',

    },
    input: {
        paddingVertical: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        width: 270
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 4,
        backgroundColor: 'black'

    },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'pink'

    },
    cardview: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity:5,
        shadowRadius:20


    }
});
export default searchUser