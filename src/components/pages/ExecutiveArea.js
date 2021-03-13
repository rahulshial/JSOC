import React, { useState } from 'react'

import { useCookies } from 'react-cookie';

import { ExecutiveNavBar, ChangePassword, ExecutiveReports, ExecutiveStatistics } from '../'

export function ExecutiveArea() {

  const [state, setState] = useState({
  shownTab: 2,
  });

  const tabSelected = (indexValue) => {
    setState(prev => ({
      ...prev,
      shownTab: indexValue
    }))
  };

  const navItemsToShow = () => {
    if (state.shownTab === 0) {
      return (
        <ChangePassword />
      );
    } else if (state.shownTab === 1) {
      return (
        <ExecutiveReports />
      );
    } else if(state.shownTab === 2) {
      <ExecutiveStatistics />
    };
  };

  return (
    <div>
      <ExecutiveNavBar
        onSelect={tabSelected}
      />
      {navItemsToShow()}
    </div >
  )
};