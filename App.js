// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import React, {useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Weather from './component/weather/weather';
import LichVN from './component/day/lich_vn';
import Notify from './component/notify/notify_setting';
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default function App() {
  const [selectedTab, setSelectTab] = useState('Weather');
  return (
    <TabNavigator tabBarStyle={{height:55}}>
      <TabNavigator.Item
        selected={selectedTab === 'Weather'}
        title="Weather"
        renderIcon={() => (
          <Image style={styles.tinyLogo} source={require('./image/weather.png')} />
        )}
        renderSelectedIcon={() => (
          <Image style={styles.tinyLogo} source={require('./image/weather_color.png')} />
        )}
        onPress={() => setSelectTab('Weather')}>
        <Weather />
      </TabNavigator.Item>

      <TabNavigator.Item
        selected={selectedTab === 'Date'}
        title="Date"
        renderIcon={() => <Image  style={styles.tinyLogo} source={require('./image/date.png')} />}
        renderSelectedIcon={() => <Image style={styles.tinyLogo}  source={require('./image/date_color.png')} />}
        onPress={() => setSelectTab('Date')}>
        <LichVN />
      </TabNavigator.Item>

      <TabNavigator.Item
        selected={selectedTab === 'Notify'}
        title="Notify"
        renderIcon={() => <Image style={styles.tinyLogo} source={require('./image/notify.png')} />}
        renderSelectedIcon={() => <Image style={styles.tinyLogo} source={require('./image/notify_color.png')} />}
        onPress={() => setSelectTab('Notify')}>
        <Notify />
      </TabNavigator.Item>
    </TabNavigator>
  );
}
