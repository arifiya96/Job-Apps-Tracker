import React, {useContext, useEffect} from 'react';

//UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import SignUpModal from '../components/SignUpModal';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

//Firestore
import firebase from 'firebase/app';
import 'firebase/auth';

//React Router
import {useHistory} from 'react-router-dom';

export default function Login(){
    const [application, SetApplication] = useContext(ApplicationContext);
    const history = useHistory();

    const handleLogin = () => {
        if (application.loginEmail === '' || application.loginPassword === ''){
            alert('Please fill a field in');
        } else {
            firebase.auth().signInWithEmailAndPassword(application.loginEmail, application.loginPassword).then(user => {
                SetApplication(prevState => ({...prevState, loginEmail: '', loginPassword: ''}));
                localStorage.setItem('uid', user.user.uid);
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    useEffect(() => {
        //Authentication logic
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                SetApplication(prevState => ({...prevState, uid: user.uid}));
                history.push('/home');
            }
        })
    },[history, SetApplication]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpeg'})`, height: '100vh', backgroundSize: '100%'}}> {/*Higher order components div*/}
            <div style={{width: '30%', marginTop: '25%', borderRadius: '10px', marginBottom: '25%', backgroundColor: 'white', borderStyle: 'outset'}}>{/*Card element for login*/}<br></br>
                <h1 style={{fontWeight: 600, margin: '10px'}}>A personalized job app tracker</h1>
                <p style={{margin: '10px'}}>A simple way for you to track the jobs that you apply to. Log in or sign up.</p>
                <TextField id='standard-basic' label='Email Address' style={{margin: '10px', width: '95%'}} inputMode='email' value={application.loginEmail} onChange={(event) => SetApplication(prevState => ({...prevState, loginEmail: event.target.value}))}></TextField><br></br>
                <TextField id='standard-basic' label='Password' style={{margin: '10px', width: '95%'}} type='password' value={application.loginPassword} onChange={(event) => SetApplication(prevState => ({...prevState, loginPassword: event.target.value}))}></TextField><br></br>
                <Button variant='contained' color='primary' style={{margin: '10px'}} onClick={() => handleLogin()}>Login</Button>
                <Button variant='contained' color='primary' style={{margin: '10px'}} onClick={() => SetApplication(prevState => ({...prevState, isOpenSignUp: true}))}>Sign Up</Button>
                <Modal isOpen={application.isOpenSignUp} onRequestClose={() => SetApplication(prevState => ({...prevState, isOpenSignUp: false}))}
                style={{
                    content: {
                        width: '25%',
                        height: '50%'
                    }
                }}>
                    <SignUpModal></SignUpModal>
                </Modal>
            </div>
        </div>
    )
}

