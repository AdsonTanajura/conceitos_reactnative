import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import api from "./services/api";

export default function app() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `New Project ${Date.now()}`,
            owner: 'User Name'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }


    return (
        <>
            <StatusBar translucent={false} backgroundColor={'#7159c1'} />
            
            <SafeAreaView style={styles.container}>
            <FlatList
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item }) => (
                    <Text style={styles.project}>{item.title}</Text>
                )} 
            />

            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.button} 
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>


            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
       // justifyContent: 'center',
       // alignItems: 'center'       
    },

    project: {
        color: '#FFF',
        fontSize: 25    ,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
        
    },
});