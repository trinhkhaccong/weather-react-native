import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import moment from 'moment';
// import 'moment/locale/en-ca';
const list_thu =[{en:"Monday",vn:"Thứ Hai"},{en:"Tuesday",vn:"Thứ Ba"},{en:"Wednesday",vn:"Thứ Tư"},{en:"Thursday",vn:"Thứ Năm"},{en:"Friday",vn:"Thứ Sáu"},{en:"Saturday",vn:"Thứ Bảy"},{en:"Sunday",vn:"Chủ Nhật"}]
export default function WeatherSevenDay(datasevenday) {
  return (
    <ScrollView style={{flex: 1, color: 'white', textAlign: 'center'}}>
      {datasevenday.map((value, index) => (
        <View
          key={index}
          style={{
            margin: 2,
            borderColor: '#FFF',
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.7); ',
            padding: 10,
          }}>
          <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {
                list_thu.map(value2=>{
                  if(value2.en === moment(new Date(value.dt * 1000)).format('dddd'))
                  {
                    return value2.vn
                  }
                })
                }
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {moment(new Date(value.dt * 1000)).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>
                <Image
                  style={{width: 40, height: 40}}
                  source={{
                    uri:
                      'https://openweathermap.org/img/wn/' +
                      value.weather[0].icon +
                      '@2x.png',
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {Math.ceil(value.temp.day)}/{Math.ceil(value.temp.min)}{' '}
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../image/do_c.png')}
                  />
                </Text>
              </Text>
            </View>
            <View style={{flex: 1, paddingTop: 20, paddingLeft: 10}}>
              <Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  Độ ẩm{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'orange',
                  }}>
                  {value.humidity}%
                </Text>
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
