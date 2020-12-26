/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {normalize, getData, alertMessage} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(20),
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
    marginTop: 8,
    textAlignVertical: 'top',
  },
  multiSelectStyle: {
    borderRadius: 10,
  },
  btnText: {
    color: theme.colors.white,
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  btnWrapper: {
    backgroundColor: theme.colors.red,
    width: '50%',
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 30,
    alignSelf: 'center',
  },
  txtStyle: {
    marginBottom: 0,
  },
  images: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
});

function AddTenantPage({navigation}) {
  const [tenantEmail, onChangeTenantEmail] = React.useState('');
  const [tenantName, onChangeTenantName] = React.useState('');
  const [tenantDescription, onChangeTenantDescription] = React.useState('');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [listCategory, setListCategory] = React.useState([]);
  const [fileData, setFileData] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line no-shadow
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
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
        <Image source={require('../assets/dummy.png')} style={styles.images} />
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
    try {
      const response = await axios.get(
        'https://food-planet.herokuapp.com/tenants/allCategories',
      );
      if (response.data.msg === 'Query success') {
        console.log('ini response', response.data.object);
        setListCategory(response.data.object);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function registerTenantAdmin() {
    try {
      const response = await axios.post(
        'https://food-planet.herokuapp.com/users/createTenantAdmin',
        {
          email: tenantEmail,
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
    setIsLoading(true);
    const tenantAdminId = await registerTenantAdmin();
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.post(
        'https://food-planet.herokuapp.com/tenants/generate',
        {
          userId: tenantAdminId,
          foodcourtId: foodcourtId,
          name: tenantName,
          description: tenantDescription,
          category: selectedItems,
          image: fileData,
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
      console.log(error);
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'Failed add new tenant',
        btnText: 'Try Again',
        btnCancel: false,
      });
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    getListCategory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title txtStyle={styles.titleText} text="Add New Tenant" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderFileData()}
          <ButtonKit
            source={require('../assets/photo.png')}
            wrapperStyle={styles.btnImage}
            onPress={chooseImage}
          />
          <View style={styles.contentContainer}>
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
              style={styles.textArea}
              onChangeText={(text) => onChangeTenantDescription(text)}
              value={tenantDescription}
              autoCapitalize="none"
              placeholder="Tenant Description"
            />
          </View>
          <MultiSelect
            items={listCategory}
            uniqueKey="categoryName"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="    -- Select Category --"
            searchInputPlaceholderText="Search Category"
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor={theme.colors.red}
            tagBorderColor={theme.colors.grey}
            tagTextColor={theme.colors.black}
            selectedItemTextColor={theme.colors.red}
            selectedItemIconColor={theme.colors.green}
            itemTextColor={theme.colors.black}
            displayKey="categoryName"
            searchInputStyle={styles.multiSelectStyle}
            submitButtonColor={theme.colors.red}
            submitButtonText="OK"
            fontSize={18}
          />
          <ButtonText
            title="Submit"
            txtStyle={styles.btnText}
            wrapperStyle={styles.btnWrapper}
            onPress={addNewTenant}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AddTenantPage;
