import React from 'react';
import { View, Text, Button } from 'react-native';
import qs from 'qs'
import axios from 'axios';
var obj = {};
class ApiCall extends React.Component {
    componentDidMount() {
        this.getMoviesFromApi();
    }
     status(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        } else {
          return Promise.reject(new Error(response.statusText))
        }
      }
      
       json(response) {
        return response.json()
      }
    async loginCall() {
        console.log('called');
        const url = 'http://49.248.167.28:8080/QCSWebServices/UserOfficeType.php';
        let requestOptions = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          }
      };
  
      let body = {
        office_id: '0000073',
          // format: 'json'
      };
      
   axios.post(url, qs.stringify(body), requestOptions)
    .then(response => {
      const obj_ = qs.parse(qs.stringify(eval("("+response.data+")")));
      const {udf1, office_type_new, office_i_d} = obj_.data[0];
      const {success} = obj_;
      console.log(udf1, office_type_new, success);
      const postBody = {
        wing: udf1,
        post_id: Number('0009'),
        login_user: 'ee1qcd_nnded',
        office_id: office_i_d
      };
      if(success){
        console.log('post-', postBody);
        axios.post('http://49.248.167.28:8080/QCSWebServices/SlipList.php ', qs.stringify(postBody), requestOptions)
        .then(res => {
          const postObj_ = qs.parse(qs.stringify(eval("("+res.data+")")));
          const {data} = postObj_;
          console.table(data);
        }).catch(err => console.log('post-call-2', err))
      }
    })
    .catch(err => {
      console.log('ax', err);
        // throw err;
    });
       
          
    }
    async getMoviesFromApi() {
        try {
            let response = await fetch(
                'https://facebook.github.io/react-native/movies.json',
            );
            let responseJson = await response.json();
            console.log('res', responseJson);
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text>Api Call</Text>
                    <Button title="Login" onPress={this.loginCall}></Button>
                </View>
            </View>
        )
    }
}

export default ApiCall;