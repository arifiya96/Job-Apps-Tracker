import Home from './pages/Homepage';
import Login from './pages/Login';

//Firestore
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './api/ApiKeys';

//Context
import {ApplicationProvider} from './context/ApplicationContext';

//React router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Added this logic in because of some initialising error
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login></Login>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </ApplicationProvider>
  );
}

export default App;
