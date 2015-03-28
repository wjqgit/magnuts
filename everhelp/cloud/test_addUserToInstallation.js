var Parse = require('parse').Parse;

Parse.initialize("tOQcWFtNOQpSExXFPOAyRfdWw6HUw5tC4gxSiCib", "JmE2kQ6XJQUaFla71Gm4IpxOU931iLHHcgHNYgS5", "cNHfZXf6ke5wyyxrXXTpXYUxcnnzTqUMpAwW0RTG");

//wjq wjq's iPhone 6 Plus
//Tom tom's iPhone 5s
//hirohamada tom's iPad

Parse.Cloud.run('addUserToInstallation', {
    username: 'hirohamada',
    deviceToken: '02826b9d0629bb95770b5eac7b9d9b9b849e2560aa5e983215d3866b36908962'
},{
    success: function(installation) {
    	console.log('Successful!');
    },
    error: function(error) {
    	console.log('Error!');
    }
}
)