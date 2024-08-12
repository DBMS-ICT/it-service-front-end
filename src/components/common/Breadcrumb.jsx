import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageName, BreadcrumbData }) => {
  const { rtl } = useSelector((state) => state.language);
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2
        className={`capitalize text-title-md2 font-semibold 
      text-black dark:text-white `}
      >
        {pageName}
      </h2>

      <nav>
        <ol
          className={`flex items-center gap-2
        ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {BreadcrumbData &&
            BreadcrumbData?.map((item, index) => (
              <li key={index}>
                <Link key={index} to={item.path}>
                  {`${item.name} ${
                    rtl
                      ? index !== BreadcrumbData.length - 1
                        ? ''
                        : ' < '
                      : index !== BreadcrumbData.length - 1
                      ? ' > '
                      : ''
                  }`}
                </Link>
              </li>
            ))}
          <li className="text-primary ">
            {rtl ? (
              <span>
                {pageName} {BreadcrumbData && ' < '}{' '}
              </span>
            ) : (
              <span>
                {' '}
                {BreadcrumbData && ' > '}
                {pageName}{' '}
              </span>
            )}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
