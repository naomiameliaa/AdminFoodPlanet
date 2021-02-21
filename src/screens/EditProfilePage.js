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
  FlatList,
} from 'react-native';
import {normalize, alertMessage, getData, removeData} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import {AuthContext} from '../../context';

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
    height: normalize(42),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 'auto',
    marginVertical: 10,
    justifyContent: 'center',
  },
  inputStyleError: {
    width: '100%',
    height: normalize(42),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 'auto',
    marginVertical: 10,
    justifyContent: 'center',
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
  textArea: {
    width: '100%',
    height: normalize(120),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
  },
  textAreaError: {
    width: '100%',
    height: normalize(120),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
    borderColor: theme.colors.red,
    borderWidth: 1,
  },
  textAreaSmall: {
    width: '100%',
    height: normalize(80),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
  },
  textAreaSmallError: {
    width: '100%',
    height: normalize(80),
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    textAlignVertical: 'top',
    borderColor: theme.colors.red,
    borderWidth: 1,
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
  horizontalWrapperTitle: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  btnHourTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: normalize(14),
  },
  btnHourWrapperTitle: {
    width: '50%',
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
    justifyContent: 'center',
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  dayStyleActive: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: theme.colors.red,
    width: '30%',
  },
  dayStyleInactive: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: theme.colors.dark_grey,
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
    alignSelf: 'center',
  },
  txtBtnHourInactive: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.dark_grey,
    alignSelf: 'center',
  },
  btnHour: {
    width: '50%',
    fontWeight: 'bold',
  },
  btnWrapper: {
    backgroundColor: theme.colors.red,
    width: '50%',
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 30,
    alignSelf: 'center',
  },
  titleSeatWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(15),

  },
  titleSeatStyle: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: normalize(14),
  },
  inputSeatContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
    paddingHorizontal: normalize(10),
  },
  inputSeatWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSeatStyle: {
    width: '45%',
    backgroundColor: theme.colors.white,
    height: normalize(40),
    fontSize: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 'auto',
  },
  plusButton: {
    width: 20,
    height: 20,

  },
});

const defaultTime =
  'Wed Dec 16 2020 00:00:00 GMT+0700 (Western Indonesia Time)';

function EditProfilePage({route, navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {
    foodcourt_id,
    foodcourt_name,
    foodcourt_address,
    foodcourt_description,
    foodcourt_image,
    getFoodcourtById,
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
  const [seats, setSeats] = React.useState(
    [
      {
        seat1 : {type: 0, qty: 0, isShow: 1},
        seat2 : {type: 0, qty: 0, isShow: 0},
        seat3 : {type: 0, qty: 0, isShow: 0},
        seat4 : {type: 0, qty: 0, isShow: 0},
        seat5 : {type: 0, qty: 0, isShow: 0},
        seat6 : {type: 0, qty: 0, isShow: 0},
        seat7 : {type: 0, qty: 0, isShow: 0},
        seat8 : {type: 0, qty: 0, isShow: 0},
        seat9 : {type: 0, qty: 0, isShow: 0},
        seat10 : {type: 0, qty: 0, isShow: 0},
      },
    ]
  );
  const [time] = React.useState(new Date(defaultTime));
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

  function checkData() {
    const bodyOpeningHour = getBodyOpenHour();
    const objBody = getBodySeat();
    if (
      foodcourtName.length === 0 ||
      foodcourtAddress.length === 0 ||
      foodcourtDesc.length === 0 ||
      fileData.length === 0 ||
      bodyOpeningHour.length === 0 ||
      (Object.keys(objBody).length === 0 && objBody.constructor === Object)

    ) {
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'All data must be filled!',
        btnText: 'Try Again',
        btnCancel: true,
      });
    } else {
      updateFoodcourt();
    }
  }

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

  const formatDate = (params) => {
    const times = new Date(params);
    return `${String(times.getHours()).padStart(2, '0')}:${String(times.getMinutes()).padStart(2, '0')}`;
  };

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
    let tempCheckBoxChecked = [...checkBoxChecked];
    tempCheckBoxChecked[id] = value;
    setCheckBoxChecked(tempCheckBoxChecked);
  };

  const getBodySeat = () => {
    const objSeat = seats[0];
    let objBody = {};
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(objSeat)) {
      if (value.isShow === 1) {
        objBody[value.type] = value.qty;
      }
    }
    return objBody;
  };

  const getBodyOpenHour = () => {
    let bodyOpeningHour = [];
    openingHourList.forEach((item, index) => {
      if (item.day <= 7) {
        if (checkBoxChecked[index]) {
          const tempObj = {
            ...item,
            openHour: formatDate(item.openHour),
            closeHour: formatDate(item.closeHour),
          };
          bodyOpeningHour.push(tempObj);
        }
      }
    });

    return bodyOpeningHour;
  };

  const logout = async () => {
    const dataUser = await getData('adminData');
    if (dataUser !== null) {
      await removeData('adminData');
      await signOut();
    }
  };

  function sessionTimedOut() {
    alertMessage({
      titleMessage: 'Session Timeout',
      bodyMessage: 'Please re-login',
      btnText: 'OK',
      onPressOK: () => {
        logout();
      },
      btnCancel: false,
    });
  }

  async function updateFoodcourt() {
    setIsLoading(true);
    try {
      const response = await axios.put(
        'https://food-planet.herokuapp.com/foodcourts/update',
        {
          foodcourtId: foodcourt_id,
          name: foodcourtName,
          address: foodcourtAddress,
          description: foodcourtDesc,
          openingHourList: getBodyOpenHour(),
          seats: getBodySeat(),
          image: foodcourt_image,
        },
      );
      if (response.data.msg === 'Update foodcourt success') {
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Update Profile successfully',
          btnText: 'OK',
          onPressOK: () => {
            getFoodcourtById();
            navigation.goBack();
          },
          btnCancel: false,
        });
      }
    } catch (error) {
      console.log('error:', error);
      if (error.response.status === 401) {
        sessionTimedOut();
      } else {
        alertMessage({
          titleMessage: 'Error',
          bodyMessage: 'Failed update profile!',
          btnText: 'Try Again',
          btnCancel: true,
        });
      }
    }
    setIsLoading(false);
  }

  const setSectionDay = (sectionDay) => {
    setSection(sectionDay);
    setShow(true);
  };

  const addInputSeat = (index, item) => {
    if (index && index <= 10){
      let arr = [];
      const obj = seats[0];
      let tempObj = obj;
      tempObj[`seat${index}`] = {
        ...tempObj[`seat${index}`],
        isShow: 1,
      };
      arr.push(tempObj);
      setSeats(arr);
    }
  };

  const decreaseInputSeat = (index, item) => {
    let arr = [];
    const obj = seats[0];
    let tempObj = obj;
    tempObj[`seat${index}`] = {
      ...tempObj[`seat${index}`],
      isShow: 0,
    };
    arr.push(tempObj);
    setSeats(arr);
  };

  const onChangeTypeSeat = (index, text) => {
    let arr = [];
    const obj = seats[0];
    let tempObj = obj;
    tempObj[`seat${index}`] = {
      ...tempObj[`seat${index}`],
      type: text,
    };
    arr.push(tempObj);
    setSeats(arr);
  };

  const onChangeTotalTypeSeat = (index, text) => {
    let arr = [];
    const obj = seats[0];
    let tempObj = obj;
    tempObj[`seat${index}`] = {
      ...tempObj[`seat${index}`],
      qty: text,
    };
    arr.push(tempObj);
    setSeats(arr);
  };

  const renderItem = ({item, index}) => {
    const tempObj = seats[0];
    let temp = null;
    for (const [key, value] of Object.entries(tempObj)) {
      if (value.isShow !== 1 ){
        const val = key.split('seat');
        // eslint-disable-next-line radix
        temp = parseInt(val[1]);
        break;
      }
    }

    if (tempObj[item].isShow === 0){
      return null;
    } else {
      return (
        <View style={styles.inputSeatContainer}>
          <View style={styles.inputSeatWrapper}>
            <TextInput
              style={styles.inputSeatStyle}
              onChangeText={(text) => onChangeTypeSeat(index + 1, text)}
              autoCapitalize="none"
              keyboardType="number-pad"
              textAlign="center"
            />
            <TextInput
              style={styles.inputSeatStyle}
              onChangeText={(text) => onChangeTotalTypeSeat(index + 1, text)}
              autoCapitalize="none"
              keyboardType="number-pad"
              textAlign="center"
            />
          </View>
          <ButtonKit
            source={index > 0 ? require('../assets/minus-button.png') : require('../assets/plus-button.png')}
            wrapperStyle={styles.plusButton}
            onPress={() => index === 0 ? addInputSeat(temp, item) : decreaseInputSeat(index + 1, item)}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title txtStyle={styles.titleText} text="Edit My Information" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderFileData()}
          <ButtonKit
            source={require('../assets/photo.png')}
            wrapperStyle={styles.btnImage}
            onPress={chooseImage}
          />
          <View style={styles.contentContainer}>
            <TextInput
              style={foodcourtName.length === 0 ? styles.inputStyleError : styles.inputStyle}
              onChangeText={(text) => onChangeFoodcourtName(text)}
              value={foodcourtName}
              autoCapitalize="none"
              placeholder={foodcourt_name}
            />
            <TextInput
              style={foodcourtAddress.length === 0 ? styles.textAreaSmallError : styles.textAreaSmall}
              onChangeText={(text) => onChangeFoodcourtAddress(text)}
              value={foodcourtAddress}
              autoCapitalize="none"
              placeholder={foodcourt_address}
              numberOfLines={4}
              multiline
            />
            <TextInput
              style={foodcourtDesc.length === 0 ? styles.textAreaError : styles.textArea}
              onChangeText={(text) => onChangeFoodcourtDesc(text)}
              value={foodcourtDesc}
              autoCapitalize="none"
              placeholder={foodcourt_description}
              numberOfLines={4}
              multiline
            />
            <Text style={styles.titleInput}>Input Opening Hour List :</Text>
            <Text style={styles.subTitleInputHour}>
              *if you not tick the checkbox on certain day, it means your foodcourt is closed on
              that certain day*
            </Text>
            <View style={styles.horizontalWrapperTitle}>
              <View style={styles.btnHourWrapperTitle}>
                <Text style={styles.btnHourTitle}>Choose Open Hour</Text>
              </View>
              <View style={styles.btnHourWrapperTitle}>
                <Text style={styles.btnHourTitle}>Choose Close Hour</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.horizontalWrapper}>
                <CheckBox
                  value={checkBoxChecked[0]}
                  onValueChange={(value) => checkBoxChanged(0, value)}
                />
                <Text style={checkBoxChecked[0] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Monday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[0].openHour)}
                    txtStyle={checkBoxChecked[0] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([1, 1])}
                    disabled={checkBoxChecked[0] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[0].closeHour)}
                    txtStyle={checkBoxChecked[0] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([1, 2])}
                    disabled={checkBoxChecked[0] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[1]} onValueChange={(value) => checkBoxChanged(1, value)} />
                <Text style={checkBoxChecked[1] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Tuesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[1].openHour)}
                    txtStyle={checkBoxChecked[1] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([2, 1])}
                    disabled={checkBoxChecked[1] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[1].closeHour)}
                    txtStyle={checkBoxChecked[1] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([2, 2])}
                    disabled={checkBoxChecked[1] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[2]} onValueChange={(value) => checkBoxChanged(2, value)} />
                <Text style={checkBoxChecked[2] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Wednesday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[2].openHour)}
                    txtStyle={checkBoxChecked[2] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([3, 1])}
                    disabled={checkBoxChecked[2] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[2].closeHour)}
                    txtStyle={checkBoxChecked[2] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([3, 2])}
                    disabled={checkBoxChecked[2] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[3]} onValueChange={(value) => checkBoxChanged(3, value)} />
                <Text style={checkBoxChecked[3] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Thursday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[3].openHour)}
                    txtStyle={checkBoxChecked[3] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([4, 1])}
                    disabled={checkBoxChecked[3] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[3].closeHour)}
                    txtStyle={checkBoxChecked[3] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([4, 2])}
                    disabled={checkBoxChecked[3] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[4]} onValueChange={(value) => checkBoxChanged(4, value)} />
                <Text style={checkBoxChecked[4] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Friday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[4].openHour)}
                    txtStyle={checkBoxChecked[4] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([5, 1])}
                    disabled={checkBoxChecked[4] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[4].closeHour)}
                    txtStyle={checkBoxChecked[4] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([5, 2])}
                    disabled={checkBoxChecked[4] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[5]} onValueChange={(value) => checkBoxChanged(5, value)} />
                <Text style={checkBoxChecked[5] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Saturday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[5].openHour)}
                    txtStyle={checkBoxChecked[5] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([6, 1])}
                    disabled={checkBoxChecked[5] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[5].closeHour)}
                    txtStyle={checkBoxChecked[5] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([6, 2])}
                    disabled={checkBoxChecked[5] === true ? false : true}
                  />
                </View>
              </View>
              <View style={styles.horizontalWrapper}>
                <CheckBox value={checkBoxChecked[6]} onValueChange={(value) => checkBoxChanged(6, value)} />
                <Text style={checkBoxChecked[6] === true ? styles.dayStyleActive : styles.dayStyleInactive}>Sunday</Text>
                <View style={styles.innerHorizontalWrapper}>
                  <ButtonText
                    title={formatDate(openingHourList[6].openHour)}
                    txtStyle={checkBoxChecked[6] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([7, 1])}
                    disabled={checkBoxChecked[6] === true ? false : true}
                  />
                  <ButtonText
                    title={formatDate(openingHourList[6].closeHour)}
                    txtStyle={checkBoxChecked[6] === true ? styles.txtBtnHourActive : styles.txtBtnHourInactive}
                    wrapperStyle={styles.btnHour}
                    onPress={() => setSectionDay([7, 2])}
                    disabled={checkBoxChecked[6] === true ? false : true}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.titleInput}>Input Seats Availability :</Text>
            <View style={styles.inputSeatContainer}>
              <View style={styles.titleSeatWrapper}>
                <Text style={styles.titleSeatStyle}>Seat Type</Text>
                <Text style={styles.titleSeatStyle}>Total Seat</Text>
              </View>
            </View>
            <FlatList
              data={Object.keys(seats[0])}
              renderItem={({item, index}) => renderItem({item, index})}
              keyExtractor={(index) => index.toString()}
              extraData={seats}
            />
          </View>
          <ButtonText
            title="Submit"
            txtStyle={styles.btnText}
            wrapperStyle={styles.btnWrapper}
            onPress={() => checkData()}
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
