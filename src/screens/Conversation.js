import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import emojis from '../emot_default/emojis';
import { conversationStyles } from '../stylesheet/styles';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Emoji = ({ emoji, id }) => {
  const [, ref] = useDrag(() => ({
    type: 'EMOJI',
    item: { id },
    collect: (monitor) => {
      console.log(`Dragging ${emoji} with id ${id}`);
     // console.log(`Dragged item type is ${monitor.getItemType()}`);
      //console.log(`Dragged item is being dragged over: ${monitor.isOver()}`);
     // console.log(`Dragged item is being dragged over with rect: ${JSON.stringify(monitor.getOverClientOffset())}`);
      return {
        isDragging: monitor.isDragging(),
      };
    },
    end: (item, monitor) => {
      console.log(`Drag ended with item ${item.id}`);
      console.log(`Drag ended with drop result: ${JSON.stringify(monitor.getDropResult())}`);
    },
  }));

  return (
    <Text ref={ref} style={conversationStyles.emoji}>
      {emoji}
    </Text>
  );
};

const DropArea = ({ onDrop }) => {
  const [, ref] = useDrop(() => ({
    accept: 'EMOJI',
    drop: (item, monitor) => {
      console.log(`Dropped emoji with id ${item.id}`);
      console.log(`Dropped item is ${item.id}`);
      //console.log(`Dropped item type is ${monitor.getItemType()}`);
      //console.log(`Dropped item is being dropped with rect: ${JSON.stringify(monitor.getClientOffset())}`);
      const delta = monitor.getDifferenceFromInitialOffset();
      console.log(`Delta: ${JSON.stringify(delta)}`);
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      console.log(`New position: left ${left}, top ${top}`);
      onDrop(item.id, { left, top });
    },
    collect: (monitor) => {
      //console.log(`Drop area is over: ${monitor.isOver()}`);
      //onsole.log(`Drop area is being hovered with rect: ${JSON.stringify(monitor.getOverClientOffset())}`);
    },
    hover: (item, monitor) => {
      console.log(`Drop area is being hovered with item ${item.id}`);
    },
  }));

  return <View ref={ref} style={conversationStyles.dropArea} />;
};

const Conversation = () => {
  const [emojiList, setEmojiList] = React.useState([]);
  const selectedMood = useSelector(state => state.selectedMood);
  const dispatch = useDispatch();

  const handleDrop = (id, position) => {
    dispatch({ type: 'SET_EMOT_POSITION', payload: { id, position } });
  };

  React.useEffect(() => {
    fetch('https://emodon.onrender.com/api/emoji_choices/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEmojiList(data))
      .catch(error => {
        console.error('Error fetching emoji choices:', error);
        setEmojiList(emojis); // Use local emojis as fallback
      });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <View style={conversationStyles.container}>
        <View style={conversationStyles.emotionBubble}>
          <Text style={conversationStyles.selectedMoodText}>{selectedMood || 'Aucune émotion sélectionnée'}</Text>
        </View>
        <DropArea onDrop={handleDrop} />
        <ScrollView horizontal style={conversationStyles.emojiBar}>
          {emojiList.map((emoji, index) => (
            <Emoji key={index} emoji={emoji} id={index} />
          ))}
        </ScrollView>
      </View>
    </DndProvider>
  );
};

export default Conversation;
