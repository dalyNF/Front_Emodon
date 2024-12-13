import React from 'react';
import { View, Text, Button } from 'react-native';
import { homeStyles } from '../stylesheet/styles';
import { useNavigate } from 'react-router-dom';
import emotions from '../emot_default/emotions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedMood = useSelector((state) => state.selectedMood);
  const [moods, setMoods] = React.useState([]);

  React.useEffect(() => {
    fetch('https://emodon.onrender.com/api/mood_choices/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMoods(data))
      .catch(error => {
        console.error('Error fetching mood choices:', error);
        setMoods(emotions); // Use local emotions as fallback
      });
  }, []);

  const handleNavigateToConversation = (mood) => {
    dispatch({ type: 'SET_MOOD', payload: mood });
    navigate('/conversation');
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Comment vous sentez-vous aujourd'hui ?</Text>
      <View style={homeStyles.emotionList}>
        {moods.map((mood, index) => (
          <Button key={index} title={mood} onPress={() => handleNavigateToConversation(mood)} />
        ))}
      </View>
      <Button title="Aller à la conversation" onPress={() => handleNavigateToConversation(selectedMood)} />
    </View>
  );
};

export default Home;
