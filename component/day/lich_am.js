import  React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default  LichAm=(props)=>{
    const [isOnline, setIsOnline] = useState(null);  
    useEffect(() => {    
        function handleStatusChange(status) {      
            setIsOnline(status.isOnline);   
         }    
         ChatAPI.subscribeToFriendStatus(props.string.id, handleStatusChange);    
         return () => {      
             ChatAPI.unsubscribeFromFriendStatus(props.string.id, handleStatusChange);    
            }; 
        });
return (
    <View>
        <Text>
            {
                    props
            }
        
        </Text>
    </View>
)
}