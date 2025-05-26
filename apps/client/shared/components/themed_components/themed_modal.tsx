import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { ThemedView, ThemedText, ThemedButton } from '.';

interface ThemedModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ThemedModal({
  visible,
  onClose,
  title,
  children,
}: ThemedModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedView backgroundColor="primary" style={styles.modalInner}>
            <ThemedText variant="title" style={styles.modalTitle}>
              {title}
            </ThemedText>
            {children}
            <ThemedButton
              style={styles.closeButton}
              size="small"
              onPress={onClose}
            >
              ✕
            </ThemedButton>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    maxWidth: 400,
    maxHeight: '95%',
  },
  modalInner: {
    padding: 16,
    borderRadius: 8,
    position: 'relative',
  },
  modalTitle: {
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
