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
import getTodayString, {
  getDateNow,
  getLunarDate,
  getGioHoangDao,
  checkHolidayLunar,
  checkHolidaySolar,
  getDayName,
} from './lich_am';
import 'moment/locale/vi';

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

export default LichVN = () => {
  var {width, height} = Dimensions.get('window');
  var today = new Date();
  const [date, setDate] = useState(moment(new Date().getTime()));
  const [currentLunarDate, setCurent] = useState(
    getLunarDate(today.getDate(), today.getMonth() + 1, today.getFullYear()),
  );
  useEffect(() => {
    let get_date = moment(new Date().getTime()).format('YYYY-MM-DD');
  });

  const selectdate = (e) => {
    setDate(e);
    setCurent(
      getLunarDate(
        new Date(e).getDate(),
        new Date(e).getMonth() + 1,
        new Date(e).getFullYear(),
      ),
    );
  };
  return (
    <ImageBackground style={styles.backgroundImage} source={require('./2.jpg')}>
      <ScrollView style={{flex: 2}}>
        <CalendarPicker
          onDateChange={(e) => selectdate(e)}
          startFromMonday={true}
          todayBackgroundColor="#FF9900"
          selectedDayColor="#CCFFFF"
          textStyle={{
            fontSize: 18,
            color: '#FFFFFF',
          }}
          todayTextStyle={{fontWeight: 'bold'}}
          weekdays={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
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
            marginBottom: 10,
            padding: 10,
            paddingTop: 20,
            paddingBottom: 15,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 10,
            width: width,
            backgroundColor: 'rgba(0, 0, 0, 0.3);',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'orange',
                  textAlign: 'center',
                }}>
                Dương lịch
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                Tháng {moment(date).format('MM')} Năm{' '}
                {moment(date).format('YYYY')}
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                {moment(date).format('DD')}
              </Text>
            </View>

            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'orange',
                  textAlign: 'center',
                }}>
                Âm lịch
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                {getTodayString(currentLunarDate)}
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                {getDateNow(currentLunarDate)}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              padding: 10,
              paddingTop: 20,
              paddingBottom: 15,
              borderColor: 'orange',
              borderWidth: 2,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6);',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
              {getDayName(currentLunarDate)}
            </Text>

            <View style={{flex: 0, paddingTop: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FF3399',
                  textAlign: 'center',
                }}>
                {checkHolidayLunar(
                  currentLunarDate.day,
                  currentLunarDate.month,
                )}
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FF3399',
                  textAlign: 'center',
                }}>
                {checkHolidaySolar(
                  new Date(date).getDate(),
                  new Date(date).getMonth() + 1,
                )}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
            <View>
              <Text
                style={{
                  padding: 5,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'orange',
                  textAlign: 'center',
                }}>
                Giờ hoàng đạo
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}>
                {getGioHoangDao(currentLunarDate.jd)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
