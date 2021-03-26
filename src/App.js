import Home from './pages/Homepage';

//Firestore
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './api/ApiKeys';

//Context
import {ApplicationProvider} from './context/ApplicationContext';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <ApplicationProvider>
      <Home></Home>
    </ApplicationProvider>
  );
}

export default App;
