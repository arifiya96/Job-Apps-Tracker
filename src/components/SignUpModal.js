import React, {useContext} from 'react';

//UI Components
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

//Firestore
import firebase from 'firebase/app';
import 'firebase/auth';

export default function SignUpModal () {
    const [application, SetApplication] = useContext(ApplicationContext);

    const handleSignUp = () => {
        if (application.signUpEmail === '' || application.signUpPassword === '' || application.signUpPasswordConfirm === ''){
            alert('Please complete all fields!');
        } else if (application.signUpPassword.length < 8){
            alert('Password has to be a minimum of 8 characters!');
        } else if (application.signUpPassword !== application.signUpPasswordConfirm){
            alert('Passwords do not match!');
        } else {
            //Firebase authentication
            firebase.auth().createUserWithEmailAndPassword(application.signUpEmail, application.signUpPassword).then(() => {
                alert('Registration successful!');
                SetApplication(prevState => ({...prevState, isOpenSignUp: false, signUpEmail: '', signUpPassword: '', signUpPasswordConfirm: ''}));
            }).catch(error => {
                alert(error.message);
            })
        }
    }

    return (
        <div>
            <div>
                <button style={{float: 'right'}} onClick={() => SetApplication(prevState => ({...prevState, isOpenSignUp: false}))}>
                    <Close style={{margin: 10}}></Close>
                </button>
            </div>
            <h1 style={{fontWeight: 600, margin: '10px'}}>Sign up here. Many thanks for choosing to use this!</h1>
            <TextField id='standard-basic' label='Email Address' style={{margin: '10px', width: '95%'}} inputMode='email' value={application.signUpEmail} onChange={(event) => SetApplication(prevState => ({...prevState, signUpEmail: event.target.value}))}></TextField><br></br>
            <TextField id='standard-basic' label='Password (min 8 characters)' style={{margin: '10px', width: '95%'}} value={application.signUpPassword} type='password' onChange={(event) => SetApplication(prevState => ({...prevState, signUpPassword: event.target.value}))}></TextField><br></br>
            <TextField id='standard-basic' label='Confirm Password (min 8 characters)' style={{margin: '10px', width: '95%'}} value={application.signUpPasswordConfirm} type='password' onChange={(event) => SetApplication(prevState => ({...prevState, signUpPasswordConfirm: event.target.value}))}></TextField><br></br>
            <Button variant='contained' color='primary' style={{margin: '10px'}} onClick={() => handleSignUp()}>Confirm sign up</Button>
        </div>
    )
}