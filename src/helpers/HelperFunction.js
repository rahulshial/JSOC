
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  Button: {
    lineHeight: 1,
}
});

export default function HelperFunction() {
  const classes = useStyles();
  
  const getColumnLabel = (state, column) => {
    let columnLabel = '';
    if(column.id === 'rsvp_required') {
      if(state.userLogged) {
        if(state.userType === 'MEM') {
          columnLabel = column.label;
        } else {
          columnLabel = 'Delete'
        }
      } else {
        columnLabel = column.label
      }
    } else if(column.id === 'edit') {
      if(state.userLogged) {
        if(state.userType !== 'MEM') {
          columnLabel = column.label;
        }
      } else {
        columnLabel = ''
      }
    } else {
      columnLabel = column.label
    };
    return columnLabel;
  };

  const getEventValue = (state, event, column) => {
    let eventValue = '';
    if(column.id === 'date') {
      const options = { 
        weekday: 'short',
        month: "short",
        day: "numeric",
        year: "numeric",
      };
        const date = new Date(event[column.id]);
        return eventValue = new Intl.DateTimeFormat('en-US', options).format(date);
    };

    if(column.id === 'rsvp_required') {
      if(state.userLogged) {
        if(state.userType === 'MEM') {
          if(event[column.id]) {
            eventValue = <
              Button
              className={classes.Button}
              variant="contained" 
              color="primary"
              size="small"
              >
              RSVP 
              </Button>
          }
        } else {
          eventValue = <
          Button
          className={classes.Button}
          variant="contained" 
          color="secondary"
          size="small"
          >
          DELETE
          </Button>
        }
      } else {
        if(event[column.id]) {
          eventValue = <
          Button
          className={classes.Button}
          variant="contained" 
          color="primary"
          size="small"
          >
          RSVP 
          </Button>
        } else {
          eventValue = '';
        }
      }
    } else if(column.id === 'edit') {
        if(state.userLogged) {
          if(state.userType !== 'MEM') {
            eventValue = <
            Button
            className={classes.Button}
            variant="contained" 
            color="primary"
            size="small"
            >
            EDIT 
            </Button>;
          };
        };
      } else {
        eventValue = event[column.id];
      };
    return eventValue;
  };
  return {
    getColumnLabel,
    getEventValue,
  };
};