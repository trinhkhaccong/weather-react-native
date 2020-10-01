import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import {UIActivityIndicator} from 'react-native-indicators';
import moment from 'moment';
import 'moment/locale/en-ca'

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
  const [link_image,setLink] =useState(true)
  var {width, height} = Dimensions.get('window');
  let res = null;
  let res2 = null;
  useEffect(() => {
    let int_time = parseInt(moment(new Date().getTime()).format("HH"),10)
      if( (int_time> 6) && (13 > int_time))
      {
        setLink(true)
      }
      else
      {
        setLink(false)
      }
    const get_api = async () => {
      
      setCheckLoad(true)
      
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(async (location) => {
          res = await axios({
            method: 'get',
            url:
              'https://openweathermap.org/data/2.5/weather?lat=' +
              location.latitude.toString() +
              '&lon=' +
              location.longitude.toString() +
              '&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric&lang=vi',
          });
          res2 = await axios({
            method: 'get',
            url:
              'https://openweathermap.org/data/2.5/onecall?lat=' +
              location.latitude.toString() +
              '&lon=' +
              location.longitude.toString() +
              '&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
          });
          await setData(res.data);
          await setDataSevenDay(res2.data.daily);
          await setCheckLoad(false);
        })
        .catch(async (error) => {
          res = await axios({
            method: 'get',
            url:
              'https://openweathermap.org/data/2.5/weather?lat=21.02&lon=105.84&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric&lang=vi',
          });
          res2 = await axios({
            method: 'get',
            url:
              'https://openweathermap.org/data/2.5/onecall?lat=21.02&lon=105.84&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02',
          });
          await setData(res.data);
          await setDataSevenDay(res2.data.daily);
          await setCheckLoad(false);
        });
    };
    get_api();
  }, [height, width,link_image,res]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={link_image?require('./3.jpg'):require('./background2.jpg')}>
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
                    {data.name}
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
                    {data.weather[0].description}
                  </Text>
                </View>

                <View
                  style={{     
                    width: width,
                  }}
                />
              </View>
              <ScrollView
                style={{flex: 1, color: 'white', textAlign: 'center'}}>
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
                    <View
                      style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#FFF',
                          }}>
                          {moment(
                            new Date(value.dt * 1000).toLocaleDateString(
                              'vi-VN',
                            ),
                          ).locale('EN')
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
                          {moment(new Date(value.dt * 1000)).format(
                            'DD/MM/YYYY',
                          )}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1,}}>
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
                            {Math.ceil(value.temp.day)}/
                            {Math.ceil(value.temp.min)}{' '}
                            <Image
                              style={{width: 20, height: 20}}
                              source={require('../../image/do_c.png')}
                            />
                          </Text>
                        </Text>
                      </View>
                      <View style={{ flex: 1,paddingTop:20,paddingLeft:10}}>
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
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};
