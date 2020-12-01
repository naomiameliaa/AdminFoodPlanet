/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {normalize, getData, alertMessage} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import SpinnerKit from '../components/SpinnerKit';
import MultiSelect from 'react-native-multiple-select';
import ImagePicker from 'react-native-image-picker';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: normalize(15),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  multiSelectContainer: {
    marginVertical: normalize(10),
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
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  btnSubmit: {
    backgroundColor: theme.colors.red,
    width: SCREEN_WIDTH * 0.6,
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  txtSubmit: {
    color: theme.colors.white,
    fontSize: 18,
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
  txtStyle: {
    marginRight: 250,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 300,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});

function AddTenantPage({navigation}) {
  const [tenantAdminId, setTenantAdminId] = React.useState('');
  const [tenantEmail, onChangeTenantEmail] = React.useState('');
  const [tenantName, onChangeTenantName] = React.useState('');
  const [tenantDescription, onChangeTenantDescription] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [listCategory, setListCategory] = React.useState([]);
  const [fileData, setFileData] = React.useState('');
  const [filePath, setFilePath] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading] = React.useState(false);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    console.log(selectedItems);
  };

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
          wrapperStyle={styles.images}
          onPress={chooseImage}
        />
      );
    } else {
      return (
        <ButtonKit
          source={require('../assets/dummy.png')}
          wrapperStyle={styles.images}
          onPress={chooseImage}
        />
      );
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

  async function getListCategory() {
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.get(
        // `https://food-planet.herokuapp.com/foodcourts/allCategory`,
        'http://172.18.0.1:8080/foodcourts/allCategory',
        {
          params: {
            foodcourtId: foodcourtId,
          },
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Query success') {
        console.log(response.data.object);
        setListCategory(response.data.object);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  }

  async function registerTenantAdmin() {
    try {
      const response = await axios.post(
        'http://172.18.0.1:8080/users/createTenantAdmin',
        {
          email: tenantEmail,
        },
        {
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Create tenantAdmin success') {
        return response.data.object.userId;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addNewTenant() {
    const tenantAdminId = await registerTenantAdmin();
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.post(
        // 'https://food-planet.herokuapp.com/tenants/generate',
        'http://172.18.0.1:8080/tenants/generate',
        {
          userId: tenantAdminId,
          foodcourtId: foodcourtId,
          name: tenantName,
          description: tenantDescription,
          category: selectedItems,
          image: fileData,
        },
        {
          auth: {
            username: 'admin@mail.com',
            password: 'password',
          },
        },
      );
      if (response.data.msg === 'Create tenant success') {
        console.log('add new tenant: ', tenantAdminId);
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Success add new tenant',
          btnText: 'OK',
          onPressOK: () => navigation.goBack(),
          btnCancel: false,
        });
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      console.log(tenantAdminId);
      console.log(error);
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'Failed add new tenant',
        btnText: 'Try Again',
        btnCancel: false,
      });
    }
  }

  React.useEffect(() => {
    getListCategory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SpinnerKit sizeSpinner="large" style={styles.spinnerKitStyle} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Title text="Add New Tenant" />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.ImageSections}>{renderFileData()}</View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeTenantEmail(text)}
              value={tenantEmail}
              autoCapitalize="none"
              placeholder="Tenant Admin Email"
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeTenantName(text)}
              value={tenantName}
              autoCapitalize="none"
              placeholder="Tenant Name"
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeTenantDescription(text)}
              value={tenantDescription}
              autoCapitalize="none"
              placeholder="Tenant Description"
            />
          </View>
          <View style={styles.multiSelectContainer}>
            <MultiSelect
              hideTags
              items={listCategory}
              uniqueKey="categoryName"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="-- Select Category --"
              searchInputPlaceholderText="Search Category"
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="categoryName"
              searchInputStyle={{color: '#CCC', fontSize: 18}}
              submitButtonColor="#48d22b"
              submitButtonText="OK"
              fontSize={18}
            />
          </View>
          <View style={styles.btnWrapper}>
            <ButtonText
              title="Submit"
              txtStyle={styles.txtSubmit}
              wrapperStyle={styles.btnSubmit}
              onPress={addNewTenant}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AddTenantPage;
