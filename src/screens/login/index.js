import React, { useEffect, Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
  ScrollView,
  Alert,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { apple, google, icon } from '@/assets/index';
import { wp,hp } from '@/themes';
import { ButtonComponent, Icon, TextInputIconComponent, iconTypes } from '@/components';
import { NAVIGATION } from '@/constants/navigation';
import { UserController } from '@/controllers';

class LoginClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErr: '',
            password: '',
            passwordErr: '',
            visible: false,
            isLoading: false,
        };
    }

    handleClick = () => {
        const { email, password } = this.state
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let emailValid = false;
        let passwordValid = false

        if(email == '') {
            this.setState({emailErr: 'Email is required'})
            emailValid = false
        } else if(!emailRegex.test(email)) {
            this.setState({emailErr: 'Email is not valid'})
            emailValid = false
        } else {
            this.setState({emailErr: ''});
            emailValid = true
        }

        if(password == '') {
            this.setState({passwordErr: 'Password is required'})
            passwordValid = false
        } else if(!passwordRegex.test(password)) {
            this.setState({passwordErr: 'Password is not valid'})
            passwordValid = false
        } else {
            this.setState({passwordErr: ''});
            passwordValid = true
        }

        if(emailValid && passwordValid) {
            this.login()
        }
    }

    login = () => {
        this.setState({isLoading: true})
        UserController.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            this.setState({isLoading: false})
            if(res.status) {
                this.props.navigation.navigate(NAVIGATION.home)
            } else {
                ToastAndroid.show(res?.message,ToastAndroid.LONG)
            }
        })
    }
    
    render() {
        return(
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                {this.state.isLoading && 
                <View style={{
                    backgroundColor: '#ffffff80',
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5
                }}>
                    <ActivityIndicator size={'large'}/>
                </View>
                }
                <View  style={styles.header}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}/>
                        <Image source={icon} style={{width: wp(35), height: wp(35)}} resizeMode='contain' />
                        <View style={{flex: 1}}/>
                    </View>
                    <View style={{alignSelf: 'center', alignItems: 'center', width: '80%'}}>
                        <Text style={{fontFamily: 'Satoshi-Bold', fontSize: 30, color: '#000', marginVertical: wp(5)}}>Sign In</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Satoshi-Regular', color: '#383838'}}>If You Need Any Support </Text>
                            <TouchableOpacity onPress={() => alert('Support')} >
                                <Text style={{fontFamily: 'Satoshi-Regular',  color: '#AC261B'}}>Click Here</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInputIconComponent
                            placeholder={'Enter Username Or Email'}
                            value={this.state.email}
                            autoCapitalize="none"
                            onChangeText={text => {
                                this.setState({email: text})
                            }}
                            sectionStyle={styles.sectionStyle}
                            errorStyle={{ paddingLeft: wp(4)}}
                            error={this.state.emailErr}
                        />
                        <TextInputIconComponent
                            placeholder={'Enter Password'}
                            value={this.state.password}
                            secureTextEntry={this.state.visible ? false : true}
                            autoCapitalize="none"
                            onChangeText={text => {
                                this.setState({password: text})
                            }}
                            sectionStyle={styles.sectionStyle}
                            hasRightIcon={true}
                            iconRightChildren={
                                <Icon 
                                iconType={iconTypes.Feather}
                                name={this.state.visible? 'eye' : 'eye-off'}
                                size={wp(6)}
                                viewStyle={{marginRight: wp(3)}}
                                onPress={() => this.setState({visible: !this.state.visible})}
                                />
                            }
                            errorStyle={{paddingLeft: wp(4)}}
                            error={this.state.passwordErr}
                        />
                        <TouchableOpacity style={{width: '100%', marginTop: hp(2), paddingLeft: wp(5)}}>
                            <Text style={{fontFamily: 'Satoshi-Medium', fontSize: 14, color: '#383838'}}>Recovery Password</Text>
                        </TouchableOpacity>
                        <ButtonComponent 
                        btnStyle={styles.buttonContainer}  
                        btnTitleStyle={styles.buttontext}
                        btnTitle={'Sign In'}
                        btnOnPress={() => this.handleClick()}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, height: 1, backgroundColor: '#B0B0B0'}} />
                            <Text style={{fontFamily: 'Satoshi-Regular', marginHorizontal: wp(2)}}>Or</Text>
                            <View style={{flex: 1, height: 1, backgroundColor: '#B0B0B0'}} />
                        </View>
                        <View style={styles.iconContainer}>
                            <Image source={google} style={{width: wp(8), height: hp(6)}} resizeMode='contain'/>
                            <Image source={apple} style={{width: wp(8), height: hp(6)}} resizeMode='contain'/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: hp(5)}}>
                            <Text style={{fontFamily: 'Satoshi-Medium', color: '#383838'}}>Not A Member? </Text>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate(NAVIGATION.signup)}} >
                                <Text style={{fontFamily: 'Satoshi-Medium', color: '#288CE9'}}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const Login = (props) => {

    useEffect(() => {
        const backAction = () => {
          Alert.alert(
            'Quit App?',
            'Are you sure you want to exit App?',
            [
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
                {text: 'No', onPress: () => true}
            ],
            {cancelable: true}
          )
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);

    return(
        <LoginClass {...props} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header : {
        flex: 1,
        marginTop: hp(3)
    }, 
    arrowContainer: {
        width: wp(10),
        height: wp(10),
        backgroundColor: 'rgba(0,0,0,0.04)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5),
        borderRadius: wp(10)
    },
    backArrow: {
        width: wp(3)
    },
    logo: {
        width: wp(60),
        height: hp(20)
    },
    sectionStyle: {
        marginTop: wp(4),
        backgroundColor: '#ededed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: wp(0.2),
        color: '#383838',
        fontFamily: 'Satoshi-Medium',
        fontSize: 16,
        paddingVertical: wp(2),
        paddingLeft: wp(3),
        borderColor: '#D9D9D9',
        borderRadius: wp(6)
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: '#AC261B',
        marginTop: hp(3),
        marginBottom: hp(6),
        borderRadius: 25,
        paddingHorizontal: wp(10),
        paddingVertical: wp(4)
    },
    buttontext: {
        fontFamily: 'Satoshi-Bold',
        fontSize: 20,
        color: '#fff'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '40%',
        marginTop: hp(5)
    }
})

export default Login;