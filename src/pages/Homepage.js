import React, {useEffect, useContext} from 'react';

//UI Components
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Work from '@material-ui/icons/Work';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Modal from 'react-modal';

//External app components
import columns from '../components/ColumnData';
import useStyles from '../components/ColumnDataStyle';
import AddApplicationModal from '../components/AddApplicationModal';
import UpdateApplicationModal from '../components/UpdateApplicationModal';

//Firestore
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

//React router
import {useHistory} from 'react-router-dom';

export default function Home(){
    //State to store data from useEffect hook
    /*
    const [rows, SetRows] = useState([]);
    */

    //Application state data
    const [application, SetApplication] = useContext(ApplicationContext);

    const classes = useStyles();
    const history = useHistory();

    const handleUpdateModal = (id) => {
        SetApplication(prevState => ({...prevState, isOpenUpdate: true}));
        SetApplication(prevState => ({...prevState, application_id: id}));
    }

    const handleLogout = () => {
      firebase.auth().signOut().then(() => {
        alert('You have now signed out. Click ok to continue.');
        localStorage.clear();
        history.push('/');
      }).catch(error => {
        alert(error.message);
      })
    }

    useEffect(() => {
        firebase.firestore().collection(localStorage.getItem('uid')).onSnapshot(querySnapshot => {
          const jobs_array = [];
          querySnapshot.forEach(documentSnapshot => {
            jobs_array.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          jobs_array.forEach(job => job.timestamp = job.timestamp.toDate())
          SetApplication(prevState => ({...prevState, rows: jobs_array}));
        });
      }, [SetApplication]);

    return (
        <div> {/*<-- Higher order component*/}
            <h1 style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Job Application Progress</h1>
            {localStorage.getItem('uid') !== 'I24IqDUfKeTjKcOXGSmrrrGkQsD2' ?  
            <Button variant="contained" color="default" startIcon={<Work></Work>} style={{margin: 5}} onClick={() => SetApplication(prevState => ({...prevState, isOpenAdd: true}))}>Add new application</Button> : 
            null}
            <Button variant="contained" color="secondary" startIcon={<ExitToApp></ExitToApp>} style={{margin: 5}} onClick={() => handleLogout()}>Log out</Button>
            <div style={{height: 500, width: '100%', margin: 5}} className={classes.root}>
                <DataGrid rows={application.rows} columns={columns} onRowClick={(job) => handleUpdateModal(job.row.id)}></DataGrid>
            </div>  
            <Modal isOpen={application.isOpenAdd} onRequestClose={() => SetApplication(prevState => ({...prevState, isOpenAdd: false}))}>
                <AddApplicationModal></AddApplicationModal>
            </Modal>
            <Modal isOpen={application.isOpenUpdate} onRequestClose={() => SetApplication(prevState => ({...prevState, isOpenUpdate: false}))}>
                <UpdateApplicationModal></UpdateApplicationModal>
            </Modal>
        </div>
    )
};