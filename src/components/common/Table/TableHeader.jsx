import React from 'react';

function TableHeader({ content }) {
  return (
    <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
      {content}
    </th>
  );
}

export default TableHeader;
