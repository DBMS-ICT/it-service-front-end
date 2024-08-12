export const autoIncrimnyKey = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
export const chooseMaleFemale = (gender) => {
  if (gender === 'male') {
    return (
      <svg
        className="w-8 h-8"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#3276c3"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <title>male [#3276c3]</title> <desc>Created with Sketch.</desc>{' '}
          <defs> </defs>{' '}
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            {' '}
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-60.000000, -2079.000000)"
              fill="#3276c3"
            >
              {' '}
              <g id="icons" transform="translate(56.000000, 160.000000)">
                {' '}
                <path
                  d="M11,1937.005 C8.243,1937.005 6,1934.762 6,1932.005 C6,1929.248 8.243,1927.005 11,1927.005 C13.757,1927.005 16,1929.248 16,1932.005 C16,1934.762 13.757,1937.005 11,1937.005 L11,1937.005 Z M16,1919 L16,1921 L20.586,1921 L15.186,1926.402 C14.018,1925.527 12.572,1925.004 11,1925.004 C7.134,1925.004 4,1928.138 4,1932.004 C4,1935.87 7.134,1939.005 11,1939.005 C14.866,1939.005 18,1935.871 18,1932.005 C18,1930.433 17.475,1928.987 16.601,1927.818 L22,1922.419 L22,1927 L24,1927 L24,1919 L16,1919 Z"
                  id="male-[#3276c3]"
                >
                  {' '}
                </path>{' '}
              </g>{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
    );
  } else if (gender === 'female') {
    return (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#af6aa9"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            clipRule="evenodd"
            d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
            fill="#af6aa9"
          ></path>{' '}
        </g>
      </svg>
    );
  }
  return (
    <svg
      className="w-8 h-8"
      fill="#219653"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>ionicons-v5-k</title>
        <path d="M330,16V60h42.89l-37.1,37.09A157.67,157.67,0,0,0,216,42C128.88,42,58,112.88,58,200c0,79.66,59.26,145.72,136,156.46V394H144v44h50v58h44V438h50V394H238V356.46c76.74-10.74,136-76.8,136-156.46a157.23,157.23,0,0,0-14-64.93l44-44V134h44V16ZM216,314A114,114,0,1,1,330,200,114.13,114.13,0,0,1,216,314Z"></path>
      </g>
    </svg>
  );
};

export const appoimentStatus = (status, lang) => {
  if (lang === 'en') {
    if (status === 'waiting') {
      return 'Waiting';
    }
    if (status === 'canceled') {
      return 'Canceled';
    }
    if (status === 'completed') {
      return 'Completed';
    }
    if (status === 'seeing') {
      return 'Seeing';
    }
  }
  if (lang === 'ar') {
    if (status === 'waiting') {
      return 'منتظر';
    }
    if (status === 'canceled') {
      return 'ألغيت';
    }
    if (status === 'completed') {
      return 'مكتمل';
    }
    if (status === 'seeing') {
      return 'رؤية';
    }
  }
  if (lang === 'kr') {
    if (status === 'waiting') {
      return 'چاوەڕوانی کردن';
    }
    if (status === 'canceled') {
      return 'هەڵوەشایەوە';
    }
    if (status === 'completed') {
      return 'تەواو بووە';
    }
    if (status === 'seeing') {
      return 'بینین';
    }
  }
};

export const countAppoimentStatus = (status, data) => {
  let count = 0;
  data.forEach((item) => {
    if (item.status === status) {
      count++;
    }
  });
  return count;
};
export const handelDate = (value) => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month + 1}/${year}`;
};
