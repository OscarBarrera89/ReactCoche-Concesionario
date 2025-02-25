import { createDrawerNavigator } from '@react-navigation/drawer';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HomeScreen } from './navigation/screens/Home';
import { ListadoScreen } from './navigation/screens/Listado';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import AltaScreen from './navigation/screens/Alta';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Alta: AltaScreen,
    Listado: ListadoScreen,
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function App() {
  return <GluestackUIProvider mode="light"><Navigation /></GluestackUIProvider>;
}
