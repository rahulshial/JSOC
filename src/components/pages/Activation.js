import axios from 'axios';
import React, { useEffect } from 'react';
import useApplicationData from '../../hooks/useApplicationData';
import { useHistory } from 'react-router-dom';

export function Activation() {
  const history = useHistory();
  const { setState } = useApplicationData();

  useEffect(() => {
    if(window.location.pathname.toString().includes('activation')) {
      const activationData = window.location.pathname.split("/").pop().split(":");
      const activationDataObj = {
        email: activationData[0],
        activationToken: decodeURIComponent(activationData[1]),
        authToken: decodeURIComponent(activationData[2]),
      };
      console.log(activationData[0]);
      axios
      .post('/users/activate', activationDataObj)
      .then((res) => {
        console.log(res);
        if(res.status === 200) {
          setState((prev) => ({
            ...prev,
            errorFlag: true,
            errorText: 'Account Activated, create a password!.',
            errorBarColor: 'primary',
            functionState: 'createPassword',
            mainButtonText: 'Create Password',
            secondButtonText: '',
            thirdButtonText: '',
          }));
          history.push('/Login');
          history.go(history.length - 1);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error)
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      ACTIVATING
    </div>
  )
};
