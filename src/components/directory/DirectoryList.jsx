import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useDeleteDirectoryMutation,
  useGetDirectoriesQuery,
} from '../../app/api/directory';
import Loader from '../common/Loader';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { GrNext, GrPrevious } from 'react-icons/gr';
import CustomeButton from '../common/Button/CustomeButton';
import toast from 'react-hot-toast';
import UpdateDirectory from './UpdateDirectory';

function DirectoryList() {
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { language } = useSelector((state) => state.language);
  const [page, setPage] = useState(1);
  const [
    dalete,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      data: dataDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteDirectoryMutation();
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(
        language == 'en'
          ? 'Directory deleted successfully'
          : language == 'ar'
          ? 'تم حذف المديرية بنجاح'
          : 'بەرێوبەرایەتیەکە بە سەرکەوتوویی سڕاوەتەوە'
      );
      return;
    }
    if (isErrorDelete) {
      toast.error(
        language == 'en'
          ? 'Directory deleted failed'
          : language == 'ar'
          ? 'فشل حذف المديرية '
          : 'سڕینەوەی بەڕێوەبەرایەتی شکستی هێنا'
      );
    }
  }, [isLoadingDelete]);
  // const handleShowModal = (id) => {
  //   setId(id);
  //   console.log(id);
  //   if (id) {
  //     setShowModal(true);
  //   }
  // };
  const {
    data: dataDirectories,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useGetDirectoriesQuery(page);
  const handleDalete = (e) => {
    const answer = window.confirm(
      language === 'en'
        ? 'Are you sure you want to delete this directory?'
        : language === 'ar'
        ? 'هل أنت متأكد أنك تريد حذف هذا المدیرت؟'
        : 'دڵنیای کە دەتەوێت ئەم بەڕێوەبەرایەتییە بسڕیتەوە؟'
    );
    if (answer && !isLoadingDelete) dalete({ id: e });
  };
  return isErrorData ? (
    ''
  ) : isLoadingData ? (
    <Loader />
  ) : (
    <div>
      {showModal && <UpdateDirectory setShowModal={setShowModal} id={id} />}
      <table className="w-full table-auto">
        {/* revers rtl */}
        <thead className={`sticky top-0`}>
          <tr className="bg-gray-2 dark:bg-meta-4">
            <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              #
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              {language === 'en'
                ? 'N.Directorate'
                : language === 'ar'
                ? 'إسم المديرية'
                : 'ن.بەڕێوەبەرایەتی'}
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              {language === 'en'
                ? 'P.Number'
                : language === 'ar'
                ? 'ر.الهاتف'
                : 'ژ.مۆبایل'}
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              {language === 'en'
                ? 'Address'
                : language === 'ar'
                ? 'عنوان'
                : 'ناونیشان'}
            </th>
            <th className=" py-4 px-4 font-medium text-black dark:text-white">
              {language === 'en'
                ? 'Action'
                : language === 'ar'
                ? 'فعل'
                : 'کردار'}
            </th>
          </tr>
        </thead>
        <tbody className="overflow-hidden">
          {dataDirectories?.data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-whiten dark:hover:bg-graydark ease-in-out duration-300"
            >
              <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">{index + 1}</p>
              </td>
              <td className="border-b text-center border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  {item?.name}
                </h5>
              </td>

              <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">{item?.phone}</p>
              </td>
              <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">{item?.address}</p>
              </td>
              <td
                className="border-b border-[#eee] py-5 px-4
                       dark:border-strokedark"
              >
                <div className="flex items-center justify-center space-x-3.5">
                  <button
                    id={item._id}
                    onClick={(e) => {
                      setId(e.target.id);
                      if (e.target.id) {
                        setShowModal(true);
                      }
                    }}
                    className="text-primary  dark:text-secondary 
                    cursor-pointer text-bold border p-1 rounded-xl pt-1.5"
                  >
                    {language === 'en'
                      ? 'Edit'
                      : language === 'ar'
                      ? 'تعديل'
                      : 'گۆرانکاری'}
                  </button>
                  <button
                    className={isLoadingData ? 'animate-spin' : 'text-danger'}
                    onClick={() => handleDalete(item?._id)}
                  >
                    <MdDelete size={27} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* create pagination */}
      <div className="flex justify-center items-center gap-x-5 my-5">
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
            page * 20 > dataDirectories?.length ||
            dataDirectories?.length == 0 ||
            dataDirectories?.length == page * 20
          }
        />
      </div>
      {/* create pagination */}
    </div>
  );
}

export default DirectoryList;
