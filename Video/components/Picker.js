import React,{useState} from 'react'
import { Button,Text } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';


const options = {
    title: 'Video Picker', 
    mediaType: 'video', 
    storageOptions:{
      skipBackup:true,
      path:'images'
    }
};

export default function Picker(props){
    const [photoSource, setphotoSource] = useState(null);
	const [photo, setPhoto] = useState(null);

    const myfun = () => {
		//alert('clicked');

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('Image Picker Error: ', response.error);
			} else {
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				setphotoSource(response.uri);
				setPhoto(response.data);
			}
		});
	};

    return(<>
    <Button title="Select Video" onPress={myfun} >
    </Button>
    <Text>{photoSource}</Text>
    {photoSource!=null?<VideoPlayer
                    ref={ref => videoPlayerRef = ref}
                    startTime={30}  // seconds
                    endTime={120}   // seconds
                    play={true}     // default false
                    replay={true}   // should player play video again if it's ended
                    rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
                    source={photoSource}
                    playerWidth={300} // iOS only
                    playerHeight={500} // iOS only
                    // style={{ backgroundColor: 'black' }}
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                    // onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
                />:<></>}
    </>)
}