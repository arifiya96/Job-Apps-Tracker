import clsx from 'clsx';

const columns = [
    {field:'position', renderHeader: () => (<strong style={{color:'white'}}>{'Position'}</strong>), width: 250, headerClassName: 'super-app-theme--header'},
    {field:'company', renderHeader: () => (<strong style={{color:'white'}}>{'Company'}</strong>), width: 250, headerClassName: 'super-app-theme--header'},
    {field:'yoe', renderHeader: () => (<strong style={{color:'white'}}>{'Years of Experience'}</strong>), width: 200, headerClassName: 'super-app-theme--header'},
    {field:'industry', renderHeader: () => (<strong style={{color:'white'}}>{'Industry'}</strong>), width: 150, headerClassName: 'super-app-theme--header'},
    {field:'city', renderHeader: () => (<strong style={{color:'white'}}>{'City'}</strong>), width: 150, headerClassName: 'super-app-theme--header'},
    {field:'country', renderHeader: () => (<strong style={{color:'white'}}>{'Country'}</strong>), width: 150, headerClassName: 'super-app-theme--header'},
    {field:'salary', renderHeader: () => (<strong style={{color:'white'}}>{'Salary PA (£)'}</strong>), width: 150, headerClassName: 'super-app-theme--header'},
    {field:'status', renderHeader: () => (<strong style={{color:'white'}}>{'Status'}</strong>), width: 150, headerClassName: 'super-app-theme--header',
    cellClassName: (status) => 
      clsx('super-app', {
        neutral: status.value === 'Application Submitted' || status.value === 'Passed Initial Screening, ongoing',
        negative: status.value === 'Straight rejection' || status.value === 'Rejected after initial screening',
        positive: status.value === 'Offer Received' 
      })
    },
    {field:'timestamp', renderHeader: () => (<strong style={{color:'white'}}>{'Last Updated'}</strong>), width: 200, headerClassName: 'super-app-theme--header'}
]

export default columns;