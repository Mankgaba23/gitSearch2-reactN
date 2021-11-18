import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import ResultsNotFound from "./ResultsNotFound";

const repos = ({ navigation, route }) => {
    const { repoURL } = route.params
    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch(repoURL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRepos(data)

            })
            .catch((error) => {
                console.log(error);
            })
            .finally()

    }, [])

    return (
        <View style={styles.container} >
            <Image source={require('../assets/blue.jpg')}
                style={StyleSheet.absoluteFillObject} />
            {repos.length ?
                <View>

                    {
                        repos.map(repo => (
                            <View key={repo.id} style={styles.cardview}>

                                <Text> Repo Name : {repo.name}</Text>
                                <Text> created : {repo.created_at}</Text>
                                <Text> Language: {repo.language}</Text>
                            </View>
                        ))
                    }
                </View>
                : <ResultsNotFound />

            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardview: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 5,
        shadowRadius: 20


    }
});
export default repos
