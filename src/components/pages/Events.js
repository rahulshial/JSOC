import React, {useEffect} from 'react';
import axios from 'axios';

/** Material UI Imports */


/** Local Imports */
import useApplicationData from '../../hooks/useApplicationData';
import { removeUndefinedProps } from '@material-ui/data-grid';

export function Events() {

  const { state, setState } = useApplicationData();

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

 const displayEvents = () => {
   const eventsArray = [];
   if(state.events) {

   }
   return eventsArray;
 }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          <tr>{displayEvents}</tr>
        </tbody>
      </table>
    </div>
  );
};