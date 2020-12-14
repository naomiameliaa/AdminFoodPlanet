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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(10),
    paddingBottom: normalize(80),
  },
  titleText: {
    fontSize: normalize(22),
    marginTop: 15,
    marginBottom: 25,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -normalize(20),
  },
  inputStyle: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    justifyContent: 'center',
  },
  textArea: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
  },
  textAreaSmall: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
  },
  imageSections: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  btnImage: {
    alignSelf: 'flex-end',
    zIndex: 1,
    top: -normalize(40),
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: 10,
    opacity: 0.6,
  },
  images: {
    width: '100%',
    height: 220,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  titleInput: {
    fontSize: normalize(18),
    marginLeft: 2,
    marginTop: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  subTitleInputHour: {
    fontSize: normalize(10),
    marginLeft: 2,
    marginTop: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  horizontalWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  innerHorizontalWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  dayStyle: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    width: '30%',
  },
  btnText: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  txtBtnHour: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.dark_grey,
  },
  btnHour: {
    width: '50%',
  },
  btnWrapper: {
    backgroundColor: theme.colors.red,
    width: '50%',
    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

function EditProfilePage({route, navigation}) {
  const {
    foodcourt_name,
    foodcourt_address,
    foodcourt_description,
    foodcourt_image,
  } = route.params;
  const [foodcourtName, onChangeFoodcourtName] = React.useState(foodcourt_name);
  const [foodcourtAddress, onChangeFoodcourtAddress] = React.useState(
    foodcourt_address,
  );
  const [foodcourtDesc, onChangeFoodcourtDesc] = React.useState(
    foodcourt_description,
  );
  const [fileData, setFileData] = React.useState(foodcourt_image);
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setDate(currentDate);
  // };

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
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setFileData(response.data);
      }
    });
  }

  function renderFileData() {
    if (fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + foodcourt_image}}
          style={styles.images}
          resizeMode="contain"
        />
      );
    }
  }

  async function updateFoodcourt() {
    try {
      const response = await axios.put(
        'https://food-planet.herokuapp.com/foodcourts',
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
          image: foodcourt_image,
        },
      );
      if (response.data.msg === 'Update foodcourt success') {
        console.log('Update info success');
      }
    } catch (error) {
      console.log('error:', error);
    }
  }
  const renderDateTimePicker = () => {
    console.log('render date time');
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'time'}
        is24Hour={true}
        display="default"
        onChange={(dates) => setDate(dates)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title txtStyle={styles.titleText} text="Edit My Information" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.ImageSections}>{renderFileData()}</View>
          <ButtonKit
            source={require('../assets/photo.png')}
            wrapperStyle={styles.btnImage}
            onPress={chooseImage}
          />
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeFoodcourtName(text)}
              value={foodcourtName}
              autoCapitalize="none"
              placeholder={foodcourt_name}
            />
            <TextInput
              style={styles.textAreaSmall}
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
            <Text style={styles.titleInput}>Input Opening Hour List :</Text>
            <Text style={styles.subTitleInputHour}>
              *if you not filled on certain day, it means the shop is closed on
              that certain day*
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Monday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                    onPress={() => renderDateTimePicker()}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Tuesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Wednesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Thursday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Friday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Saturday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <Text style={styles.dayStyle}>Sunday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title="Choose Open Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                  <ButtonText
                    title="Choose Close Hour"
                    txtStyle={styles.txtBtnHour}
                    wrapperStyle={styles.btnHour}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.titleInput}>Input Seats Availability :</Text>
          </View>
          <ButtonText
            title="Submit"
            txtStyle={styles.btnText}
            wrapperStyle={styles.btnWrapper}
            onPress={updateFoodcourt}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default EditProfilePage;
