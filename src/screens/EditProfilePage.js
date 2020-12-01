import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {normalize} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import SpinnerKit from '../components/SpinnerKit';
import ImagePicker from 'react-native-image-picker';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  backButton: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(20),
    borderColor: theme.colors.black,
    borderWidth: 2,
  },
  inputStyle: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  textArea: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlignVertical: 'top',
    height: 120,
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  btnUpdate: {
    backgroundColor: theme.colors.red,
    width: SCREEN_WIDTH * 0.7,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  updateTxt: {
    color: theme.colors.white,
    fontSize: 18,
  },
  txtStyle: {
    marginTop: normalize(20),
    borderColor: theme.colors.black,
    borderWidth: 2,
  },
  btnChooseImage: {
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
    borderColor: theme.colors.black,
    borderWidth: 2,
  },
  txtChooseImage: {
    color: theme.colors.black,
    fontSize: 18,
    marginVertical: 10,
  },
  imageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: SCREEN_WIDTH * 0.9,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
});

function EditProfilePage({route}) {
  const [foodcourt, setFoodcourt] = React.useState([]);
  const [foodcourtName, onChangeFoodcourtName] = React.useState('');
  const [foodcourtAddress, onChangeFoodcourtAddress] = React.useState('');
  const [foodcourtDesc, onChangeFoodcourtDesc] = React.useState('');
  const [fileData, setFileData] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {foodcourtImage} = route.params;

  function chooseImage() {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
        // You can also display the image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setFilePath(response);
        setFileData(response.data);
        console.log('THIS IS FILEDATA', response.data);

        // this.setState({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri
        // });
      }
    });
  }

  function renderFileData() {
    if (fileData) {
      return (
        <ButtonKit
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          // btnStyle={styles.images}
          wrapperStyle={styles.images}
          onPress={chooseImage}
        />
      );
    } else {
      return (
        <ButtonKit
          // source={require('../assets/dummy.png')}
          source={{uri: 'data:image/jpeg;base64,' + foodcourtImage}}
          // btnStyle={styles.images}
          wrapperStyle={styles.images}
          onPress={chooseImage}
        />
      );
    }
  }

  async function updateFoodcourt() {
    try {
      const response = await axios.put(
        // 'https://food-planet.herokuapp.com/foodcourts',
        'http://172.18.0.1:8080/foodcourts/update',
        {
          foodcourtId: 1,
          name: foodcourtName,
          address: foodcourtAddress,
          description: foodcourtDesc,
          openingHourList: [
            {day: '1', openHour: '09:00', closeHour: '18:00'},
            {day: '2', openHour: '09:00', closeHour: '18:00'},
            {day: '3', openHour: '09:00', closeHour: '18:00'},
            {day: '4', openHour: '09:00', closeHour: '18:00'},
            {day: '5', openHour: '09:00', closeHour: '18:00'},
            {day: '6', openHour: '09:00', closeHour: '18:00'},
            {day: '7', openHour: '09:00', closeHour: '18:00'},
          ],
          seats: {
            2: 20,
            4: 15,
            6: 10,
          },
          image:
            '/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
        },
        {
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Update foodcourt success') {
        console.log('Update info success');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.log('error:', error);
    }
  }

  async function getFoodcourtById() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        // 'https://food-planet.herokuapp.com/foodcourts',
        'http://172.18.0.1:8080/foodcourts',
        {
          params: {
            foodcourtId: 1,
          },
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setFoodcourt(response.data.object[0]);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.log('error:', errorMessage);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    getFoodcourtById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SpinnerKit sizeSpinner="large" style={styles.spinnerKitStyle} />
      ) : (
        <ScrollView>
          <View style={styles.headerContainer}>
            <Title text="Edit My Information" />
          </View>

          <View style={styles.contentContainer}>
            {renderFileData()}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeFoodcourtName(text)}
              value={foodcourtName}
              autoCapitalize="none"
              placeholder={foodcourt.name}
            />
            <TextInput
              style={styles.textArea}
              onChangeText={(text) => onChangeFoodcourtAddress(text)}
              value={foodcourtAddress}
              autoCapitalize="none"
              placeholder={foodcourt.address}
              numberOfLines={4}
              multiline={true}
            />
            <TextInput
              style={styles.textArea}
              onChangeText={(text) => onChangeFoodcourtDesc(text)}
              value={foodcourtDesc}
              autoCapitalize="none"
              placeholder={foodcourt.description}
              numberOfLines={4}
              multiline={true}
            />
          </View>
          <View style={styles.btnWrapper}>
            <ButtonText
              title="Submit"
              txtStyle={styles.updateTxt}
              wrapperStyle={styles.btnUpdate}
              onPress={updateFoodcourt}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default EditProfilePage;
