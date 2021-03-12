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
  { id: 'title', label: 'Event', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 250 },
  { id: 'date', label: 'Date', minWidth: 50, format: (value) => value.format('DD-MMM-YYYY')},
  { id: 'from', label: 'From', minWidth: 50 },
  { id: 'to', label: 'To', minWidth: 50 },
  { id: 'venue', label: 'Venue', minWidth: 250 },
  { id: 'rsvp', label: 'RSVP', minWidth: 100 },
  { id: 'edit', label: 'Edit', minWidth: 100 },
];

export function Events() {
  const classes = useStyles();
  const { state, setState } = useApplicationData();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

/** use effect
 * read the data from the events table
 * display out witnin a container
 * have edit button. no delete functionality.
 * on EC/DIR login show add event button
 */

 useEffect(() => {
  axios
  .get('/events/getEvents')
  .then((res) => {
    // console.log(res);
    if(res.status === 200) {
      const data = res.data.rows;
      console.log(data[0].title);
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

  const loadEvents = () => {
    // {state.events?
    //   (state.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => {
    //     return (
    //       <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>
    //         {columns.map((column) => {
    //           const value = event[column.id];
    //           return (
    //             <TableCell key={column.id} align={column.align}>
    //               {value}
    //             </TableCell>
    //           );
    //         })}
    //       </TableRow>
    //     );
    //   })):<></>}
    let value = '';
    if (state.events) {
      (state.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>
            {columns.map((column) => {
              if (column.id === 'rsvp') {
                if(event[column.id]) {
                  value = <Button> RSVP </Button>
                } else {
                  value = 'NA'
                }
              } else if(column.id === 'edit') {
                if(Object.keys(cookies).length > 0 && 'userLogged' in cookies) {
                  if(cookies.userLogged.type === 'EC' || cookies.userLogged.type === 'DIR' || cookies.userLogged.type === 'ADM') {
                    value = <Button> EDIT </Button>
                  } else {
                    value = '';
                  }
                } else {
                  value = '';
                }
              } else {
                value = event[column.id];
              };              
              return (
                <TableCell key={column.id} align={column.align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      }))
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loadEvents}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};