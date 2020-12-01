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
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: normalize(50),
    height: 45,
  },
  searchWrapper: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
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
    // borderColor: theme.colors.black,
    // borderWidth: 2,
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
  iconStyle: {
    borderColor: theme.colors.red,
    borderWidth: 2,
    width: 30,
    height: 30,
  },
  iconContainer: {
    // borderColor: theme.colors.green,
    // borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxtAdd: {
    color: theme.colors.red,
    fontSize: 20,
    fontWeight: 'bold',
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
        // 'https://food-planet.herokuapp.com/tenants/foodcourt',
        'http://172.18.0.1:8080/tenants/foodcourt',
        {
          params: {
            foodcourtId: foodcourtId,
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setTenantData(response.data.object);
        console.log('TENANT DATA: ', response.data.object);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
    setIsLoading(false);
  }

  async function deleteTenant(tenantId) {
    try {
      const response = await axios.delete(
        'http://172.18.0.1:8080/tenants/delete',
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
      <View>
        <ButtonText
          title="Add Tenant"
          txtStyle={styles.btnTxtAdd}
          wrapperStyle={styles.btnAddWrapper}
          onPress={() => {
            navigation.navigate('AddTenantPage');
          }}
        />
      </View>
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
