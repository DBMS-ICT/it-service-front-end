import React, { useState } from 'react';
import { useGetPendingUserQuery } from '../../app/api/user';
import { useSelector } from 'react-redux';
import TableHeader from '../common/Table/TableHeader';
import CustomeButton from '../common/Button/CustomeButton';
import { GrNext, GrPrevious } from 'react-icons/gr';
import UserRole from '../users/UserRole';
import DeleteUser from '../users/DeleteUser';
import AcceptUser from './AcceptUser';

function NewUSerList() {
  const { rtl, language } = useSelector((state) => state.language);
  const [page, setPage] = useState(1);
  const {
    data: getData,
    isLoading: getISLaoding,
    isError: getIsError,
  } = useGetPendingUserQuery(page);
  const selectGender = (value) => {
    if (value === 'male')
      return language === 'en' ? 'Male' : language === 'ar' ? 'ذكر' : 'نێر';
    if (value === 'female')
      return language === 'en' ? 'Female' : language === 'ar' ? 'انثى' : 'مێ';
  };
  return (
    <div>
      <div
        className="max-w-full overflow-x-auto 
     flex flex-col place-items-start"
      >
        <table className="w-full table-auto">
          {/* revers rtl */}
          <thead className={`sticky top-0 `}>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <TableHeader content={'#'} />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Name'
                    : language === 'ar'
                    ? 'الاسم'
                    : 'ناو'
                }
              />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Email'
                    : language === 'ar'
                    ? 'البريد'
                    : 'ئیمەیڵ'
                }
              />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Phone Number'
                    : language === 'ar'
                    ? 'رقم التلفون'
                    : 'ژمارەی مۆبایل'
                }
              />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Gender'
                    : language == 'ar'
                    ? 'جنس'
                    : 'ڕەگەز'
                }
              />
              <TableHeader
                content={
                  language == 'en' ? 'Role' : language == 'ar' ? 'دور' : 'ئەرک'
                }
              />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Accept'
                    : language === 'ar'
                    ? 'قبول'
                    : 'پەسەندکردن'
                }
              />
              <TableHeader
                content={
                  language === 'en'
                    ? 'Delete'
                    : language === 'ar'
                    ? 'حذف'
                    : 'سڕینەوە'
                }
              />
            </tr>
          </thead>
          <tbody className="overflow-hidden">
            {getData?.data?.data?.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-whiten dark:hover:bg-graydark ease-in-out duration-300"
              >
                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{index + 1}</p>
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data?.fullname}</p>
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data?.email}</p>
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{data?.phone}</p>
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {selectGender(data?.gender)}
                  </p>
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  {/* <p className="text-black dark:text-white"> */}
                  {data?._id && <UserRole role={data?.role} id={data?._id} />}
                  {/* </p> */}
                </td>
                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  {/* <p className="text-black dark:text-white"> */}
                  {data?._id && (
                    <AcceptUser status={data?.status} id={data?._id} />
                  )}
                  {/* </p> */}
                </td>

                <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                  {/* <p className="text-black dark:text-white"> */}
                  {data?._id && <DeleteUser id={data?._id} />}
                  {/* </p> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* create pagination */}
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
              page * 20 > getData?.data?.length ||
              getData?.data?.length == 0 ||
              getData?.data?.length == page * 20
            }
          />
        </div>
      </div>
    </div>
  );
}

export default NewUSerList;
