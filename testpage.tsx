import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
 import { useTranslation } from 'react-i18next';


const testpage: React.FC = () => {


  const {t} = useTranslation();


 

  return (
    <View style={styles.container}>
      
<Text style={styles.header}>{t('Eamil')}</Text>
      <Text style={styles.header}>{t('KEYWORD TO PACE HERE')}</Text>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },

});

export default testpage;
