import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/en-ca';

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
                {moment(new Date(value.dt * 1000).toLocaleDateString('vi-VN'))
                  .locale('EN')
                  .format('dddd')}
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
