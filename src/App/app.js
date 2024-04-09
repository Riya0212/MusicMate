import { StyleSheet, View } from "react-native";
import DateRangePicker from "./DateRangePicker";
import { useState } from "react";
import {format} from 'date-fns'
const App = () => {
  const [state, setState] = useState({
    current: new Date()
  })
  return (
    <View style={styles.container}>
    <DateRangePicker
      initialRange={[format(state.current,'yyyy-MM-dd'), '2018-04-10']}
      onSuccess={(s, e) => alert(s + '||' + e)}
      theme={{ markColor: 'red', markTextColor: 'white' }}/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
export default App;
