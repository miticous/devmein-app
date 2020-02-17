import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from '../../services/auth';

const style = {
  input: {
    backgroundColor: 'yellow',
    width: '100%',
    textAlign: 'center',
    padding: 20
  }
};

const LoginContainer = ({ navigation }) => {
  const [state, setState] = useState({
    email: 'murilo@gmail.com',
    password: '123123'
  });

  const { email, password } = state;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <TextInput
        value={email}
        placeholder="E-mail"
        onChangeText={text => setState({ ...state, email: text })}
        style={style.input}
      />
      <TextInput
        value={password}
        placeholder="Senha"
        onChangeText={text => setState({ ...state, password: text })}
        style={style.input}
      />
      <Button onPress={async () => login({ ...state, navigation })} title="Login" />
      <Button onPress={() => navigation.navigate('SignUp')} title="SignUp" />
    </View>
  );
};

export default LoginContainer;
