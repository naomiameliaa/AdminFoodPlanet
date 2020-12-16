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
  },
  innerContainer: {
    padding: normalize(10),
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
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    fontSize: 18,
    paddingHorizontal: normalize(50),
    height: 45,
  },
  searchWrapper: {
    flexDirection: 'row',
    marginHorizontal: normalize(30),
    marginVertical: normalize(20),
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
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTxtAdd: {
    color: theme.colors.white,
    backgroundColor: theme.colors.red,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 8,
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
        'https://food-planet.herokuapp.com/tenants/foodcourt',
        {
          params: {
            foodcourtId: foodcourtId,
          },
        },
      );
      if (response.data.msg === 'Query success') {
        setTenantData(response.data.object);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
    setIsLoading(false);
  }

  async function deleteTenant(tenantId) {
    try {
      const response = await axios.delete(
        'https://food-planet.herokuapp.com/tenants/delete',
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
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <ButtonText
            title="Add Tenant"
            txtStyle={styles.btnTxtAdd}
            wrapperStyle={styles.btnAddWrapper}
            onPress={() => {
              navigation.navigate('AddTenantPage');
            }}
          />
        </View>
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
      </View>
    </SafeAreaView>
  );
}

export default ManageTenantPage;
