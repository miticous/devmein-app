import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const ChatComponent = ({
  loading,
  messages,
  userId,
  inputValue,
  onChangeInput,
  onSubmit,
  participant
}) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>{participant}</Text>
    </View>
    <View style={{ flex: 5, justifyContent: 'flex-end', paddingHorizontal: 5 }}>
      {messages &&
        messages.map(message => (
          <Text
            key={message._id}
            style={{
              textAlign: message.sender_id === userId ? 'right' : 'left',
              fontSize: 30
            }}
          >
            {message.text}
          </Text>
        ))}
    </View>

    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8F8F8F',
        flexDirection: 'row'
      }}
    >
      <View style={{ flex: 3 }}>
        <TextInput
          value={inputValue}
          onChangeText={text => onChangeInput(text)}
          style={{ padding: 20, fontSize: 30 }}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Button title="Enviar" onPress={onSubmit} />
      </View>
    </View>
  </View>
);

export default ChatComponent;
