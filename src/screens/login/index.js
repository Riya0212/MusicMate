import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
  ScrollView
} from 'react-native';
import { apple, google, icon } from '@/assets/index';
import { wp,hp } from '@/themes';
import { ButtonComponent, TextInputIconComponent } from '@/components';
import { NAVIGATION } from '@/constants/navigation';


function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        const backAction = () => {
          navigation.goBack()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    
    
    return(
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
            <View  style={styles.header}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <Image source={icon} style={{width: wp(35), height: hp(8)}} resizeMode='contain' />
                    <View style={{flex: 1}}/>
                </View>
                <View style={{alignSelf: 'center', alignItems: 'center', width: '80%', marginTop: hp(5)}}>
                    <Text style={{fontFamily: 'Satoshi-Bold', fontSize: 30, color: '#000', marginVertical: wp(5)}}>Sign In</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Satoshi-Regular', color: '#383838'}}>If You Need Any Support </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION.register)} >
                            <Text style={{fontFamily: 'Satoshi-Regular',  color: '#38B432'}}>Click Here</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInputIconComponent
                        placeholder={'Enter Username Or Email'}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={text => {
                        setEmail(text)
                        }}
                        sectionStyle={styles.sectionStyle}
                    />
                    <TextInputIconComponent
                        placeholder={'Enter Password'}
                        value={password}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={text => {
                        setPassword(text)
                        }}
                        sectionStyle={styles.sectionStyle}
                    />
                    <TouchableOpacity style={{width: '100%', marginTop: hp(3), paddingLeft: wp(5)}}>
                        <Text style={{fontFamily: 'Satoshi-Medium', fontSize: 14, color: '#383838'}}>Recovery Password</Text>
                    </TouchableOpacity>
                    <ButtonComponent 
                    btnStyle={styles.buttonContainer}  
                    btnTitleStyle={styles.buttontext}
                    btnTitle={'Sign In'}
                    btnOnPress={() => navigation.navigate(NAVIGATION.home)}
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
                        <TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION.register)}} >
                            <Text style={{fontFamily: 'Satoshi-Medium', color: '#288CE9'}}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        paddingVertical: wp(4),
        paddingLeft: wp(5),
        borderColor: '#D9D9D9',
        borderRadius: wp(6)
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: '#38B432',
        marginTop: hp(3),
        marginBottom: hp(6),
        borderRadius: 25,
        paddingHorizontal: wp(10),
        paddingVertical: wp(6)
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