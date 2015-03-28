var Parse = require('parse').Parse;

Parse.initialize("tOQcWFtNOQpSExXFPOAyRfdWw6HUw5tC4gxSiCib", "JmE2kQ6XJQUaFla71Gm4IpxOU931iLHHcgHNYgS5","cNHfZXf6ke5wyyxrXXTpXYUxcnnzTqUMpAwW0RTG");

var point = new Parse.GeoPoint(22.33575659, 114.26385331)
var query = new Parse.Query(Parse.User);
var i = 40

Parse.Cloud.run('addNote', {
    username: 'wjq',
    title: 'Testing ' + i.toString(),
    content: 'This is test round ' + i.toString(),
    reward: 250,
    location: point,
    status: 'sent'
}, {
    success: function(notes) {
    	console.log('Successful!');
    },
    error: function(error) {
    	console.log('Failed!');
    }
})