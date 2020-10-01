import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Dimensions,
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import 'moment/locale/vi' 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
import LichAm from './lich_am'
export default LichVN = () => {
  var {width, height} = Dimensions.get('window');
  const [date, setDate] = useState(moment(new Date().getTime()).locale('vi').format('dddd  DD/MM/YYYY'));
  useEffect(() => {
    let get_date = moment(new Date().getTime()).format('YYYY-MM-DD');
  });
  return (
    <ImageBackground style={styles.backgroundImage} source={require('./2.jpg')}>
      <View style={{flex: 2, position: 'absolute'}}>
        <CalendarPicker
          onDateChange={(e) => {
            setDate(moment(e).format('dddd  DD/MM/YYYY'))
          }}
          startFromMonday={true}
          todayBackgroundColor="#FF9900"
          selectedDayColor="#CCFFFF"
          textStyle={{
            fontSize: 18,
            color: '#FFFFFF',
          }}
          todayTextStyle={{fontWeight: 'bold'}}
          weekdays={[ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7','CN']}
          months={[
            'Th1',
            'Th2',
            'Th3',
            'Th4',
            'Th5',
            'Th6',
            'Th7',
            'Th8',
            'Th9',
            'Th10',
            'Th11',
            'Th12',
          ]}
        />

        <View
          style={{
            marginTop: 10,
            padding: 10,
            paddingTop: 20,
            paddingBottom: 15,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 10,
            width: width,
            backgroundColor: 'rgba(0, 0, 0, 0.3);',
          }}>
            <View>
            <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'orange',
            }}>
            Dương lịch {date}
          </Text>
            </View>
           
           
        </View>
      </View>
    </ImageBackground>
  );
};
