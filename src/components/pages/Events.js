import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

/** Material UI Imports */
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

/** Local Imports */
import useApplicationData from '../../hooks/useApplicationData';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'title', label: 'Event', minWidth: 50 },
  { id: 'description', label: 'Description', minWidth: 50 },
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'from', label: 'From', minWidth: 50 },
  { id: 'to', label: 'To', minWidth: 50 },
  { id: 'venue', label: 'Venue', minWidth: 50 },
  { id: 'rsvp_required', label: 'RSVP', minWidth: 50 },
  { id: 'edit', label: 'Edit', minWidth: 50 },
];

const addColumns = [
  { id: 'title', label: 'Event', minWidth: 50 },
  { id: 'description', label: 'Description', minWidth: 50 },
  { id: 'date', label: 'Date', minWidth: 50 },
  { id: 'from', label: 'From', minWidth: 50 },
  { id: 'to', label: 'To', minWidth: 50 },
  { id: 'venue', label: 'Venue', minWidth: 50 },
  { id: 'rsvp_required', label: 'RSVP', minWidth: 50 },
];

export function Events() {
  const classes = useStyles();
  const { state, setState } = useApplicationData();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cookies] = useCookies(["name"]);

/** use effect
 * read the data from the events table
 * display out witnin a container
 * have edit button. no delete functionality.
 * on EC/DIR login show add event button
 */

 useEffect(() => {
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
    setState((prev) => ({
      ...prev,
      userLogged: true,
      userType: cookies.userLogged.type,
    }))
  }
  axios
  .get('/events/getEvents')
  .then((res) => {
    // console.log(res);
    if(res.status === 200) {
      const data = res.data.rows;
      setState((prev) => ({
        ...prev,
        events: data,
      }))
    };
  })
  .catch((error) => {
    console.log(error);
  })
   // eslint-disable-next-line react-hooks/exhaustive-deps 
 }, []);

  const handleChangePage = (event, newPage) => {
   setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getColumnLabel = (column) => {
    let columnLabel = '';
    if(column.id === 'rsvp_required') {
      if(state.userLogged) {
        if(state.userType === 'MEM') {
          columnLabel = column.label;
        } else {
          columnLabel = ''
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

  const getEventValue = (event, column) => {
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
            eventValue = <Button variant="contained" color="primary"> RSVP </Button>
          }
        } else {
          eventValue = '';
        }
      } else {
        if(event[column.id]) {
          eventValue = <Button variant="contained" color="primary"> RSVP </Button>
        } else {
          eventValue = '';
        }
      }
    } else if(column.id === 'edit') {
        if(state.userLogged) {
          if(state.userType !== 'MEM') {
            eventValue = <Button variant="contained" color="secondary"> EDIT </Button>;
          };
        };
      } else {
        eventValue = event[column.id];
      };
    return eventValue;
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  const columnLabel = getColumnLabel(column)
                  return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {columnLabel}
                  </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
            {state.events?
              (state.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>
                    {columns.map((column) => {
                       const eventValue = getEventValue(event, column)
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {eventValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })):<></>}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15]}
          component="div"
          count={state.events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {state.userLogged && state.userType !== 'MEM' ?
      <div>
      <h1>Add New Event</h1>
        <Paper className={classes.root}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {addColumns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                      {column.label}
                    </TableCell>)
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                    {addColumns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <input></input>
                        </TableCell>
                      );
                    })}
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </div>
     : <></>}
    </div>
  );
};