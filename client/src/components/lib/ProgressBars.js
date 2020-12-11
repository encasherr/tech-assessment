import LinearProgress from '@material-ui/core/LinearProgress';
import { info, primary, success, secondary, warning } from './ColorCodes';
import { withStyles } from '@material-ui/core/styles';

const theme = {
    root: {
        marginTop: '5%'
    }
}

export const BorderLinearProgressPrimary = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    //   marginTop: '5%'
    },
    colorPrimary: {
    //   backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 20 : 30],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: primary.main,
    },
  }))(LinearProgress);
  
export const BorderLinearProgressWarning = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    //   marginTop: '5%'
    },
    colorPrimary: {
    //   backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 20 : 30],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: warning.main
    },
  }))(LinearProgress);
  
export const BorderLinearProgressSecondary = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    //   marginTop: '5%'
    },
    colorPrimary: {
    //   backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 20 : 30],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: secondary.main,
    },
  }))(LinearProgress);

export const BorderLinearProgressInfo = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    //   marginTop: '5%'
    },
    colorPrimary: {
    //   backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 20 : 30],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: info.main,
    },
  }))(LinearProgress);

  export const BorderLinearProgressSuccess = withStyles((theme) => ({
    root: {
      height: 20,
      borderRadius: 5,
    //   marginTop: '5%'
    },
    colorPrimary: {
    //   backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 20 : 30],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: success.main,
    },
  }))(LinearProgress);