import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const Navigation = () => {
  const [user, setUser] = useState(null)
  return (
    <NavigationContainer>
      {user?  <TabNavigator/> : <AuthStack/> }
    </NavigationContainer>
  );
};

export default Navigation;
