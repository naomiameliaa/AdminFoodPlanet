import * as React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';
import theme from '../theme';
import {normalize} from '../utils';
import SpinnerKit from '../components/SpinnerKit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: normalize(10),
  },
  tenantImg: {
    width: '100%',
    height: 250,
  },
  txtTitle: {
    color: theme.colors.black,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  txtCategory: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  ratingNumber: {
    marginRight: 5,
  },
  descWrapper: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleDesc: {
    width: '35%',
    fontWeight: 'bold',
  },
  contentDesc: {
    flex: 1,
    textAlign: 'justify',
  },
});

function TenantDetailPage({route}) {
  const {
    tenantName,
    tenantDescription,
    tenantCategory,
    tenantImage,
    tenantRating,
  } = route.params;

  const renderBullet = (key, length) => {
    if (key < length - 1) {
      return <Text>&#8226;</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tenantImg}
        source={{uri: `data:image/jpeg;base64,${tenantImage}`}}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.txtTitle}>{tenantName}</Text>
        <Text style={styles.txtCategory}>
          {tenantCategory.map((item, key) => (
            <Text style={styles.categoryTenant} key={key}>
              {item}
              {renderBullet(key, tenantCategory.length)}
            </Text>
          ))}
        </Text>
        <View style={styles.ratingWrapper}>
          <Image
            source={require('../assets/star.png')}
            style={styles.ratingIcon}
          />
          <Text style={styles.ratingNumber}>
            {parseFloat(tenantRating).toFixed(1)} (rating)
          </Text>
        </View>
        <View style={styles.descWrapper}>
          <Text style={styles.titleDesc}> Description</Text>
          <Text style={styles.contentDesc}>"{tenantDescription}"</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TenantDetailPage;
