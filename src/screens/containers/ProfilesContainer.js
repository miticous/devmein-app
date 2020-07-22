/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ProfilesComponent from '../components/ProfilesComponent';
import { GET_PROFILES, GET_PROFILE, GET_HOME } from '../../graphQL/query';
import { LIKE, UNLIKE } from '../../graphQL/mutation';

const texts = [
  {
    title: 'Instinto',
    subtitle: 'Escorpião no ascendente (casa 1) e Marte em Gêmeos na casa 8',
    text:
      'Quanto ao meu instinto, tenho temperamento introspectivo, estratégico e com forte poder mental. Sou uma pessoa impulsiva e indecisa nos pensamentos e ações; sofro por constantes arrependimentos. Tenho especial interesse por assuntos relacionados a psique, sexo e mistérios.'
  },
  {
    title: 'Sexo',
    subtitle: 'Casa 8 em Gêmeos e Mercúrio em Áries',
    text: 'Me excito com os pensamentos e conversas sobre sexo e me realizo rapidamente.'
  },
  {
    title: 'Namoro',
    subtitle: 'Peixes na casa 5 e Júpiter em Sagitário na casa 2',
    text:
      'No namoro, sou uma pessoa bondosa, expansiva, bem humorada, divertida, franca e justa. Sou sociável e com muita sorte na vida. Tenho interesse por religiões, pela justiça terrena e divina, por viagens e assuntos relacionados com o exterior. Gosto das coisas boas e finas.'
  },
  {
    title: 'Emocao',
    subtitle: 'Lua em Touro na casa 7',
    text:
      'Emocionalmente, sou uma pessoa simples e sensual, que busca segurança, comodidade e conforto. Não tomo decisões precipitadas. Minhas emoções se voltam para o casamento ou união, apresentando forte sentimento de posse em minhas relações.'
  },
  {
    title: 'Intelecto',
    subtitle: 'Mercúrio em Áries na casa 6',
    text:
      'Tenho uma forma de pensar confiante, impulsiva, combativa e corajosa. Individualista, impaciente e ágil, desenvolvo minhas tarefas de forma solitária. Sou capaz de enfrentar grandes desafios, mas canso rápido. Meus pensamentos se voltam para o trabalho.'
  },
  {
    title: 'Personalidade',
    subtitle: 'Sol em Peixes na casa 5',
    text:
      'De grande sensibilidade, vivo simultaneamente nos planos material e espiritual. Eu me descuido das coisas práticas que a vida exige. Minha gentileza é tão grande que me inclino a assumir culpa pelos erros dos outros. Sou uma pessoa orgulhosa e empreendedora. Tenho minhas atenções dirigidas para o amor, filhos e artes.'
  },
  {
    title: 'Amor',
    subtitle: 'Vênus em Áries na casa 6',
    text:
      'Sou uma pessoa apaixonada e ciumenta. Tenho talento artístico. Gosto de pessoas decididas. Eu coloco meu foco no trabalho, onde desenvolvo minhas tarefas com amor'
  }
];

const onMoveTop = async ({ setTutorialDone, tutorialDone, like, id }) => {
  if (!tutorialDone) {
    await AsyncStorage.setItem('@jintou:tutorial_done', 'true');
    setTutorialDone(true);
  }

  await like({
    variables: {
      userLikedId: id
    }
  });
};

const onMoveBottom = async ({ setTutorialDone, tutorialDone, unlike, id }) => {
  if (!tutorialDone) {
    await AsyncStorage.setItem('@jintou:tutorial_done', 'true');
    setTutorialDone(true);
  }

  await unlike({
    variables: {
      userUnlikedId: id
    }
  });
};

const verifyTutorialStatus = async ({ setTutorialDone }) => {
  const teste = await AsyncStorage.getItem('@jintou:tutorial_done');

  if (!teste) {
    return setTutorialDone(false);
  }
  return setTutorialDone(true);
};

const ProfilesContainer = ({ navigation, route }) => {
  const [tutorialDone, setTutorialDone] = React.useState(false);
  const [showHelperInitial, setShowHelperInitial] = React.useState(true);
  const [showHelperFinal, setShowHelperFinal] = React.useState(false);

  const client = useApolloClient();

  const { data: profileQuery } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first'
  });

  const { data: cachedData } = client.cache;

  const { data, loading: loadingQuery } = useQuery(GET_PROFILES, {
    variables: {
      searchType: route?.params?.searchType
    },
    skip: !cachedData?.data?.ROOT_QUERY?.geoLocationSent
  });

  const [like] = useMutation(LIKE, {
    variables: {
      type: route?.params?.searchType
    },
    onCompleted: ({ likeSomeone }) => {
      if (likeSomeone?.name) {
        Alert.alert('Novo match!', `Você deu match com ${likeSomeone?.name}`, [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      }
    },
    refetchQueries: ({ data: _data }) => {
      if (_data?.likeSomeone) {
        return [{ query: GET_HOME }];
      }
      return false;
    },
    notifyOnNetworkStatusChange: true
  });

  const [unlike] = useMutation(UNLIKE, {
    variables: {
      type: route?.params?.searchType
    }
  });

  React.useEffect(() => {
    verifyTutorialStatus({ setTutorialDone });
  }, []);

  return (
    <ProfilesComponent
      texts={texts}
      showHelperInitial={showHelperInitial}
      showHelperFinal={showHelperFinal}
      tutorialDone={tutorialDone}
      isProfilesLoading={loadingQuery}
      profiles={data?.profiles}
      setShowHelperInitial={setShowHelperInitial}
      setShowHelperFinal={setShowHelperFinal}
      userProfile={profileQuery?.profile}
      onPressHeaderLeft={() => navigation.navigate('Profile')}
      onMoveTop={id => onMoveTop({ tutorialDone, like, id, setTutorialDone })}
      onMoveBottom={id => onMoveBottom({ tutorialDone, unlike, id, setTutorialDone })}
    />
  );
};

ProfilesContainer.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      searchType: PropTypes.string.isRequired
    })
  }).isRequired
};

export default ProfilesContainer;
