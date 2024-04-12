import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import RegistrarScreen from './components/RegistrarScreen';
import ReminderScreen from './components/ReminderScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activities, setActivities] = useState([]);

    // Método para agregar una nueva actividad
    const handleAddActivity = (newActivity) => {
        setActivities([...activities, newActivity]);
    };

    // Método para editar una actividad existente
    const handleEditActivity = (editedActivity) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === editedActivity.id ? editedActivity : activity
        );
        setActivities(updatedActivities);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const DrawerNavigator = () => (
        <Drawer.Navigator initialRouteName="Reminder">
            <Drawer.Screen name="Registrar">
                {() => <RegistrarScreen onActivitySubmit={handleAddActivity} />}
            </Drawer.Screen>
            <Drawer.Screen name="Actividades">
                {() => (
                    <ReminderScreen
                        activities={activities}
                        onEditActivity={handleEditActivity}
                    />
                )}
            </Drawer.Screen>
            <Drawer.Screen name="Cerrar sesión" options={{ unmountOnBlur: true }}>
                {() => {
                    handleLogout();
                    return null; 
                }}
            </Drawer.Screen>
        </Drawer.Navigator>
    );

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <DrawerNavigator />
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        initialParams={{ onLogin: handleLogin }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default App;

