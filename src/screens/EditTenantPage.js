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

function EditTenantPage({route, navigation}) {
  const [tenant_name, onChangeTenantName] = React.useState('');
  const [tenant_description, onChangeTenantDescription] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [listCategory, setListCategory] = React.useState([]);
  const [fileData, setFileData] = React.useState('');
  const [filePath, setFilePath] = React.useState('');
  const {tenantId, tenantName, tenantDescription, tenantImage} = route.params;

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
        console.log('THIS IS FILEDATA', response.data);
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
          source={{uri: 'data:image/jpeg;base64,' + tenantImage}}
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

  async function editTenant() {
    try {
      const response = await axios.post(
        // 'https://food-planet.herokuapp.com/tenants/generate',
        'http://172.18.0.1:8080/tenants/update',
        {
          tenantId: tenantId,
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
      if (response.data.msg === 'Update tenant success') {
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Success update tenant',
          btnText: 'OK',
          onPressOK: () => navigation.goBack(),
          btnCancel: false,
        });
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'Update tenant failed',
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
            <Title text="Edit Tenant" />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.ImageSections}>{renderFileData()}</View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeTenantName(text)}
              value={tenant_name}
              autoCapitalize="none"
              placeholder={tenantName}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => onChangeTenantDescription(text)}
              value={tenant_description}
              autoCapitalize="none"
              placeholder={tenantDescription}
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
              onPress={editTenant}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default EditTenantPage;
