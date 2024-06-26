/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {normalize, getData, alertMessage, removeData} from '../utils';
import ButtonKit from '../components/ButtonKit';
import ButtonText from '../components/ButtonText';
import Title from '../components/Title';
import theme from '../theme';
import axios from 'axios';
import SpinnerKit from '../components/SpinnerKit';
import {AuthContext} from '../../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(20),
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnTxtAdd: {
    color: theme.colors.red,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnAddWrapper: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    marginBottom: normalize(10),
  },
  titleText: {
    fontSize: normalize(22),
  },
  boxContainer: {
    marginBottom: normalize(10),
    flexDirection: 'row',
    backgroundColor: theme.colors.white_background,
    borderRadius: 10,
    padding: 10,
  },
  imgTenantStyle: {
    width: '30%',
    height: 100,
    marginRight: 20,
  },
  titleTenant: {
    width: '65%',
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: normalize(18),
  },
  spinnerKitStyle: {
    marginTop: normalize(80),
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    width: '68%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

function ManageTenantPage({navigation}) {
  const [tenantData, setTenantData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    getTenantData();
  }, []);

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
      console.log(error);
      if (error.response.status === 401) {
        sessionTimedOut();
      }
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
      if (error.response.status === 401) {
        sessionTimedOut();
      }
    }
  }

  const getDataAdmin = async () => {
    const dataAdmin = await getData('adminData');
    if (dataAdmin) {
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
          resizeMode="contain"
        />
        <View>
          <Text style={styles.titleTenant} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.iconContainer}>
            <ButtonKit
              btnStyle={styles.iconStyle}
              source={require('../assets/view-red.png')}
              onPress={() =>
                navigation.navigate('TenantDetailPage', {
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
              source={require('../assets/edit-red.png')}
              onPress={() => {
                navigation.navigate('EditTenantPage', {
                  tenantId: item.tenantId,
                  tenantName: item.name,
                  tenantDescription: item.description,
                  tenantCategory: item.category,
                  tenantImage: item.image,
                  getTenantData: getTenantData,
                });
              }}
            />
            <ButtonKit
              btnStyle={styles.iconStyle}
              source={require('../assets/trash-red.png')}
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
        <ButtonText
          title="Add Tenant"
          txtStyle={styles.btnTxtAdd}
          wrapperStyle={styles.btnAddWrapper}
          onPress={() => {
            navigation.navigate('AddTenantPage', {
              getTenantData: getTenantData,
            });
          }}
        />
        <Title text="Manage Tenants" txtStyle={styles.titleText} />
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
