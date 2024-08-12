import React, { useEffect, useState } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import Label from '../common/Label';
import Input from '../common/Input';
import { useSelector } from 'react-redux';
import PrimaryButton from '../common/Button/PrimaryButton';
import { IoMdAddCircle } from 'react-icons/io';
import {
  useGetDirectoryQuery,
  useUpdateDirectoryMutation,
} from '../../app/api/directory';
import Loader from '../common/Loader';
function UpdateDirectory({ setShowModal, id }) {
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const {
    data: dataDirectory,
    isLoading: isLoadingData,
    isError: isErrorData,
    isSuccess: isSuccessData,
  } = useGetDirectoryQuery(id);
  useEffect(() => {
    if (isSuccessData) {
      setInputData({
        id: dataDirectory?.data._id,
        name: dataDirectory?.data.name,
        address: dataDirectory?.data.address,
        phone: dataDirectory?.data.phone,
      });
    }
  }, [dataDirectory]);

  const [
    updateDirectory,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateDirectoryMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateDirectory(inputData);
  };

  useEffect(() => {
    if (errorUpdate?.data?.data?.message == 'exist') {
      setMessage({
        text:
          language == 'en'
            ? 'This Directory already exist !'
            : language == 'ar'
            ? 'هذا المديرية موجودة بالفعل'
            : '!ئەم بەڕێوەبەرایەتییە پێشتر بوونی هەیە',
        status: 'text-danger',
      });
      return;
    }
    if (isSuccessUpdate && dataUpdate?.status == 'success') {
      setShowModal(false);
      return;
    }
    if (isErrorUpdate) {
      setMessage({
        text:
          language == 'en'
            ? 'Failed to update!'
            : language == 'ar'
            ? 'فشل في عملية التحديث'
            : 'دروستکردنی شکستی هێنا',
        status: 'text-danger',
      });
      return;
    }
  }, [isLoadingUpdate]);
  const { language, rtl } = useSelector((state) => state.language);
  const [message, setMessage] = useState({ text: '', status: '' });
  return (
    <div
      className="w-full fixed z-9999 bg-white dark:bg-black min-h-screen 
    top-0 left-0 p-5 overflow-y-auto"
    >
      {/* add directory */}
      <div className="md:w-1/2 m-auto relative">
        <IoCloseCircleSharp
          className={`text-3xl 
        absolute top-2 top-md:top-4 ${
          rtl ? 'right-1 md:right-0' : 'left-1 md:left-0'
        } cursor-pointer`}
          onClick={() => setShowModal(false)}
        />
      </div>

      <div>
        {isErrorData ? (
          <Loader />
        ) : isLoadingData ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:w-1/2 m-auto mt-12"
          >
            <Label
              text={
                language == 'en'
                  ? 'Update Directory'
                  : language == 'ar'
                  ? 'تحديث مديرية'
                  : 'نوێکردنەوەی بەڕێوبەرایەتی'
              }
              textSize="text-xl"
            />
            <span
              className={`text-lg ${message?.status}
             ${rtl ? 'text-right' : 'text-left'}`}
            >
              {message?.text}
            </span>
            <div>
              <Label
                text={
                  language == 'en'
                    ? 'Name of directory'
                    : language == 'ar'
                    ? 'اسم المديرية'
                    : 'ناوی بەڕێوبەرایەتی'
                }
                textSize="text-lg"
              />
              <Input
                onChange={handleInputChange}
                name={'name'}
                value={inputData?.name}
                reqired={true}
                placeholder={
                  language == 'en'
                    ? 'Name of directory'
                    : language == 'ar'
                    ? 'اسم المديرية'
                    : 'ناوی بەڕێوبەرایەتی'
                }
              />
            </div>
            <div>
              <Label
                text={
                  language == 'en'
                    ? 'Address'
                    : language == 'ar'
                    ? 'عنوان'
                    : 'ناونیشان'
                }
                textSize={'text-lg'}
              />
              <Input
                onChange={handleInputChange}
                name={'address'}
                value={inputData?.address}
                placeholder={
                  language == 'en'
                    ? 'Address'
                    : language == 'ar'
                    ? 'عنوان'
                    : 'ناونیشان'
                }
              />
            </div>
            <div>
              <Label
                text={
                  language == 'en'
                    ? 'Phone number'
                    : language == 'ar'
                    ? 'رقم التليفون'
                    : 'ژمارە مۆبایل'
                }
                textSize={'text-lg'}
              />
              <Input
                type={'text'}
                onChange={handleInputChange}
                name={'phone'}
                value={inputData?.phone}
                placeholder={
                  language == 'en'
                    ? 'Phone number'
                    : language == 'ar'
                    ? 'رقم التليفون'
                    : 'ژمارە مۆبایل'
                }
              />
            </div>
            <PrimaryButton
              disabled={isLoadingUpdate}
              icon={<IoMdAddCircle />}
              type={'submit'}
              content={
                language == 'en'
                  ? 'Update'
                  : language == 'ar'
                  ? 'تحديث'
                  : 'نوێکردنەوە'
              }
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateDirectory;
