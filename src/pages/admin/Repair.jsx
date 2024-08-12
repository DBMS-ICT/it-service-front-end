import React from 'react';
import AddRepair from '../../components/repair/AddRepair';
import RepairList from '../../components/repair/RepairList';

function Repair() {
  return (
    <div className="w-full flex flex-col">
      <AddRepair />
      <RepairList />
    </div>
  );
}

export default Repair;
