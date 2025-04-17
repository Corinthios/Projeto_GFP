import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Estilos.js';

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo2.png')} style={styles.logoImagem} />

            <Text style={styles.titulo}>Login</Text>

            <TouchableOpacity 
                style={styles.botao} 
                onPress={() => navigation.navigate('Principal')}>
                <Text style={styles.botaoTexto}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
