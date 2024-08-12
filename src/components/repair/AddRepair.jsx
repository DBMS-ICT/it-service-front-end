import React, { useEffect, useState } from 'react';
import Label from '../common/Label';
import { useSelector } from 'react-redux';
import Input from '../common/Input';
import PrimaryButton from '../common/Button/PrimaryButton';
import { useAddRepairDataMutation } from '../../app/api/repair.data';
import toast from 'react-hot-toast';

function AddRepair() {
  const [
    addRepair,
    {
      isLoading: loadingData,
      isError: isErroData,
      error: errorData,
      isSuccess: isSuccessData,
      data: dataData,
    },
  ] = useAddRepairDataMutation();
  const handleAddRepair = (e) => {
    e.preventDefault();
    addRepair(repair);
  };
  useEffect(() => {
    if (errorData?.data?.data?.message == 'exist') {
      toast.error(
        language == 'en'
          ? 'This service already exist !'
          : language == 'ar'
          ? 'هذا خدمات موجودة بالفعل'
          : '!ئەم خزمەتگوزاریە پێشتر بوونی هەیە'
      );
      return;
    }
    if (errorData?.data?.data?.message == 'no-created') {
      toast.error(
        language == 'en'
          ? 'Failed to create!'
          : language == 'ar'
          ? 'فشل في عملية الانشاء'
          : 'دروستکردنی شکستی هێنا'
      );
      return;
    }
    if (errorData?.data?.data?.message == 'required') {
      toast.error(
        language == 'en'
          ? 'Repair name is required!'
          : language == 'ar'
          ? '!اسم الصيانة مطلوب'
          : '!ناوی بەڕێوەبەرایەتی پێویستە'
      );
      return;
    }
    if (isSuccessData && dataData?.status == 'success') {
      toast.success(
        language == 'en'
          ? 'Repair added successfully!'
          : language == 'ar'
          ? '!تمت الاضافة بنجاح'
          : 'زیادکردنەکە سەرکەوتوبوو'
      );
      setRepair({ name: '' });
      return;
    }
    if (isErroData) {
      toast.error(
        language == 'en'
          ? 'Error! Try again'
          : language == 'ar'
          ? 'خطأ! حاول ثانية'
          : 'هەڵە! دووبارە هەوڵبدەرەوە'
      );
      return;
    }
  }, [loadingData]);
  const [repair, setRepair] = useState({ name: '' });
  //   console.log(repair);
  const { language, rtl } = useSelector((state) => state.language);
  return (
    <div>
      <Label
        text={
          language == 'English'
            ? 'Add Repair'
            : language == 'ar'
            ? 'اضافة صيانة'
            : 'زیادکردنی چاککردنەوە'
        }
        textSize={'text-xl'}
      />
      <form
        onSubmit={handleAddRepair}
        className="w-full flex flex-col gap-2 gap-y-3 my-10"
      >
        <Label
          text={
            language == 'en'
              ? 'Repair Name'
              : language == 'ar'
              ? 'اسم الصيانة'
              : 'ناوی چاککردنەوە'
          }
        />
        <Input
          onChange={(e) => setRepair({ ...repair, name: e.target.value })}
          name={'name'}
          value={repair?.name}
          type="text"
          placeholder={
            language == 'en'
              ? 'Repair Name'
              : language == 'ar'
              ? 'اسم الصيانة'
              : 'ناوی چاککردنەوە'
          }
          reqired={true}
        />
        <PrimaryButton
          disabled={loadingData}
          type="submit"
          content={
            language == 'en'
              ? 'Add Repair'
              : language == 'ar'
              ? 'اضافة صيانة'
              : 'زیادکردنی چاککردنەوە'
          }
        />
      </form>
    </div>
  );
}

export default AddRepair;
