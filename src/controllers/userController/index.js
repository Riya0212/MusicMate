import { NAVIGATION } from '@/constants/navigation';
import { navigationRef } from '@/navigation/rootNavigation';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';

export class UserController {
    static signInWithEmailAndPassword(email, password) {
      return new Promise(async (resolve, rejected) => {
        try {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
              var users = res.user;
              if (res.user.uid) {
                this.userDetailsGet(users.uid)
                  .then(res => {
                      this.storeUserDetails(res);
                      resolve({data: res, status: true});
                  })
                  .catch(err => {
                    rejected(err);
                  });
              } else {
                this.logoutUser()
                  .then(res => {
                    navigationRef.navigate(NAVIGATION.login)
                    rejected({
                      status: false,
                      message: 'Verify your email and try again',
                      user: users,
                    });
                  })
                  .catch(error => {
                    rejected({
                      status: false,
                      message: 'Verify your email and try again',
                      user: users,
                    });
                  });
              }
            })
            .catch(error => {
              console.log(error.code);
              var message = error.message.replace(/ *\[[^\]]*]/, '')?.trim();
              if (error.code === 'auth/user-not-found') {
                message = 'user not found';
              } else if (error.code == 'auth/wrong-password') {
                message = 'wrong password';
              } else if (error.code == 'auth/user-disabled') {
                message = 'Your Account is deactivated please contact to administrator';
              }
              resolve({status: false, message: message});
            });
        } catch (e) {
          rejected({status: false, message: e.message});
        }
      });
    }

    static async userDetailsGet(id) {
        return new Promise(async (resolve, rejected) => {
          try {
            firestore().collection('users').doc(id).get()
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                let message = 'No data found';
                if (error.code === 'firestore/resource-exhausted') {
                  message = 'Database limit over!';
                }

                rejected({status: false, message: message});
              });
          } catch (e) {
            rejected({status: false, message: e.message});
          }
        });
    }
    static storeUserDetails(response) {
       
    }

    static logoutUser() {
        return new Promise(async (resolve, rejected) => {
          try {
            if (auth().currentUser.providerData[0].providerId == 'google.com') {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut()
              .then(res => {
                resolve({status: true})
              })
            } else {
              await auth()
                .signOut()
                .then(res => {
                })
              resolve({status: true});
            }
          } catch (e) {
            resolve({status: false, message: e.message});
          }
        });
    }
    
    static registerUser(name,email,password) {
      return new Promise((resolve, rejected) => {
        try {
          auth()
            .createUserWithEmailAndPassword(email,password)
            .then(res => {
              var user = res.user
              if(res.user.uid) {
                res.user.updateProfile({displayName: name})
                this.createUser(user.uid, email, name)
                .then((res)=>{
                  this.storeUserDetails(res);
                  resolve({data: res, status: true})
                })
                .catch(err => {
                  rejected(err);
                })
              } else {
                this.logoutUser()
                .then(res => {
                  navigationRef.navigate(NAVIGATION.signup)
                  rejected({status: false})
                })
                .catch(err => {
                  rejected({ status: false})
                })
              }
            })
            .catch(error => {
              var message = error.message.replace(/ *\[[^\]]*]/, '')?.trim();
              if (error.code === 'auth/email-already-in-use') {
                message = 'That email address is already in use!'
              }
          
              if (error.code === 'auth/invalid-email') {
                message = 'That email address is invalid!'
              }
              resolve({status: false, message: message})
            })
        } catch (e) {
          resolve({status: false, message: e.message})
        }
      })
    }

    static createUser(id, email, name) {
      return new Promise(async(resolve, reject) => {
        let deviceId = await DeviceInfo.getUniqueId()
        await firestore().collection('users').doc(id).set({
          id: id,
          email: email,
          deviceUniqueId: deviceId,
          fullName: name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
          this.userDetailsGet(id)
          .then((res) => {
            resolve(res);
          })
        }).catch(err => {
          reject({status: false, message: err.message})
        })
      })
    }

    static signInWithCredential(credential,exist) {
      return new Promise(async(resolve, rejected) => {
        await auth().signInWithCredential(credential)
          .then(async res => {
            var user = res.user;
            if(res.additionalUserInfo.isNewUser && exist) {
              this.createUser(user.uid,user.email,user.displayName)
              .then((res) => {
                this.storeUserDetails(res);
                resolve({status: true, data: res})
              })
              .catch(err => {
                rejected({status: false, message: err.message})
              })
            } else if (!res.additionalUserInfo.isNewUser && exist) {
              this.logoutUser()
              resolve({status: false, message: 'User already exist'})
            } else if(res.additionalUserInfo.isNewUser && !exist) {
              await auth().currentUser.delete()
              resolve({status: false, message: 'User not exist '})
            } else {
              this.userDetailsGet(user.uid)
              .then(res => {
                this.storeUserDetails(res);
                resolve({data: res, status: true})
              })
              .catch(err => {
                rejected({status: false, message: err.message})
              })
            }
          })
      })
    }
}