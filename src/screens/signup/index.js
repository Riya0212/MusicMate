import React, { useEffect, Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { apple, backArrow, google, icon } from '@/assets';
import { wp,hp } from '@/themes';
import { ButtonComponent, Icon, TextInputIconComponent, iconTypes } from '@/components';
import { NAVIGATION } from '@/constants/navigation';
import { UserController } from '@/controllers';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



class SignupClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameErr: '',
            email: '',
            emailErr: '',
            password: '',
            passwordErr: '',
            visible: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        GoogleSignin.configure({webClientId: '488111375762-jim9c3e4r5mfljikej62u6m6jl48mbov.apps.googleusercontent.com', offlineAccess: false});
    }
    
    handleClick = () => {
        const { email, password, name } = this.state
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let emailValid = false;
        let passwordValid = false;
        let namevalid = false;

        if (name == '') {
            this.setState({nameErr: 'Full name is required'})
            namevalid = false
        } else {
            this.setState({nameErr: ''})
            namevalid = true
        }
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

        if(emailValid && passwordValid && namevalid) {
            this.registerUser()
        }
    }


    registerUser = () => {
        this.setState({isLoading: true})
        const {name, email, password} = this.state
        UserController.registerUser(name,email,password)
        .then((res) => {
            this.setState({isLoading: false})
            if(res.status){
                this.props.navigation.navigate(NAVIGATION.home)
            }
        })
        .catch(e => {
            this.setState({isLoading: false})
        })
    }

    onGooglePress = async() => {
        this.setState({isLoading: true})
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
          
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
            // Sign-in the user with the credential
            await UserController.signInWithCredential(googleCredential, true)
            .then((res) => {
                if(res.status){
                    this.setState({isLoading: false})
                    this.props.navigation.navigate(NAVIGATION.home)
                } else {
                    this.setState({isLoading: false})
                    ToastAndroid.show(res.message,ToastAndroid.LONG)
                }
            })           
        } catch (error) {
            this.setState({isLoading: false})
        }
    }

    render() {
        return(
            <View style={styles.container}>
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
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.arrowContainer}>
                                <Image source={backArrow} style={styles.backArrow} resizeMode='contain'/>
                            </TouchableOpacity>
                        </View>
                        <Image source={icon} style={{width: wp(30), height: wp(13)}} resizeMode='contain' />
                        <View style={{backgroundColor: 'yellow', flex: 1}}/>
                    </View>
                    <View style={{alignSelf: 'center', alignItems: 'center', width: '80%', marginTop: hp(3)}}>
                        <Text style={{fontFamily: 'Satoshi-Bold', fontSize: 30, color: '#000', marginVertical: wp(5)}}>Register</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Satoshi-Regular', color: '#383838'}}>If You Need Any Support </Text>
                            <TouchableOpacity>
                                <Text style={{fontFamily: 'Satoshi-Regular',  color: '#AC261B'}}>Click Here</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInputIconComponent
                            placeholder={'Full Name'}
                            value={this.state.name}
                            autoCapitalize="none"
                            onChangeText={text => {
                                this.setState({name: text})
                            }}
                            sectionStyle={[styles.sectionStyle,{marginTop: hp(3)}]}
                            errorStyle={{paddingLeft: wp(4)}}
                            error={this.state.nameErr}
                        />
                        <TextInputIconComponent
                            placeholder={'Enter Email'}
                            value={this.state.email}
                            autoCapitalize="none"
                            onChangeText={text => {
                                this.setState({email: text})
                            }}
                            sectionStyle={styles.sectionStyle}
                            errorStyle={{paddingLeft: wp(4)}}
                            error={this.state.emailErr}
                        />
                        <TextInputIconComponent
                            placeholder={'Password'}
                            value={this.state.password}
                            autoCapitalize="none"
                            secureTextEntry={this.state.visible ? false : true}
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
                        <ButtonComponent 
                        btnStyle={styles.buttonContainer}  
                        btnTitleStyle={styles.buttontext}
                        btnTitle={'Create Account'}
                        btnOnPress={() => this.handleClick()}
                        />
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, height: 1, backgroundColor: '#B0B0B0'}} />
                            <Text style={{fontFamily: 'Satoshi-Regular', marginHorizontal: wp(2)}}>Or</Text>
                            <View style={{flex: 1, height: 1, backgroundColor: '#B0B0B0'}} />
                        </View>
                        <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => this.onGooglePress()}>
                            <Image source={google} style={{width: wp(8), height: hp(6)}} resizeMode='contain'/>
                        </TouchableOpacity>
                            <Image source={apple} style={{width: wp(8), height: hp(6)}} resizeMode='contain'/>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: hp(5)}}>
                            <Text style={{fontFamily: 'Satoshi-Medium', color: '#383838'}}>Do You Have An Account? </Text>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate(NAVIGATION.login)}} >
                                <Text style={{fontFamily: 'Satoshi-Medium', color: '#AC261B'}}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const SignUp = (props) => {

    useEffect(() => {
        const backAction = () => {
          props.navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    return(
        <SignupClass {...props} /> 
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
        width: wp(8),
        height: wp(8),
        backgroundColor: 'rgba(0,0,0,0.04)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5),
        borderRadius: wp(10)
    },
    backArrow: {
        width: wp(2)
    },
    logo: {
        width: wp(60),
        height: hp(20)
    },
    sectionStyle: {
        marginTop: wp(2),
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
        marginTop: hp(4),
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
        marginTop: wp(5)
    }
})

export default SignUp;