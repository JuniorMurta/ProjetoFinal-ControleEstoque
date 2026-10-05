import { StyleSheet } from 'react-native';

export const COLORS = { navy: '#063b7a', navy2: '#0a4c96', blue: '#1677e8', white: '#fff', bg: '#f4f7fb', text: '#0c234b', muted: '#60708d', line: '#dbe4f0', green: '#18a66a', greenBg: '#e5f7ef', red: '#dc2f35', redBg: '#fdebed', yellow: '#f2ae23', yellowBg: '#fff3d8', paleBlue: '#e9f2ff' };

export const ui = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.navy },
  scroll: { padding: 16, paddingBottom: 110, width: '100%', maxWidth: 1100, alignSelf: 'center' },
  topBar: { backgroundColor: COLORS.navy, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 4 },
  backText: { color: COLORS.white, fontSize: 42, fontWeight: '200', lineHeight: 42 },
  topIcon: { color: COLORS.white, fontSize: 40, fontWeight: '800', marginRight: 12 },
  topTitle: { color: COLORS.white, fontSize: 28, fontWeight: '800' },
  topSubtitle: { color: '#dbeaff', fontSize: 15, marginTop: 2 },
  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, backgroundColor: '#052f63', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#2b5d91', zIndex: 20 },
  navItem: { flex: 1, height: 64, alignItems: 'center', justifyContent: 'center' },
  navItemActive: { borderTopWidth: 3, borderTopColor: COLORS.white },
  navIcon: { color: '#c9d7eb', fontSize: 28, lineHeight: 30 },
  navIconActive: { color: COLORS.white },
  navText: { color: '#c9d7eb', fontSize: 12, marginTop: 2 },
  navTextActive: { color: COLORS.white, fontWeight: '800' },
  card: { backgroundColor: COLORS.white, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e4ebf4' },
  primaryButton: { backgroundColor: COLORS.navy2, borderRadius: 14, minHeight: 52, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  primaryText: { color: COLORS.white, fontSize: 15, fontWeight: '800' },
  secondaryButton: { backgroundColor: '#dce5f2', borderRadius: 14, minHeight: 52, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  secondaryText: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
  input: { backgroundColor: '#f8faff', borderWidth: 1, borderColor: '#cbd7e8', borderRadius: 13, minHeight: 54, paddingHorizontal: 16, color: COLORS.text, fontSize: 16 },
  label: { color: COLORS.text, fontSize: 15, fontWeight: '800', marginBottom: 8 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800', marginBottom: 10 },
});
