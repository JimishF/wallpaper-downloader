var fs = require('fs'),
    request = require('request'),
    exec = require('child_process').exec,
    path = require("path")
    growl = require('notify-send');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://source.unsplash.com/random', __dirname+'/image.jpg', function(){
	exec('gsettings set org.gnome.desktop.background picture-uri file:////home/kavan/mywallpapers/image.jpg', function(err, out, code) {
		if (err) {
		    console.error(err);
		    return;
		}
		growl.notify('Wallpaper Changed!');
	});
});