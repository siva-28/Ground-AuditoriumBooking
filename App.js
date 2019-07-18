import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator, ListView, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
class App extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };
  onpress = () => {
    this.props.navigation.navigate('grounds')
  }
  onpress1 = () => {
    this.props.navigation.navigate('audi')
  }

  render() {
    const { Buttontext, Touch } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TouchableOpacity style={Touch} onPress={this.onpress}>
          <Text style={Buttontext}>GROUNDS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch} onPress={this.onpress1}>
          <Text style={Buttontext}>AUDITORIUMS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class grounds extends Component {
  static navigationOptions = {
    title: 'Grounds',
  };
  onpress1 = () => {
    this.props.navigation.navigate('cricket')
  }
  onpress2 = () => {
    this.props.navigation.navigate('football')
  }
  onpress3 = () => {
    this.props.navigation.navigate('tennis')
  }
  onpress4 = () => {
    this.props.navigation.navigate('basketball')
  }
  onpress5 = () => {
    this.props.navigation.navigate('volley')
  }
  onpress6 = () => {
    this.props.navigation.navigate('hockey')
  }
  render() {
    const { Buttontext, Touch } = styles

    return (
      <View style={{ flex: 1, backgroundColor: '#e6f7ff', alignItems: "center" }}>
        <TouchableOpacity style={Touch}
          onPress={this.onpress1}
        >
          <Text style={Buttontext}>cricket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch}
          onPress={this.onpress2}
        >
          <Text style={Buttontext}>football</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch}
          onPress={this.onpress3}
        >
          <Text style={Buttontext}>Tennis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch}
          onPress={this.onpress4}
        >
          <Text style={Buttontext}>BasketBall</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch}
          onPress={this.onpress5}
        >
          <Text style={Buttontext}>VolleyBall</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch}
          onPress={this.onpress6}
        >
          <Text style={Buttontext}>Hockey</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class audi extends Component {
  static navigationOptions = {
    title: 'Auditoriums',
  };
  onpress1 = () => {
    this.props.navigation.navigate('vivek')
  }
  onpress2 = () => {
    this.props.navigation.navigate('adalove')
  }
  onpress3 = () => {
    this.props.navigation.navigate('turing')
  }
  render() {
    const { Buttontext, Touch } = styles
    return (
      <View style={{ flex: 1, backgroundColor: '#e6f7ff', alignItems: "center", justifyContent: 'center' }}>
        <TouchableOpacity style={Touch} onPress={this.onpress1}>
          <Text style={Buttontext}>Vivekananda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch} onPress={this.onpress2}>
          <Text style={Buttontext}>AdaLovelace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Touch} onPress={this.onpress3}>
          <Text style={Buttontext}>Turing</Text>
        </TouchableOpacity>
      </View>);
  }
}
class vivek extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: '',
      roll: '',
      hours: '',
      dataSource:[]
    }
  }
  componentWillMount() {
    const url = 'http://192.168.225.179:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  showpick = () => {
    this.setState({
      isVisible: true
    })
  }
  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  onpress = () => {
    this.props.navigation.navigate('vs');
  }
  book = () => {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    //console.log(dataa);
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "VivekAudi",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'VivekAudi',
  };
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <Text>{this.state.date}</Text>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="HourstoBook"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>Time</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class vs extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "VivekAudi") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class adalove extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: '',
      roll: '',
      hours: ''
    }
  }
  showpick = () => {
    this.setState({
      isVisible: true
    })
  }
  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  onpress = () => {
    this.props.navigation.navigate('as');
  }
  book = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "AdaLovelace",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'AdaLovelace',
  };
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>

        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="HourstoBook"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>Time</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class as extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "AdaLovelace") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class turing extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: '',
      roll: '',
      hours: ''
    }
  }
  showpick = () => {
    this.setState({
      isVisible: true
    })
  }
  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  onpress = () => {
    this.props.navigation.navigate('ts');
  }
  book = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Turing",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Turing',
  };
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <Text>{this.state.date}</Text>

        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />

        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="HourstoBook"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>Time</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class ts extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Turing") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class cricket extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: '',
      roll: '',
      hours: ''
    }
  }
  showpick = () => {
    this.setState({
      isVisible: true
    })
  }
  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  onpress = () => {
    this.props.navigation.navigate('cstatus');
  }
  book = () => {
    console.log(date);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Cricket",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Cricket',
  };
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <Text>{this.state.date}</Text>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class cstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Cricket") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
  const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class football extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: ''
    }
  }

  showpick = () => {
    this.setState({
      isVisible: true
    })
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,

    })
  }
  book = () => {
    console.log("hii");
    console.log(this.state.roll);
    //console.log(body);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Football",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Football',
  };
  onpress = () => {
    this.props.navigation.navigate('fstatus')
  }

  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class fstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Football") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    console.log("status");
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class tennis extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: ''
    }
  }

  showpick = () => {
    this.setState({
      isVisible: true
    })
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,

    })
  }
  book = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.12.232:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Tennis",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Tennis',
  };
  onpress = () => {
    this.props.navigation.navigate('tstatus')
  }

  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class tstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Tennis") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>--------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class basketball extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: ''
    }
  }

  showpick = () => {
    this.setState({
      isVisible: true
    })
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,

    })
  }
  book = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Basketball",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Basketball',
  };
  onpress = () => {
    this.props.navigation.navigate('bstatus')
  }
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class bstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Basketball") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class volley extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: ''
    }
  }

  showpick = () => {
    this.setState({
      isVisible: true
    })
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,

    })
  }
  book = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Volleyball",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Volleyball',
  };
  onpress = () => {
    this.props.navigation.navigate('vstatus')
  }
  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class vstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Volleyball") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

class hockey extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
      chosen: ''
    }
  }
  showpick = () => {
    this.setState({
      isVisible: true
    })
  }
  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosen: moment(datetime).format('MMMM, Do YYYY HH:mm')
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false,
    })
  }
  book = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
    fetch("http://192.168.43.62:3000/api/grounds", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "game": "Hockey",
        "roll": this.state.roll,
        "time": this.state.chosen,
        "hour": this.state.hours,
        "currenttime": this.state.date
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }
  static navigationOptions = {
    title: 'Hockey',
  };
  onpress = () => {
    this.props.navigation.navigate('hstatus')
  }

  render() {
    const { Buttontext, Touch, Touch1 } = styles

    return (
      <View style={{ backgroundColor: '#e6f7ff', flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Rollnumber"
          onChangeText={text => this.setState({ roll: text })} />
        <TextInput underlineColorAndroid="transparent" style={Touch}
          placeholder="Hoursofplay"
          onChangeText={text => this.setState({ hours: text })} />

        <TouchableOpacity style={Touch} onPress={this.showpick}>
          <Text style={Buttontext}>playtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch} onPress={this.book}>
          <Text style={Buttontext}>BOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Touch1} onPress={this.onpress}>
          <Text style={Buttontext}>Status</Text>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={'datetime'}
        />
      </View>
    );
  }
}
class hstatus extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    const { MainContainer, textViewContainer } = styles
    if (item.game == "Hockey") {
      return (
        <View >
          <Text style={textViewContainer}>{'Booked On : ' + item.currenttime}</Text>
          <Text style={textViewContainer}>{'Roll Number : ' + item.roll}</Text>
          <Text style={textViewContainer}>{'Time of play : ' + item.time}</Text>
          <Text style={textViewContainer}>{'Hours of play : ' + item.hour}</Text>
          <Text>------------------------------------------</Text>
        </View>)
    }
  }
  componentWillMount() {
    const url = 'http://192.168.43.62:3000/api/grounds';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }
  render() {
    const { MainContainer, textViewContainer } = styles
    return (
      <View style={MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}


const MainNavigator = createStackNavigator({
  //SplashPage:{screen:SplashPage},
  App: { screen: App },
  grounds: { screen: grounds },
  audi: { screen: audi },
  vivek: { screen: vivek },
  vs: { screen: vs },
  adalove: { screen: adalove },
  as: { screen: as },
  turing: { screen: turing },
  ts: { screen: ts },
  cricket: { screen: cricket },
  football: { screen: football },
  tennis: { screen: tennis },
  basketball: { screen: basketball },
  volley: { screen: volley },
  hockey: { screen: hockey },
  cstatus: { screen: cstatus },
  fstatus: { screen: fstatus },
  tstatus: { screen: tstatus },
  bstatus: { screen: bstatus },
  vstatus: { screen: vstatus },
  hstatus: { screen: hstatus },
});//,{initialRouteName: 'SplashPage'});

const App1 = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
  Touch: {
    backgroundColor: '#2980b9',
    width: '40%',
    marginHorizontal: 100,
    marginVertical: 20,
    borderRadius: 25,
    padding: 10,
  },
  Touch1: {
    backgroundColor: '#aa80ff',
    width: '40%',
    marginHorizontal: 100,
    marginVertical: 20,
    borderRadius: 25,
    padding: 10,
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#00BCD4',
    padding: 5,
  },
  textViewContainer: {
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 20,
    color: '#fff',
  },
  heading: {
    fontSize: 25,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#2980b9',
    width: '30%',
    marginHorizontal: 80,
    marginVertical: 20,
    borderRadius: 25,
    padding: 10
  },
  parent: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#65ACEA',
    justifyContent: 'center'
  },
  Buttoncontainer: {
    backgroundColor: '#2980b9',
    width: '30%',
    marginHorizontal: 80,
    marginVertical: 20,
    borderRadius: 25,
    padding: 10
  },
  Buttontext: {
    textAlign: 'center',
    color: '#FFFF'
  }
})

export default App1

