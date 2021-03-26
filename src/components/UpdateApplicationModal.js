import React, {useContext} from 'react';

//UI Components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PostAdd from '@material-ui/icons/PostAdd';
import Button from '@material-ui/core/Button';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function UpdateApplicationModal() {
    const [application, SetApplication] = useContext(ApplicationContext);

    const handleUpdate = () => {
        if (application.salary === 0 && application.status === null){
            alert('Please update at least one field');
          } else {
            if (application.salary !== 0 && application.status === null){
              firebase.firestore().collection('applications').doc(application.application_id).update({
                salary: application.salary,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                /*
                SetApplication(prevState => ({...prevState, salary: 0, application_id: null, isOpenUpdate: false}));
                */
                window.location.reload();
              })
            } else if (application.salary === 0 && application.status !== null){
              firebase.firestore().collection('applications').doc(application.application_id).update({
                status: application.status,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                /*
                SetApplication(prevState => ({...prevState, status: null, application_id: null, isOpenUpdate: false}));
                */
                window.location.reload();
              })
            } else {
              firebase.firestore().collection('applications').doc(application.application_id).update({
                status: application.status,
                salary: application.salary,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                /*
                SetApplication(prevState => ({...prevState, status: null, application_id: null, isOpenUpdate: false, salary: 0}));
                */
                window.location.reload();
              })
            }
          }
    }

    return (
        <div>
            <h3>Update salary or status</h3>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Salary</InputLabel>
                <Select value={application.salary} onChange={(event) => SetApplication(prevState => ({...prevState, salary: event.target.value}))}>
                    <MenuItem value={'Withheld'}>Cheeky bastards won't say</MenuItem>
                    <MenuItem value={20000}>£20,000</MenuItem>
                    <MenuItem value={22500}>£22,500</MenuItem>
                    <MenuItem value={25000}>£25,000</MenuItem>
                    <MenuItem value={27500}>£27,500</MenuItem>
                    <MenuItem value={30000}>£30,000</MenuItem>
                    <MenuItem value={32500}>£32,500</MenuItem>
                    <MenuItem value={35000}>£35,000</MenuItem>
                    <MenuItem value={37500}>£37,500</MenuItem>
                    <MenuItem value={40000}>£40,000</MenuItem>
                    <MenuItem value={42500}>£42,500</MenuItem>
                    <MenuItem value={45000}>£45,000</MenuItem>
                    <MenuItem value={47500}>£47,500</MenuItem>
                    <MenuItem value={50000}>£50,000</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Status</InputLabel>
                <Select value={application.status} onChange={(event) => SetApplication(prevState => ({...prevState, status: event.target.value}))}>
                    <MenuItem value={'Application Submitted'}>Application Submitted</MenuItem>
                    <MenuItem value={'Passed Initial Screening, ongoing'}>Passed Initial Screening, ongoing</MenuItem>
                    <MenuItem value={'Straight rejection'}>Straight rejection</MenuItem>
                    <MenuItem value={'Rejected after initial screening'}>Rejected after initial screening</MenuItem>
                    <MenuItem value={'Offer Recieved'}>Offer Recieved</MenuItem>
                </Select>
            </FormControl><br></br>
            <Button variant="contained" color="default" startIcon={<PostAdd></PostAdd>} style={{margin: 5}} onClick={() => handleUpdate()}>Update Application</Button>
        </div>
    )
}