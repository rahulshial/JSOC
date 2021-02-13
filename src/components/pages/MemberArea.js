import React, { useState } from 'react'

import { useCookies } from 'react-cookie';

import { MemberNavBar, ChangePassword, PersonalInfo, DirectorySearch } from '../'

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
        <PersonalInfo />
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