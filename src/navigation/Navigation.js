import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthStack from "./AuthStack ";
import { useSelector } from 'react-redux';

const Navigation = () => {
  const idToken = useSelector(state => state.user.idToken)
    
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
};

export default Navigation;
