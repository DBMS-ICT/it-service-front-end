import React, { useEffect, useState } from 'react';
import Label from '../common/Label';
import { useSelector } from 'react-redux';
import Input from '../common/Input';
import PrimaryButton from '../common/Button/PrimaryButton';
import { useAddDirectoryMutation } from '../../app/api/directory';
import { IoMdAddCircle } from 'react-icons/io';
import { IoCloseCircleSharp } from 'react-icons/io5';
function AddDirectory({ setShowModal }) {
  const [addDirectory, { isLoading, isError, error, data, status, isSuccess }] =
    useAddDirectoryMutation();
  const { language, rtl } = useSelector((state) => state.language);
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (error?.data?.data?.message === 'required' && status === 'rejected') {
      setMessage({
        text:
          language == 'en'
            ? 'Directory name is required!'
            : language == 'ar'
            ? '!اسم المديرية مطلوب'
            : '!ناوی بەڕێوەبەرایەتی پێویستە',
        status: 'text-danger',
      });
      return;
    }
    if (error?.data?.data?.message === 'exist' && status === 'rejected') {
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
    if (error?.data?.data?.message === 'no-created' && status === 'rejected') {
      setMessage({
        text:
          language == 'en'
            ? 'Failed to create!'
            : language == 'ar'
            ? 'فشل في عملية الانشاء'
            : 'دروستکردنی شکستی هێنا',
        status: 'text-danger',
      });
      return;
    }
    if (isSuccess && data?.status == 'success') {
      setMessage({
        text:
          language == 'en'
            ? 'Directory created successfully!'
            : language == 'ar'
            ? '!تم انشاء المديرية بنجاح'
            : '!بەڕێوەبەرایەتییەکە بە سەرکەوتوویی دامەزرا',
        status: 'text-success',
      });
      setInputData({
        name: '',
        address: '',
        phone: '',
      });
      return;
    }
    if (isError) {
      setMessage({
        text:
          language == 'en'
            ? 'Error! Try again'
            : language == 'ar'
            ? 'خطأ! حاول ثانية'
            : 'هەڵە! دووبارە هەوڵبدەرەوە',
        status: 'text-danger',
      });
      return;
    }
  }, [isLoading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addDirectory(inputData);
  };
  const [message, setMessage] = useState({ text: '', status: '' });
  // create modal
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
          onClick={() =>
            setShowModal((prev) => {
              return { ...prev, add: false };
            })
          }
        />
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:w-1/2 m-auto mt-12"
        >
          <Label
            text={
              language == 'en'
                ? 'Add Directory'
                : language == 'ar'
                ? 'اضافة مديرية'
                : 'زیادکردنی بەڕێوبەرایەتی'
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
            disabled={isLoading}
            icon={<IoMdAddCircle />}
            type={'submit'}
            content={
              language == 'en' ? 'Add' : language == 'ar' ? 'اضافة' : 'زیادکردن'
            }
          />
        </form>
      </div>
    </div>
  );
}

export default AddDirectory;
