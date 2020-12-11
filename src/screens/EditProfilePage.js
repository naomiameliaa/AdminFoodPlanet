import * as React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {getData, normalize} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import SpinnerKit from '../components/SpinnerKit';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(20),
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
    marginBottom: 0,
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
    height: normalize(190),
    // borderColor: 'black',
    // borderWidth: 1,
  },
  listOpenHourStyle: {
    flexDirection: 'row',
  },
});

function EditProfilePage({route, navigation}) {
  const [foodcourt, setFoodcourt] = React.useState([]);
  const [foodcourtName, onChangeFoodcourtName] = React.useState('');
  const [foodcourtAddress, onChangeFoodcourtAddress] = React.useState('');
  const [foodcourtDesc, onChangeFoodcourtDesc] = React.useState('');
  const [fileData, setFileData] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    foodcourt_name,
    foodcourt_address,
    foodcourt_description,
    foodcourt_image,
  } = route.params;
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  function chooseImage() {
    let options = {
      title: 'Select Image',
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
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        setFilePath(response);
        setFileData(response.data);
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
          source={{uri: 'data:image/jpeg;base64,' + foodcourt_image}}
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
      );
      if (response.data.msg === 'Update foodcourt success') {
        console.log('Update info success');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.log('error:', error);
    }
  }

  const getDataAdmin = async () => {
    const dataAdmin = await getData('adminData');
    if (getDataAdmin !== null) {
      return dataAdmin.foodcourtId;
    } else {
      return null;
    }
  };

  async function getFoodcourtById() {
    setIsLoading(true);
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.get(
        'https://food-planet.herokuapp.com/foodcourts',
        {
          params: {
            foodcourtId: foodcourtId,
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setFoodcourt(response.data.object);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Title txtStyle={styles.txtStyle} text="Edit My Information" />
          </View>

          <View style={styles.contentContainer}>
            {renderFileData()}
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeFoodcourtName(text)}
              value={foodcourtName}
              autoCapitalize="none"
              placeholder={foodcourt_name}
            />
            <TextInput
              style={styles.textArea}
              onChangeText={(text) => onChangeFoodcourtAddress(text)}
              value={foodcourtAddress}
              autoCapitalize="none"
              placeholder={foodcourt_address}
              numberOfLines={4}
              multiline={true}
            />
            <TextInput
              style={styles.textArea}
              onChangeText={(text) => onChangeFoodcourtDesc(text)}
              value={foodcourtDesc}
              autoCapitalize="none"
              placeholder={foodcourt_description}
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
