import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n, { changeLanguage } from './i18n';

const TranslateScreen: React.FC = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  const languages = [
    { code: 'en', name: 'English' },
    // { code: 'fr', name: 'French' },
    { code: 'et', name: 'Estonian' },
  ];

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await changeLanguage(languageCode); // Call the imported function to handle language update
      setSelectedLanguage(languageCode); // Update local state for UI
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('SEARCH')}</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              item.code === selectedLanguage && styles.selectedLanguageItem,
            ]}
            onPress={() => handleLanguageChange(item.code)} // Call the centralized handler
          >
            <Text style={styles.languageText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguageItem: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  languageText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TranslateScreen;
