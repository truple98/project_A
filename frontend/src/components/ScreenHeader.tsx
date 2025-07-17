// 1. React 및 외부 라이브러리 임포트
import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { IconButton, Text } from 'react-native-paper'; // react-native-paper 사용
import { useNavigation } from '@react-navigation/native';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface ScreenHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

// 5. 컴포넌트 함수 정의
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
}) => {
  // 5.1 Hooks 선언
  const navigation = useNavigation();
  const { theme, mode } = useTheme();

  // 5.3 이벤트 핸들러 및 유틸리티 함수
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }, [onBackPress, navigation]);

  // 5.5 JSX 반환
  return (
    <View style={[
      styles.headerContainer,
      { 
        backgroundColor: theme.colors.elevation1 || theme.colors.surface,
        ...Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          },
          android: { elevation: 3 },
        }),
      }
    ]}>
      <StatusBar 
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      <View style={styles.headerContent}>
        {showBackButton ? (
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.text}
            size={24}
            onPress={handleBackPress}
            style={styles.backButton}
          />
        ) : (
          <View style={styles.rightSpace} />
        )}
        <Text style={[
          styles.title, 
          { 
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '700',
          }
        ]}>{title}</Text>
        <View style={styles.rightSpace} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 20,
    paddingBottom: 16, // md spacing
    paddingHorizontal: 16, // md spacing
    borderRadius: 16, // lg border radius
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    margin: 0,
    marginRight: 8, // sm spacing
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  rightSpace: {
    width: 24,
  },
});

export default ScreenHeader;