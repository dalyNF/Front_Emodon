import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  emoji: {
    fontSize: 40,
    margin: 10,
  },
  emotionBubble: {
    fontSize: 20,
    marginTop: 20,
  },
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emotionList: {
    width: '100%',
    alignItems: 'center',
  },
});

export const conversationStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emotionBubble: {
    width: '100%',
    height: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  emojiBar: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
});

export default styles;
