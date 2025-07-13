import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import GradientBackground from '../theme/GradientBackground';

interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <GradientBackground gradientType="primary" style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <View style={styles.headerContent}>
        {showBackButton && (
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.text}
            size={24}
            onPress={handleBackPress}
            style={styles.backButton}
          />
        )}
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <View style={styles.rightSpace} />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    margin: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightSpace: {
    width: 40, // backButton과 같은 너비로 중앙 정렬
  },
});

export default ScreenHeader; 