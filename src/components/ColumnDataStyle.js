import { makeStyles } from '@material-ui/core/styles';

//styling for the data table
const useStyles = makeStyles({
    root: {
      '& .super-app-theme--header': {
        backgroundColor: 'rgb(0,0,0)'
      },
      '& .super-app.negative': {
        backgroundColor: '#d47483',
        color: '#1a3e72',
        fontWeight: '600',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      '& .super-app.positive': {
        backgroundColor: 'rgba(157,255,118,0.49)',
        color: '#1a3e72',
        fontWeight: '600',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      '& .super-app.neutral': {
        backgroundColor: '#f6f636',
        color: '#1a3e72',
        fontWeight: '600',
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }
})

export default useStyles;