import * as React from 'react';
import {
  View,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {normalize, alertMessage, getData, removeData} from '../utils';
import ButtonText from '../components/ButtonText';
import ButtonKit from '../components/ButtonKit';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(20),
  },
  contentWrapper: {
    marginBottom: normalize(60),
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
    marginVertical: 30,
    alignSelf: 'center',
  },
  images: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
});

function EditTenantPage({route, navigation}) {
  const {
    tenantId,
    tenantName,
    tenantDescription,
    tenantCategory,
    tenantImage,
    getTenantData,
  } = route.params;
  const [tenant_name, onChangeTenantName] = React.useState(tenantName);
  const [tenant_description, onChangeTenantDescription] = React.useState(
    tenantDescription,
  );
  const [selectedItems, setSelectedItems] = React.useState(tenantCategory);
  const [listCategory, setListCategory] = React.useState([]);
  const [fileData, setFileData] = React.useState(tenantImage);
  const [isLoading, setIsLoading] = React.useState(false);
  const {signOut} = React.useContext(AuthContext);

  function checkData() {
    if (
      tenant_name.length === 0 ||
      tenant_description.length === 0 ||
      selectedItems.length === 0 ||
      fileData.length === 0
    ) {
      alertMessage({
        titleMessage: 'Error',
        bodyMessage: 'All data must be filled!',
        btnText: 'Try Again',
        btnCancel: true,
      });
    } else {
      editTenant();
    }
  }

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
        <Image
          source={{uri: 'data:image/jpeg;base64,' + tenantImage}}
          style={styles.images}
        />
      );
    }
  }

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

  async function getListCategory() {
    try {
      const response = await axios.get(
        'https://food-planet.herokuapp.com/tenants/allCategories',
      );
      if (response.data.msg === 'Query success') {
        setListCategory(response.data.object);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        sessionTimedOut();
      }
    }
  }

  async function editTenant() {
    setIsLoading(true);
    try {
      const response = await axios.put(
        'https://food-planet.herokuapp.com/tenants/update',
        {
          tenantId: tenantId,
          name: tenant_name,
          description: tenant_description,
          category: selectedItems,
          image: fileData,
        },
      );
      if (response.data.msg === 'Update tenant success') {
        alertMessage({
          titleMessage: 'Success',
          bodyMessage: 'Success Update Tenant',
          btnText: 'OK',
          onPressOK: () => {
            navigation.goBack();
            getTenantData();
          },
          btnCancel: false,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        sessionTimedOut();
      } else {
        alertMessage({
          titleMessage: 'Error',
          bodyMessage: 'Failed Update Tenant',
          btnText: 'Try Again',
          btnCancel: false,
        });
      }
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    getListCategory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Title txtStyle={styles.titleText} text="Edit Tenant" />
        <ScrollView
          style={styles.contentWrapper}
          showsVerticalScrollIndicator={false}>
          {renderFileData()}
          <ButtonKit
            source={require('../assets/photo.png')}
            wrapperStyle={styles.btnImage}
            onPress={chooseImage}
          />
          <View style={styles.contentContainer}>
            <TextInput
              style={
                tenant_name.length === 0
                  ? styles.inputStyleError
                  : styles.inputStyle
              }
              onChangeText={(text) => onChangeTenantName(text)}
              value={tenant_name}
              autoCapitalize="none"
              placeholder="Tenant Name"
            />
            <TextInput
              style={
                tenant_description.length === 0
                  ? styles.textAreaError
                  : styles.textArea
              }
              onChangeText={(text) => onChangeTenantDescription(text)}
              value={tenant_description}
              autoCapitalize="none"
              placeholder="Tenant Description"
              multiline
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
            onPress={() => checkData()}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default EditTenantPage;
