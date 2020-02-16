import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { signUp } from '../../services/auth';

const style = {
  input: {
    backgroundColor: 'yellow',
    width: '100%',
    textAlign: 'center',
    padding: 20
  }
};

const SignUpContainer = ({ navigation }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, password, email } = state;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={name}
        placeholder="Nome"
        onChangeText={name => setState({ ...state, name })}
        style={style.input}
      />
      <TextInput
        value={email}
        placeholder="E-mail"
        onChangeText={email => setState({ ...state, email })}
        style={style.input}
      />
      <TextInput
        value={password}
        placeholder="Senha"
        onChangeText={password => setState({ ...state, password })}
        style={style.input}
      />
      <Button onPress={async () => signUp({ ...state, navigation })} title="Criar conta" />
    </View>
  );
};

export default SignUpContainer;
