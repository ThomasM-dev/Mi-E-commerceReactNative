import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSession, init } from '../config/dbSqlLite';
import AuthStack from './AuthStack ';
import { clearUser, setUser } from '../store/slices/userSlice';

const Navigation = () => {
  const idToken = useSelector((state) => state.user.idToken);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await init();
        dispatch(clearUser());

        const sessionUser = await fetchSession();

        if (sessionUser) {
          const { email, idToken, localId } = sessionUser;

          dispatch(setUser({ email, idToken, localId }));
        } else {
          console.log('No se encontró un usuario en la sesión.');
        }
      } catch (error) {
        console.log(
          'Error al intentar obtener la sesión o procesar los datos:',
          error
        );
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
