import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack ';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSession, init } from '../config/dbSqlLite';
import { setUser } from '../store/slices/userSlice';

const Navigation = () => {
  const idToken = useSelector((state) => state.user.idToken);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await init()
      const sessionUser = await fetchSession();
      dispatch(setUser(sessionUser));
    })();
  }, [dispatch]); 

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
