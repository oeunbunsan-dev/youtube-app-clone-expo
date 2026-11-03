import { PermissionType, useAppPermissions } from '@/hooks/use-app-permissions';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface PermissionGateProps {
  permissions: PermissionType[];
  children: React.ReactNode;
  title?: string;
  message?: string;
  buttonText?: string;
  containerStyle?: ViewStyle;
}

export function PermissionGate({
  permissions,
  children,
  title = "ត្រូវការការអនុញ្ញាត",
  message = "កម្មវិធីត្រូវការសិទ្ធិដើម្បីដំណើរការមុខងារនេះ។",
  buttonText = "ផ្តល់សិទ្ធិអនុញ្ញាត",
  containerStyle,
}: PermissionGateProps) {
  const { isLoading, hasAllPermissions, requestAllPermissions } = useAppPermissions(permissions);

  // ១. បើកំពុង Loading ឱ្យបង្ហាញ View ទទេ ឬ Loading Spinner
  if (isLoading) {
    return <View style={[styles.container, containerStyle]} />;
  }

  // ២. បើមានសិទ្ធិគ្រប់គ្រាន់ហើយ ឱ្យវាបង្ហាញ Component ខាងក្នុង (Children) ភ្លាមៗ
  if (hasAllPermissions) {
    return <>{children}</>;
  }

  // ៣. បើអត់ទាន់មានសិទ្ធិទេ បង្ហាញ UI សុំសិទ្ធិ
  return (
    <View style={[styles.container, styles.centered, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={requestAllPermissions} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#000' },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
