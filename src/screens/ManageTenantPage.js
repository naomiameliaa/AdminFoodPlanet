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
  FlatList,
} from 'react-native';
import {normalize, getData, alertMessage} from '../utils';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import SpinnerKit from '../components/SpinnerKit';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    borderColor: 'red',
    borderWidth: 2,
  },
  contentContainer: {
    borderColor: theme.colors.black,
    borderWidth: 2,
    // paddingHorizontal: normalize(30),
  },
  boxContainer: {
    borderColor: theme.colors.black,
    borderWidth: 2,
    marginBottom: normalize(20),
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: normalize(24),
  },
  inputStyle: {
=======
    padding: normalize(20),
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contentContainer: {},
  boxContainer: {
    marginBottom: normalize(20),
    flexDirection: 'row',
    backgroundColor: theme.colors.light_grey,
    borderRadius: 10,
  },
  txtStyle: {
    marginBottom: 0,
  },
  searchStyle: {
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: normalize(50),
    height: 45,
  },
  searchWrapper: {
    flexDirection: 'row',
<<<<<<< HEAD
    marginHorizontal: normalize(20),
=======
    marginHorizontal: normalize(30),
    marginVertical: normalize(20),
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  },
  iconSearch: {
    height: 22,
    width: 22,
    marginVertical: normalize(10),
    marginRight: -normalize(35),
    zIndex: 1,
  },
  imgTenantStyle: {
    width: 70,
    height: 70,
    marginRight: 20,
    borderRadius: 5,
  },
  titleTenant: {
<<<<<<< HEAD
    // borderColor: theme.colors.black,
    // borderWidth: 2,
=======
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
  iconStyle: {
<<<<<<< HEAD
    borderColor: theme.colors.red,
    borderWidth: 2,
=======
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    width: 30,
    height: 30,
  },
  iconContainer: {
<<<<<<< HEAD
    // borderColor: theme.colors.green,
    // borderWidth: 2,
=======
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxtAdd: {
<<<<<<< HEAD
    color: theme.colors.red,
    fontSize: 20,
    fontWeight: 'bold',
=======
    color: theme.colors.white,
    backgroundColor: theme.colors.red,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 8,
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
  },
  btnAddWrapper: {
    width: '30%',
    alignSelf: 'flex-end',
  },
});

function ManageTenantPage({navigation}) {
  const [tenantData, setTenantData] = React.useState(null);
  const [searchWord, onChangeSearchWord] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getTenantData();
  }, []);

  async function getTenantData() {
    setIsLoading(true);
    const foodcourtId = await getDataAdmin();
    try {
      const response = await axios.get(
<<<<<<< HEAD
        // 'https://food-planet.herokuapp.com/tenants/foodcourt',
        'http://172.18.0.1:8080/tenants/foodcourt',
=======
        'https://food-planet.herokuapp.com/tenants/foodcourt',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        {
          params: {
            foodcourtId: foodcourtId,
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setTenantData(response.data.object);
<<<<<<< HEAD
        console.log('TENANT DATA: ', response.data.object);
=======
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
    setIsLoading(false);
  }

  async function deleteTenant(tenantId) {
    try {
      const response = await axios.delete(
<<<<<<< HEAD
        'http://172.18.0.1:8080/tenants/delete',
=======
        'https://food-planet.herokuapp.com/tenants/delete',
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        {
          params: {
            tenantId: tenantId,
          },
        },
      );
      if (response.status === 200) {
        getTenantData();
      }
    } catch (error) {
      console.log(error);
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

  function remove(tenantId) {
    alertMessage({
      titleMessage: 'Warning !',
      bodyMessage: 'Are you sure to delete this tenant ?',
      btnText: 'No',
      secondBtnText: 'Yes',
      secondOnPressOK: () => deleteTenant(tenantId),
      btnCancel: true,
    });
  }

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.boxContainer}>
        <Image
          style={styles.imgTenantStyle}
          source={{uri: `data:image/jpeg;base64,${item.image}`}}
        />
        <View>
          <Text style={styles.titleTenant}>{item.name}</Text>
          <View style={styles.iconContainer}>
            <ButtonKit
              btnStyle={styles.iconStyle}
              source={require('../assets/view-icon.png')}
              onPress={() =>
                navigation.navigate('TenantDetailPage', {
                  tenantId: item.tenantId,
                  tenantName: item.name,
                  tenantDescription: item.description,
                  tenantCategory: item.category,
                  tenantImage: item.image,
                  tenantRating: item.rating,
                })
              }
            />
            <ButtonKit
              btnStyle={styles.iconStyle}
              source={require('../assets/edit.png')}
              onPress={() => {
                navigation.navigate('EditTenantPage', {
                  tenantId: item.tenantId,
                  tenantName: item.name,
                  tenantDescription: item.description,
                  tenantCategory: item.category,
                  tenantImage: item.image,
                  tenantRating: item.rating,
                });
              }}
            />
            <ButtonKit
              btnStyle={styles.iconStyle}
              source={require('../assets/delete-icon.png')}
              onPress={() => remove(item.tenantId)}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <View>
=======
      <View style={styles.headerContainer}>
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        <ButtonText
          title="Add Tenant"
          txtStyle={styles.btnTxtAdd}
          wrapperStyle={styles.btnAddWrapper}
          onPress={() => {
            navigation.navigate('AddTenantPage');
          }}
        />
      </View>
<<<<<<< HEAD
      <View style={styles.headerContainer}>
        <Title text="Manage Tenants" txtStyle={styles.titleStyle} />
        <View style={styles.searchWrapper}>
          <Image
            style={styles.iconSearch}
            source={require('../assets/search.png')}
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => onChangeSearchWord(text)}
            value={searchWord}
            placeholder="Search Tenant"
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
=======
      <Title text="Manage Tenants" txtStyle={styles.txtStyle} />
      <View style={styles.searchWrapper}>
        <Image
          style={styles.iconSearch}
          source={require('../assets/search.png')}
        />
        <TextInput
          style={styles.searchStyle}
          onChangeText={(text) => onChangeSearchWord(text)}
          value={searchWord}
          placeholder="Search Tenant"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
>>>>>>> 5269fca4381fbf5f3846c33d5fdd6d2b885c0d0e
        {isLoading ? (
          <SpinnerKit sizeSpinner="large" style={styles.spinnerKitStyle} />
        ) : (
          <FlatList
            data={tenantData}
            renderItem={({item, index}) => renderItem({item, index})}
            keyExtractor={(item) => item.tenantId.toString()}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ManageTenantPage;
