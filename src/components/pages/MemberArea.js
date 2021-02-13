import React, { useState } from 'react'

import { useCookies } from 'react-cookie';

import { MemberNavBar, ChangePassword, DirectorySearch } from '../'

export function MemberArea() {

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
        <div>
          <h1>This is the Member Area Page</h1>
          <h1>Check your own Data</h1>
          <h1>Search for other members based on state, city, native place, industry, etc </h1>    
        </div>
      );
    } else if(state.shownTab === 2) {
      <DirectorySearch />
    };
  };

  return (
    <div>
      <MemberNavBar
        onSelect={tabSelected}
      />
      {navItemsToShow()}
    </div >
  )

};