
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    gridBox: {
      boxSizing: 'none',
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      width: '100%',
      height: '100%',
    },
    flexBox: {
      display: 'flex',
      flexDirection: 'row',
    },
    leftSide: {
      border: '2px solid',
    },
    rightSide: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      border: '2px solid',
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
      elevation: 24,
      margin: theme.spacing(2),
      height: 'auto',
    },
    footBar: {
      top: 'auto',
      bottom: 0,
    },
  }));

module.exports = useStyles;