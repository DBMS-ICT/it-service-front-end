import React, { useState } from 'react';
import TableHeader from '../common/Table/TableHeader';
import { useSelector } from 'react-redux';
import { useGetCompleteRequestQuery } from '../../app/api/request';
import Loader from '../common/Loader';
import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import DeleteRequest from '../new.request/DeleteRequest';
import CustomeButton from '../common/Button/CustomeButton';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { handelDate } from '../../function/function';
import Export from './Export';
import SuccessButton from '../common/Button/SuccessButton';

function CompleteRequestList() {
  const { language, rtl } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.setUser);
  const [page, setPage] = useState(1);
  const {
    data: getData,
    isLoading: getISLaoding,
    isError: getIsError,
  } = useGetCompleteRequestQuery(page);
  const [exportMode, setExportMode] = useState(false);
  return getISLaoding ? (
    <Loader />
  ) : (
    !getIsError && (
      <>
        <Export />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            {/* revers rtl */}
            <thead className={`sticky top-0`}>
              <tr className="bg-gray-2 dark:bg-meta-4">
                <TableHeader content={'#'} />
                <TableHeader
                  content={
                    language === 'en'
                      ? 'N.Directorate'
                      : language === 'ar'
                      ? 'إسم المديرية'
                      : 'ن.بەڕێوەبەرایەتی'
                  }
                />
                <TableHeader
                  content={
                    language === 'en'
                      ? 'Date visit'
                      : language === 'ar'
                      ? 'تاريخ الزيارة'
                      : 'بەرواری سەردان'
                  }
                />
                <TableHeader
                  content={
                    language === 'en'
                      ? 'Address'
                      : language === 'ar'
                      ? 'عنوان'
                      : 'ناونیشان'
                  }
                />
                <TableHeader
                  content={
                    language === 'en'
                      ? 'Problem'
                      : language === 'ar'
                      ? 'مشكلة'
                      : 'کێشە'
                  }
                />
                <TableHeader
                  content={
                    language === 'en'
                      ? 'Action'
                      : language === 'ar'
                      ? 'فعل'
                      : 'کردار'
                  }
                />
              </tr>
            </thead>
            <tbody className="overflow-hidden">
              {getData?.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-whiten dark:hover:bg-graydark ease-in-out duration-300"
                >
                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{index + 1}</p>
                  </td>
                  <td className="border-b text-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item?.dirName}
                    </h5>
                  </td>
                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {handelDate(item?.dateVist)}
                    </p>
                  </td>

                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.dirAddress}
                    </p>
                  </td>

                  <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.problem}
                    </p>
                  </td>
                  <td
                    className="border-b border-[#eee] py-5 px-4
                  dark:border-strokedark"
                  >
                    <div className="flex items-center justify-center space-x-3.5">
                      <Link to={`/complete/request/edit/${item?._id}`}>
                        <IoEye
                          size={27}
                          className="text-primary dark:text-secondary"
                        />
                      </Link>
                      {user?.role === 'admin' && (
                        <DeleteRequest
                          id={item?._id}
                          getISLaoding={getISLaoding}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
          <div className="w-full flex justify-center items-center gap-x-5 my-5">
            <CustomeButton
              icon={<GrPrevious />}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            />
            <span className="text-black dark:text-white">{page}</span>
            <CustomeButton
              icon={<GrNext />}
              onClick={() => setPage(page + 1)}
              disabled={
                page * 20 > getData?.length ||
                getData?.length == 0 ||
                getData?.length == page * 20
              }
            />
          </div>
        </div>
      </>
    )
  );
}

export default CompleteRequestList;
