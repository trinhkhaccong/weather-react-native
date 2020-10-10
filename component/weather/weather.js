import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {UIActivityIndicator} from 'react-native-indicators';
import translate from 'translate-google-api';
import WeatherSevenDay from './list_weather';
import moment from 'moment';
const styles = StyleSheet.create({
  bo_cuc: {
    flex: 2,
    flexDirection: 'row',
    paddingBottom: 30,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },

  tinyLogo_max: {
    width: 15,
    height: 15,
  },
  container: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weather = () => {
  const [data, setData] = useState({});
  const [datasevenday, setDataSevenDay] = useState([]);
  const [checkload, setCheckLoad] = useState(true);
  const [link_image, setLink] = useState(true);
  const [city, setcity] = useState('');
  const [weather, setWeather] = useState('');

  var {width, height} = Dimensions.get('window');
  let res = null;
  let res2 = null;

  useEffect(() => {
    let int_time = parseInt(moment(new Date().getTime()).format('HH'), 10);
    if (int_time > 6 && 18 > int_time) {
      setLink(true);
    } else {
      setLink(false);
    }
    const get_api = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
      }

      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Application wants location Permission',
              message: 'Application wants location Permission',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await Geolocation.getCurrentPosition(
              async (position) => {
                setCheckLoad(true);
                res = await axios({
                  method: 'get',
                  url:
                    'https://openweathermap.org/data/2.5/weather?lat=' +
                    position.coords.latitude.toString() +
                    '&lon=' +
                    position.coords.longitude.toString() +
                    '&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
                });

                res2 = await axios({
                  method: 'get',
                  url:
                    'https://openweathermap.org/data/2.5/onecall?lat=' +
                    position.coords.latitude.toString() +
                    '&lon=' +
                    position.coords.longitude.toString() +
                    '&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
                });

                const result = await translate(res.data.name, {
                  from: 'en',
                  tld: 'com',
                  to: 'vi',
                });

                const result2 = await translate(
                  res.data.weather[0].description,
                  {
                    from: 'en',
                    tld: 'com',
                    to: 'vi',
                  },
                );

                setData(res.data);
                setcity(result[0]);
                setWeather(result2[0]);
                setDataSevenDay(res2.data.daily);
                setCheckLoad(false);
              },
              async (error) => {
                Alert.alert(error.message);
                setCheckLoad(true);
                res = await axios({
                  method: 'get',
                  url:
                    'https://openweathermap.org/data/2.5/weather?lat=10.8333&lon=106.6667&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
                });
                res2 = await axios({
                  method: 'get',
                  url:
                    'https://openweathermap.org/data/2.5/onecall?lat=10.8333&lon=106.6667&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
                });
                const result = await translate(res.data.name, {
                  from: 'en',
                  tld: 'com',
                  to: 'vi',
                });

                const result2 = await translate(
                  res.data.weather[0].description,
                  {
                    from: 'en',
                    tld: 'com',
                    to: 'vi',
                  },
                );

                setData(res.data);
                setcity(result[0]);
                setWeather(result2[0]);
                setDataSevenDay(res2.data.daily);
                setCheckLoad(false);
              }
            );
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      }
    };
    get_api();
  }, [height, width, link_image, res]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={link_image ? require('./3.jpg') : require('./background2.jpg')}>
        <View>
          {checkload && <UIActivityIndicator color="white" size={60} />}
          {!checkload && (
            <View>
              <View style={styles.container}>
                <View
                  style={{
                    padding: 10,
                    paddingTop: 20,
                    paddingBottom: 15,
                    borderColor: 'white',
                    borderWidth: 2,
                    borderRadius: width,
                    height: width - 100,
                    width: width - 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.3);',
                  }}>
                  <Text
                    style={{
                      flex: 0,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('./localtion.png')}
                    />{' '}
                    {city}
                  </Text>
                  <Text
                    style={{
                      flex: 2,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {moment(
                      new Date(data.dt * 1000).toLocaleDateString('vi-VN'),
                    ).format('DD/MM/YYYY')}
                  </Text>

                  <View style={styles.bo_cuc}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        Nhiệt độ
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        {Math.ceil(datasevenday[0].temp.day)}
                        <Image
                          style={styles.tinyLogo_max}
                          source={require('../../image/do_c.png')}
                        />
                      </Text>
                    </View>

                    <View>
                      <Image
                        style={{width: 120, height: 60}}
                        source={{
                          uri:
                            'https://openweathermap.org/img/wn/' +
                            datasevenday[0].weather[0].icon +
                            '@2x.png',
                        }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        Độ ẩm
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'white',
                          textAlign: 'center',
                        }}>
                        {data.main.humidity} %
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: 'bold',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        fontSize: 20,
                        color: '#DDD',
                        textAlign: 'center',
                      }}>
                      Hiện tại{' '}
                    </Text>
                    {Math.ceil(data.main.temp)}
                    <Image
                      style={styles.tinyLogo}
                      source={require('../../image/do_c.png')}
                    />
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'orange',
                      textAlign: 'center',
                    }}>
                    {weather}
                  </Text>
                </View>

                <View
                  style={{
                    width: width,
                  }}
                />
              </View>
              {WeatherSevenDay(datasevenday)}
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
