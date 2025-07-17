import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../../types';
import { useTheme } from '../../theme/ThemeContext';

type SideMenuNavigationProp = StackNavigationProp<RootStackParamList>;

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose }) => {
  const navigation = useNavigation<SideMenuNavigationProp>();
  const { theme, mode } = useTheme();

  const menuItems = [
    { id: 'home', title: '홈', icon: 'home', route: 'Home' as keyof RootStackParamList },
    { id: 'achievement', title: '업적', icon: 'trophy', route: 'Achievement' as keyof RootStackParamList },
    { id: 'history', title: '기록', icon: 'history', route: 'History' as keyof RootStackParamList },
    { id: 'store', title: '스토어', icon: 'store', route: 'Store' as keyof RootStackParamList },
    { id: 'encyclopedia', title: '도감', icon: 'book-open-variant', route: 'Encyclopedia' as keyof RootStackParamList },
    { id: 'settings', title: '설정', icon: 'cog', route: 'Settings' as keyof RootStackParamList },
    { id: 'help', title: '도움말', icon: 'help-circle', route: 'Help' as keyof RootStackParamList },
  ];

  const handleMenuPress = (route: keyof RootStackParamList) => {
    onClose();
    navigation.navigate(route as any);
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={[
        styles.menuContainer,
        { backgroundColor: theme.colors.surface }
      ]}>
        <View style={styles.header}>
          <Text style={[
            styles.menuTitle,
            { 
              color: theme.colors.text,
              fontSize: theme.typography.sizes.xl,
              fontWeight: theme.typography.weights.bold,
            }
          ]}>메뉴</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                { borderBottomColor: theme.colors.elevation1 }
              ]}
              onPress={() => handleMenuPress(item.route)}
            >
              <View style={styles.menuItemContent}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  color={theme.colors.primary} 
                  style={styles.menuIcon}
                />
                <Text style={[
                  styles.menuItemText,
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.medium,
                  }
                ]}>{item.title}</Text>
              </View>
              <Icon 
                name="chevron-right" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuTitle: {
    letterSpacing: -0.3,
  },
  closeButton: {
    padding: 4,
  },
  menuList: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemText: {
    letterSpacing: -0.2,
  },
});

export default SideMenu; 