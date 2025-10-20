import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { backgroundColor: '#f0f0f0', paddingTop: 20, paddingLeft: 20, paddingRight: 20 },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 15,
    fontSize: 60,
    fontWeight: 'condensedBold',
    color: 'green',
    textAlign: 'center',
  },
});
