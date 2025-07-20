import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/ThemeContext';
import GlassmorphismCard from '../GlassmorphismCard';

interface WarningModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

const WarningModal: React.FC<WarningModalProps> = ({
  visible,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  type = 'warning'
}) => {
  const { theme, mode } = useTheme();

  const getIconName = () => {
    switch (type) {
      case 'danger':
        return 'alert-circle';
      case 'info':
        return 'information';
      default:
        return 'alert';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return '#EF5350';
      case 'info':
        return '#42A5F5';
      default:
        return '#FF9800';
    }
  };

  const getConfirmButtonColor = () => {
    switch (type) {
      case 'danger':
        return '#EF5350';
      case 'info':
        return '#42A5F5';
      default:
        return '#FF9800';
    }
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    modalContent: {
      width: '100%',
      maxWidth: 320,
      borderRadius: 20,
      padding: 24,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
    },
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: `${getIconColor()}20`,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: -0.5,
    },
    message: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 24,
      letterSpacing: -0.2,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      width: '100%',
    },
    button: {
      flex: 1,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: theme.colors.elevation1,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    confirmButton: {
      backgroundColor: getConfirmButtonColor(),
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <GlassmorphismCard style={styles.modalContent}>
          {/* 아이콘 */}
          <View style={styles.iconContainer}>
            <Icon 
              name={getIconName()} 
              size={32} 
              color={getIconColor()} 
            />
          </View>

          {/* 제목 */}
          <Text style={styles.title}>{title}</Text>

          {/* 메시지 */}
          <Text style={styles.message}>{message}</Text>

          {/* 버튼 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </GlassmorphismCard>
      </View>
    </Modal>
  );
};

export default WarningModal; 