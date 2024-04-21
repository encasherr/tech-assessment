import React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import OpLogin from './OpLogin';
import OpSignup from './OpSignup';
import OpInstituteSignup from './OpInstituteSignup';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box p={3}>
          <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

export default function OpLoginSignup(props) {
//   const classes = useStyles();
//   const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  
  return (

    <div className="container h-100">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 h-100 justify-content-center align-items-center">
                <AppBar color="default" position="static">
                    <Tabs variant="fullWidth" value={value} 
                            onChange={(e, newVal) => setValue(newVal)}>
                        <LinkTab label="LOG IN" href="page1" />
                        <LinkTab disabled={false} label="SIGN UP" href="page2" />
                        <LinkTab disabled={false} label="PARENT / INSTITUTE SIGN UP" href="page3" />
                    </Tabs>
                </AppBar>
                {value === 0 && 
                <TabContainer>
                    <OpLogin {...props} />
                </TabContainer>}
                {value === 1 && 
                <TabContainer>
                    <OpSignup />
                </TabContainer>}
                {value === 2 && 
                <TabContainer>
                    <OpInstituteSignup />
                </TabContainer>}        
        
            </div>
            <div className="col-md-2"></div>
        </div>
    </div>
  );
}


const TabContainer = (props) => {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

const LinkTab = (props) => {
    return <Tab onClick={event => event.preventDefault()} {...props} />;
}

// export default OpLoginSignup;
const styles = {
  fillwindow: { 
    height: '100%',
    position: 'absolute',
    left: 0,
    width: '100%',
    overflow: 'hidden'
  }
}