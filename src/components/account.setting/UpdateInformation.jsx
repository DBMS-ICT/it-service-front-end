import React, { useEffect, useState } from 'react';
import Label from '../common/Label';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../common/Input';
import PrimaryButton from '../common/Button/PrimaryButton';
import { useUpdateUserMutation } from '../../app/api/user';
import toast from 'react-hot-toast';
import { setRole } from '../../app/store/slice/user.slice';

function UpdateInformation() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.setUser);
  const [
    userUpdate,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      isSuccess: updateIsSuccess,
      data: updateData,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const { language, rtl } = useSelector((state) => state.language);

  const [updateInfo, setUpdateInfo] = useState({
    fullname: '',
    email: '',
    phone: '',
    gender: '',
  });

  useEffect(() => {
    setUpdateInfo(user);
  }, [user?.role]);

  const handleIput = (e) => {
    setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (updateIsSuccess && updateData?.status === 'success') {
      dispatch(setRole(updateData?.data?.data));
      toast.success(
        language === 'en'
          ? 'Successfully Updated'
          : language === 'ar'
          ? 'تم تحديث بنجاح'
          : 'بە سەرکەوتوویی نوێکرایەوە'
      );
    } else if (updateData?.data?.message === 'exist') {
      toast.error(
        language === 'en'
          ? 'This email already exists!'
          : language === 'ar'
          ? 'هذا البريد الالكتروني موجود بالفعل'
          : 'ئەم ئیمەیڵە پێشتر بوونی هەیە!'
      );
    } else if (updateIsError) {
      toast.error(
        language === 'en'
          ? 'Failed, please try again!'
          : language === 'ar'
          ? 'فشل, الرجاء المحاولة مرة اخرى!'
          : 'شکستی هێنا, تکایە دووبارە هەوڵبدەرەوە!'
      );
    }
  }, [updateIsSuccess, updateData, updateIsError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userUpdate(updateInfo);
  };

  return (
    <div className="text-black dark:text-white flex flex-col gap-y-5">
      <Label
        text={
          language === 'en'
            ? 'Update self Information'
            : language === 'ar'
            ? 'تعديل المعلومات الشخصية'
            : 'نوێکردنەوەی زانیاری کەسی'
        }
        textSize={'text-2xl'}
      />
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 md:grid-cols-2 gap-5`}
      >
        {/* --------- email --------- */}
        <div>
          <Label
            text={
              language === 'en'
                ? 'Email'
                : language === 'ar'
                ? 'البريد الالكتروني'
                : 'ئیمەیڵ'
            }
            textSize="text-lg font-medium mx-3"
          />
          <Input
            onChange={handleIput}
            value={updateInfo?.email || ''}
            reqired={true}
            type={'email'}
            name={'email'}
          />
        </div>
        {/* --------- full name --------- */}
        <div>
          <Label
            text={
              language === 'en'
                ? 'Full Name'
                : language === 'ar'
                ? 'الاسم الكامل'
                : 'ناوی تەواوەتی'
            }
            textSize="text-lg font-medium mx-3"
          />
          <Input
            name={'fullname'}
            onChange={handleIput}
            value={updateInfo?.fullname || ''}
            reqired={true}
            type={'text'}
          />
        </div>
        {/* --------- phone --------- */}
        <div>
          <Label
            text={
              language === 'en'
                ? 'Phone Number'
                : language === 'ar'
                ? 'رقم الهاتف'
                : 'ژمارەی مۆبایل'
            }
            textSize="text-lg font-medium mx-3"
          />
          <Input
            name={'phone'}
            onChange={handleIput}
            value={updateInfo?.phone || ''}
            reqired={true}
            type={'text'}
          />
        </div>
        {/* --------- gender --------- */}
        <div>
          <Label
            text={
              language === 'en' ? 'Gender' : language === 'ar' ? 'جنس' : 'ڕەگەز'
            }
            textSize="text-lg font-medium mx-3"
          />
          <select
            required={true}
            className={`w-full outline-none rounded-full border-[1.5px]
         border-stroke bg-transparent py-3 px-5 font-medium transition
          focus:border-primary active:border-primary 
          disabled:cursor-default disabled:bg-white 
          dark:border-form-strokedark dark:bg-form-input 
          dark:focus:border-primary
           ${rtl ? 'text-right pr-3' : 'text-left pl-3'} `}
            onChange={handleIput}
            value={updateInfo?.gender || ''}
            name="gender"
          >
            <option value="">
              {language === 'en'
                ? 'Select'
                : language === 'kr'
                ? 'دەست نیشانکردن'
                : 'اختيار'}
            </option>
            <option value={'male'}>
              {language === 'en' ? 'Male' : language === 'ar' ? 'ذكر' : 'نێر'}
            </option>
            <option value={'female'}>
              {language === 'en'
                ? 'Female'
                : language === 'ar'
                ? 'انثني'
                : 'مێ'}
            </option>
          </select>
        </div>
        <div></div>
        <div>
          <PrimaryButton
            type={'submit'}
            content={
              language === 'en'
                ? 'Update'
                : language === 'ar'
                ? 'تحديث'
                : 'نوێکردنەوە'
            }
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateInformation;
