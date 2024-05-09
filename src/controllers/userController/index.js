import { NAVIGATION } from '@/constants/navigation';
import { navigationRef } from '@/navigation/rootNavigation';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
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
            auth()
              .signOut()
              .then(res => {
              })
            resolve({status: true});
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
                this.createUser(user.uid, email)
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

    static createUser(id, email) {
      return new Promise(async(resolve, reject) => {
        let deviceId = await DeviceInfo.getUniqueId()
        await firestore().collection('users').doc(id).set({
          id: id,
          email: email,
          deviceUniqueId: deviceId,
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
}