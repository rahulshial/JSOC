import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

/** Material UI Imports */
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@material-ui/core';

/** Local Imports */
import useApplicationData from '../../hooks/useApplicationData';
import helperFunction from '../../helpers/HelperFunction';

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
  const { state, setState, handleEventsChangePage, handleEventsChangeRowsPerPage } = useApplicationData();
  const { getColumnLabel, getEventValue } = helperFunction();
  const [cookies] = useCookies(["name"]);

 useEffect(() => {
  if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
    setState((prev) => ({
      ...prev,
      userLogged: true,
      userType: cookies.userLogged.type,
    }))
  }
  console.log(state);
  axios
  .get('/events/getEvents')
  .then((res) => {
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

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  const columnLabel = getColumnLabel(state, column)
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
              (state.events.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((event) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>
                    {columns.map((column) => {
                       const eventValue = getEventValue(state, event, column)
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
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onChangePage={handleEventsChangePage}
          onChangeRowsPerPage={handleEventsChangeRowsPerPage}
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