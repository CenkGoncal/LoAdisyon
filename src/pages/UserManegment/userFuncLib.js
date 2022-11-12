import React from 'react';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export function readUsers(callback) {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {  
        let arr = [];
        querySnapshot.forEach(documentSnapshot => {
          let item = {...documentSnapshot.data()};
          item.Id = documentSnapshot.id;
          arr.push(item);
        });

        callback(arr);
      });
  };

export async function userAdd(user, callback) {

    user.tokens = await getToken();

    firestore()
    .collection('users')
    .add(user)
    .then(() => {
      readUsers((val)=>{
        callback(val);
      });
    });
}
  
export async function userUpdate(user, callback) {

  console.log(user);
    user.tokens = await getToken();
    console.log(user);
    firestore()
    .doc(`users/${user.Id}`)
    .update(user)
    .then(() => {
        readUsers((val)=>{ 
            callback(val);
          });
    });
}

export function deleteUser(user, callback) {

  firestore()
  .collection("users")
  .doc(user.Id)
  .delete()
  .then(() => {
      readUsers((val)=>{ 
          callback(val);
        });
  });
}

export function sendPushNotification()
{
  readUsers((users)=>{
    fetch('https://fcm.googleapis.com/v1/projects/649890098808/messages', {
        headers: { "Content-Type": "application/json; charset=utf-8",  
                   "Authorization": "Bearer AAAAl1B37ng:APA91bH4b3igZ0ubPp01whYJ997WRGvbdK8qMDyRe_c8cVVmK3--2FblygjBYk3v-FJ53k2BjsTAV_Eko2bR5kwt14_nTC7F8tusaDfRwWNUkdMsd7AZEsMuElaenqtL1TSCHa3u-0aD" 
                 },
        method: 'POST',
        body: JSON.stringify({
          "message":{
             "token":users[0].tokens,
             "data":{},
             "notification":{
               "body":"This is an FCM notification message!",
               "title":"FCM Message"
             }
          }
       })
  })
  })
} 

async function getToken()
{
  messaging()
      .getToken()
      .then(token => {
        return token;
   });
}
