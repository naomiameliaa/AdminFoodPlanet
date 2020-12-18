/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
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
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(20),
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
  txtBtnHourActive: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  txtBtnHourInactive: {
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

const defaultTime =
  'Wed Dec 16 2020 00:00:00 GMT+0700 (Western Indonesia Time)';

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
  const [checkBoxChecked, setCheckBoxChecked] = React.useState([false, false, false, false, false, false, false]);
  const [time, setTime] = React.useState(new Date(defaultTime));
  const [show, setShow] = React.useState(false);
  const [section, setSection] = React.useState([]);
  const listOpenCloseHour = {
    openHour: defaultTime,
    closeHour: defaultTime,
  };
  const [openingHourList, setOpeningHourList] = React.useState([
    {
      day: '1',
      ...listOpenCloseHour,
    },
    {day: '2', ...listOpenCloseHour},
    {day: '3', ...listOpenCloseHour},
    {day: '4', ...listOpenCloseHour},
    {day: '5', ...listOpenCloseHour},
    {day: '6', ...listOpenCloseHour},
    {day: '7', ...listOpenCloseHour},
  ]);
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
        />
      );
    } else {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + foodcourt_image}}
          style={styles.images}
        />
      );
    }
  }

  const onChange = (event, selectedValue) => {
    setShow(false);
    const currentDate = selectedValue || new Date(defaultTime);
    let obj = [];
    if (section[0] === 1 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[0].openHour = currentDate)];
    } else if (section[0] === 1 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[0].closeHour = currentDate)];
    } else if (section[0] === 2 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[1].openHour = currentDate)];
    } else if (section[0] === 2 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[1].closeHour = currentDate)];
    } else if (section[0] === 3 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[2].openHour = currentDate)];
    } else if (section[0] === 3 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[2].closeHour = currentDate)];
    } else if (section[0] === 4 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[3].openHour = currentDate)];
    } else if (section[0] === 4 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[3].closeHour = currentDate)];
    } else if (section[0] === 5 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[4].openHour = currentDate)];
    } else if (section[0] === 5 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[4].closeHour = currentDate)];
    } else if (section[0] === 6 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[5].openHour = currentDate)];
    } else if (section[0] === 6 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[5].closeHour = currentDate)];
    } else if (section[0] === 7 && section[1] === 1) {
      obj = [...openingHourList, (openingHourList[6].openHour = currentDate)];
    } else if (section[0] === 7 && section[1] === 2) {
      obj = [...openingHourList, (openingHourList[6].closeHour = currentDate)];
    }
    setOpeningHourList(obj);
  };

  const checkBoxChanged = (id, value) => {
    var tempCheckBoxChecked = checkBoxChecked;
    tempCheckBoxChecked[id] = !value;
    setCheckBoxChecked(tempCheckBoxChecked);
    console.log(tempCheckBoxChecked, '0,', checkBoxChecked[0]);
  };

  const formatDate = (params) => {
    const times = new Date(params);
    return `${String(times.getHours()).padStart(2, '0')}:${String(times.getMinutes()).padStart(2, '0')}`;
  };

  async function updateFoodcourt() {
    let bodyOpeningHour = [];
    openingHourList.forEach((item, index) => {
      const tempObj = {
        ...item,
        openHour: formatDate(item.openHour),
        closeHour: formatDate(item.closeHour),
      };
      bodyOpeningHour.push(tempObj);
    });
    console.log('bodyOpeningHour', bodyOpeningHour);
    try {
      const response = await axios.put(
        'https://food-planet.herokuapp.com/foodcourts',
        {
          foodcourtId: 1,
          name: foodcourtName,
          address: foodcourtAddress,
          description: foodcourtDesc,
          openingHourList: bodyOpeningHour,
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

  const setSectionDay = (sectionDay) => {
    setSection(sectionDay);
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title txtStyle={styles.titleText} text="Edit My Information" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>{renderFileData()}</View>
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
                <Text style={styles.dayStyle}></Text>
                <View style={styles.innerHorizontalWrapper}>
                  <Text style={styles.btnHour}>Choose Open Hour</Text>
                  <Text style={styles.btnHour}>Choose Close Hour</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.horizontalWrapper}>
                <CheckBox
                  value={checkBoxChecked[0]}
                  onValueChange={() => checkBoxChanged(0, checkBoxChecked[0])}
                />
                <Text style={styles.dayStyle}>Monday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[0].openHour)}
                    txtStyle={checkBoxChanged[0] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([1, 1])}
                    disabled={checkBoxChanged[0] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[0].closeHour)}
                    txtStyle={checkBoxChanged[0] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([1, 2])}
                    disabled={checkBoxChanged[0] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[1]} onValueChange={() => checkBoxChanged(1, checkBoxChecked[1])} />
                <Text style={styles.dayStyle}>Tuesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[1].openHour)}
                    txtStyle={checkBoxChanged[1] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([2, 1])}
                    disabled={checkBoxChanged[1] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[1].closeHour)}
                    txtStyle={checkBoxChanged[1] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([2, 2])}
                    disabled={checkBoxChanged[1] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[2]} onValueChange={() => checkBoxChanged(2, checkBoxChecked[2])} />
                <Text style={styles.dayStyle}>Wednesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[2].openHour)}
                    txtStyle={checkBoxChanged[2] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([3, 1])}
                    disabled={checkBoxChanged[2] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[2].closeHour)}
                    txtStyle={checkBoxChanged[2] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([3, 2])}
                    disabled={checkBoxChanged[2] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[3]} onValueChange={() => checkBoxChanged(3, checkBoxChecked[3])} />
                <Text style={styles.dayStyle}>Thursday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[3].openHour)}
                    txtStyle={checkBoxChanged[3] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([4, 1])}
                    disabled={checkBoxChanged[3] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[3].closeHour)}
                    txtStyle={checkBoxChanged[3] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([4, 2])}
                    disabled={checkBoxChanged[3] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[4]} onValueChange={() => checkBoxChanged(4, checkBoxChecked[4])} />
                <Text style={styles.dayStyle}>Friday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[4].openHour)}
                    txtStyle={checkBoxChanged[4] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([5, 1])}
                    disabled={checkBoxChanged[4] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[4].closeHour)}
                    txtStyle={checkBoxChanged[4] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([5, 2])}
                    disabled={checkBoxChanged[4] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[5]} onValueChange={() => checkBoxChanged(5, checkBoxChecked[5])} />
                <Text style={styles.dayStyle}>Saturday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[5].openHour)}
                    txtStyle={checkBoxChanged[5] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([6, 1])}
                    disabled={checkBoxChanged[5] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[5].closeHour)}
                    txtStyle={checkBoxChanged[5] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([6, 2])}
                    disabled={checkBoxChanged[5] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[6]} onValueChange={() => checkBoxChanged(6, checkBoxChecked[6])} />
                <Text style={styles.dayStyle}>Sunday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[6].openHour)}
                    txtStyle={checkBoxChanged[6] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([7, 1])}
                    disabled={checkBoxChanged[6] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[6].closeHour)}
                    txtStyle={checkBoxChanged[6] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([7, 2])}
                    disabled={checkBoxChanged[6] === true ? false : true}
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
          {show && (
            <DateTimePicker
              value={time}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default EditProfilePage;
