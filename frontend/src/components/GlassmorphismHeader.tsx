// 1. React 및 외부 라이브러리 임포트
import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 2. 내부 컴포넌트 및 유틸리티 임포트
import GlassmorphismCard from './GlassmorphismCard';
import { useTheme } from '../theme/ThemeContext';

// 3. 타입 정의
interface GlassmorphismHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  backButtonIcon?: string;
  backButtonText?: string;
}

// 4. 컴포넌트 함수 정의
export const GlassmorphismHeader: React.FC<GlassmorphismHeaderProps> = ({
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  rightComponent,
  backButtonIcon = 'arrow-left',
  backButtonText = '←',
}) => {
  // 4.1 Hooks 선언
  const navigation = useNavigation();
  const { theme } = useTheme();

  // 4.2 이벤트 핸들러
  const handleBackPress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }, [onBackPress, navigation]);

  // 4.3 JSX 반환
  return (
    <GlassmorphismCard style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          {backButtonIcon ? (
            <Icon name={backButtonIcon} size={20} color={theme.colors.text} />
          ) : (
            <Text style={[styles.backButtonText, { color: theme.colors.text }]}>
              {backButtonText}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightComponent ? (
        rightComponent
      ) : (
        <View style={styles.backButton} />
      )}
    </GlassmorphismCard>
  );
};

// 5. 스타일 정의
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
    marginHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '400',
  },
});

export default GlassmorphismHeader; 