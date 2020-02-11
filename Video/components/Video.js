import React, { Component } from 'react';
import { View, Button, ScrollView,Text } from 'react-native';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';
import ImagePicker from 'react-native-image-picker';

const options1 = {
    title: 'Video Picker', 
    mediaType: 'video', 
    storageOptions:{
      skipBackup:true,
      path:'images'
    }
};

class Video extends Component {

    state={
        photoSource:"content://com.miui.gallery.open/raw/%2Fstorage%2Femulated%2F0%2FDCIM%2FCamera%2FVID_20200204_194514.mp4",
        photo:null
    }
     

     myfun  ()  {
		//alert('clicked');

		ImagePicker.showImagePicker(options1, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('Image Picker Error: ', response.error);
			} else {
				// You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(response.uri)
				this.setState({photoSource:response.uri});
				// this.setState({photo:response.data});
			}
		});
    };
    
    trimVideo() {
        const options = {
            startTime: 0,
            endTime: 15,
            quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
            saveToCameraRoll: true, // default is false // iOS only
            saveWithCurrentDate: true, // default is false // iOS only
        };
        this.videoPlayerRef.trim(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }

    compressVideo() {
        const options = {
            width: 720,
            height: 1280,
            bitrateMultiplier: 3,
            saveToCameraRoll: true, // default is false, iOS only
            saveWithCurrentDate: true, // default is false, iOS only
            minimumBitrate: 300000,
            removeAudio: true, // default is false
        };
        this.videoPlayerRef.compress(options)
            .then((newSource) => console.log(newSource))
            .catch(console.warn);
    }

    getPreviewImageForSecond(second) {
        const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
        this.videoPlayerRef.getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
        .then((base64String) => console.log('This is BASE64 of image', base64String))
        .catch(console.warn);
    }

    getVideoInfo() {
        this.videoPlayerRef.getVideoInfo()
        .then((info) => console.log(info))
        .catch(console.warn);
    }

    render() {
        return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Button title="Select Video" onPress={this.myfun} >
                </Button>
                <Text>{this.state.photoSource}</Text>
                {this.state.photoSource!=null? <VideoPlayer
                    ref={ref => this.videoPlayerRef = ref}
                    startTime={0}  // seconds
                    endTime={120}   // seconds
                    // play={true}     // default false
                    // replay={true}   // should player play video again if it's ended
                    rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                    source={"content://com.miui.gallery.open/raw/%2Fstorage%2Femulated%2F0%2FDCIM%2FCamera%2FVID_20200204_194514.mp4"}
                    playerWidth={300} // iOS only
                    playerHeight={500} // iOS only
                    style={{ color: 'black' }}
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                    onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
                />
                 :<></>}
               {/* <Trimmer
                    source={this.state.photoSource}
                    height={100}
                    width={300}
                    onTrackerMove={(e) => console.log(e.currentTime)} // iOS only
                    // currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
                    themeColor={'white'} // iOS only
                    thumbWidth={30} // iOS only
                    trackerColor={'green'} // iOS only
                    onChange={(e) => console.log(e.startTime, e.endTime)}
                />  */}
            </View>
        </ScrollView>
        );
    }
}

export default Video;