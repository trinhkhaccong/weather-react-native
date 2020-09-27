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
import GetLocation from 'react-native-get-location'
import {
  UIActivityIndicator,
} from 'react-native-indicators';
var moment  = require("moment")

const styles = StyleSheet.create({
  bo_cuc: {
    flex: 2,
    flexDirection: 'row',
    paddingBottom:30
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
  }
});
export default Weather = () => {
  const [data, setData] = useState({});
  const [datasevenday, setDataSevenDay] = useState([]);
  const [checkload, setCheckLoad] = useState(true);
  const [lat,setLat]=useState(21.02)
  const [lon,setLon]=useState(105.84)
  var {width, height} = Dimensions.get('window');

 
  useEffect(() => {
    const get_api = async () => {
      setCheckLoad(true);
      let res =null
      let res2 = null
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(async(location)=> {
      res = await axios({
        method: 'get',
        url:
          "https://openweathermap.org/data/2.5/weather?lat="+(location.latitude).toString()+"&lon="+(location.longitude).toString()+"&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric&lang=vi",
      });
      res2 =await axios({
        method: 'get',
        url:
          "https://openweathermap.org/data/2.5/onecall?lat="+(location.latitude).toString()+"&lon="+(location.longitude).toString()+"&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02",
      });
      await setData(res.data);
      await setDataSevenDay(res2.data.daily);
      await setCheckLoad(false);
    })
    .catch(async(error)=> {
      res =await  axios({
        method: 'get',
        url:
          "https://openweathermap.org/data/2.5/weather?lat=21.02&lon=105.84&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric&lang=vi",
      });
      res2 =await axios({
        method: 'get',
        url:
          "https://openweathermap.org/data/2.5/onecall?lat=21.02&lon=105.84&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02",
      });
      await setData(res.data);
    await setDataSevenDay(res2.data.daily);
    await setCheckLoad(false);
    })
    
    };
    get_api();
  },[height,width]);
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./3.jpg')}>
        <View>
          {checkload && (
            <UIActivityIndicator color='white' size={60}/>
          )}
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
                    {moment(new Date(data.dt* 1000).toLocaleDateString("vi-VN")).format('DD/MM/YYYY')}
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
                        {Math.ceil(data.main.feels_like)}
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
                            data.weather[0].icon +
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
                        padding:5,
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
                    <Text   style={{
                        fontSize: 16,
                        color: 'orange',
                        textAlign: 'center'
                      }}>{data.weather[0].description}</Text>
                </View>

                <View
                  style={{
                    borderBottomColor: 'bule',
                    borderBottomWidth: 1,
                    width: width,
                  }}
                />
              </View>
              <ScrollView
                style={{flex: 1, color: 'white', textAlign: 'center'}}>
                {datasevenday.map((value,index) => (
                  <View
                  key ={index}
                    style={{
                      margin: 2,
                      borderColor: '#FFF',
                      borderWidth: 1,
                      borderRadius: 15,
                      backgroundColor: 'rgba(0, 0, 0, 0.8); ',
                      padding:10
                    }}>
                    <View>
                      <Text style={{paddingLeft:15}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#FFF',
                        }}>
                         {moment(new Date(value.dt* 1000).toLocaleDateString("vi-VN")).locale("vi").format('dddd                    DD/MM/YYYY')}
                      </Text>
                      </Text>
                    
                    </View>

                    <View >
                      <Text>
                        <Text>
                          <Image
                            style={{width: 65, height: 40}}
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
                          <Text>            </Text>
                          <Text  style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: '#FFF',
                            }}>Độ ẩm </Text>
                          <Text  style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: '#FFF',
                            }}>{value.humidity}%</Text>
                        </Text>
                      </Text>
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
