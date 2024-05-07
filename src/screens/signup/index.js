import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import { apple, backArrow, google, icon } from '@/assets';
import { wp,hp } from '@/themes';
import { ButtonComponent, TextInputIconComponent } from '@/components';
import { NAVIGATION } from '@/constants/navigation';



function SignUp({navigation}) {
    const [fName, setFName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const backAction = () => {
          navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
    
    return(
        <View style={styles.container}>
            <View  style={styles.header}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.arrowContainer}>
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
                        value={fName}
                        autoCapitalize="none"
                        onChangeText={text => {
                            setFName(text)
                        }}
                        sectionStyle={[styles.sectionStyle,{marginTop: hp(3)}]}
                    />
                    <TextInputIconComponent
                        placeholder={'Enter Email'}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={text => {
                            setEmail(text)
                        }}
                        sectionStyle={styles.sectionStyle}
                    />
                    <TextInputIconComponent
                        placeholder={'Password'}
                        value={password}
                        autoCapitalize="none"
                        onChangeText={text => {
                            setPassword(text)
                        }}
                        sectionStyle={styles.sectionStyle}
                    />
                    <ButtonComponent 
                    btnStyle={styles.buttonContainer}  
                    btnTitleStyle={styles.buttontext}
                    btnTitle={'Create Account'}
                    btnOnPress={() => {navigation.navigate(NAVIGATION.home)}}
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
                        <Text style={{fontFamily: 'Satoshi-Medium', color: '#383838'}}>Do You Have An Account? </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate(NAVIGATION.login)}} >
                            <Text style={{fontFamily: 'Satoshi-Medium', color: '#AC261B'}}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
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
        paddingLeft: wp(5),
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
        paddingVertical: wp(5)
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