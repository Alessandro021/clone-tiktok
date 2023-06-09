import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons/"

import Home from "../pages/home";
import Inbox from "../pages/inbox";
import New from "../pages/new";
import Profile from "../pages/profile";
import Search from "../pages/search";
import ButtonNew from "../components/ButtonNew"

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            
            tabBarStyle: {
                backgroundColor: "#000000",
                borderTopWidth: 0,
            },

            tabBarActiveTintColor: "#FFFFFF"
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({focused, color, size}) => 
                <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            }} />

            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => 
                <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
            }}/>

            <Tab.Screen name="New" component={New} options={{
                tabBarIcon: ({size}) => <ButtonNew size={size}/>
                
            }}/>

            <Tab.Screen name="Inbox" component={Inbox} options={{
                tabBarIcon: ({focused, color, size}) => 
                <Ionicons name={focused ? "ios-chatbubble-ellipses" : "ios-chatbubble-ellipses-outline"} size={size} color={color} />
            }}/>

            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused, color, size}) => 
                <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
            }}/>
        </Tab.Navigator>
    )
}