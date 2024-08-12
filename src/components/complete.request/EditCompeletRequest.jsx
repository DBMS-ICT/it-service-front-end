import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSingleRequestQuery,
  useUpdateDateMutation,
  useUpdateNumberMutation,
} from '../../app/api/request';
import Label from '../common/Label';
import PrintPage from '../PrintableComponent ';
import Element from '../request.edit/Element';
import Loader from '../common/Loader';
import { useSelector } from 'react-redux';
import SuccessButton from '../common/Button/SuccessButton';
import toast from 'react-hot-toast';
import { handelDate } from '../../function/function';

function EditCompeletRequest() {
  const { language, rtl } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.setUser);
  const [number, setNumber] = useState({ id: '', number: 0 });
  const [date, setDate] = useState({ id: '', date: '' });
  const { id } = useParams();
  const {
    data: getData,
    isLoading: getISLaoding,
    isError: getIsError,
  } = useGetSingleRequestQuery(id);
  /// ----------------- handel update number -----------------
  const [
    updateNumber,
    {
      isLoading: updateNumberIsLoading,
      isError: updateNumberIsError,
      isSuccess: updateNumberIsSuccess,
      error: updateNumberError,
      data: updateNumberData,
    },
  ] = useUpdateNumberMutation();
  /// ----------------- handel update date -----------------
  const [
    updateDate,
    {
      isLoading: updateDateIsLoading,
      isError: updateDateIsError,
      isSuccess: updateDateIsSuccess,
      error: updateDateError,
      data: updateDateData,
    },
  ] = useUpdateDateMutation();

  /// ----------------- handel input data
  useEffect(() => {
    setNumber({ id: id, number: getData?.data?.number });
    const isoDate = getData?.data?.date;
    if (isoDate) {
      const formattedDate = isoDate.substring(0, 10); // Extract "yyyy-MM-dd"
      setDate({ id: id, date: formattedDate });
    } else {
      setDate({ id: id, date: '' });
    }
  }, [getData]);
  /// ----------------- handle update number message
  useEffect(() => {
    if ((updateNumberData?.status == 'success', updateNumberIsSuccess)) {
      toast.success(
        language === 'en'
          ? 'Updated number successfully'
          : language === 'ar'
          ? 'تم تحديث الرقم بنجاح'
          : 'ژمارە نوێکراوە بە سەرکەوتوویی'
      );
      return;
    }
    if (updateNumberError?.data?.data?.message == 'exist') {
      toast.error(
        language === 'en'
          ? 'Number already exist'
          : language === 'ar'
          ? 'الرقم موجود بالفعل'
          : 'ژمارە پێشتر بوونی هەیە'
      );
      return;
    }
    if (updateNumberError?.data?.data?.message == 'required') {
      toast.error(
        language === 'en'
          ? 'Please enter number'
          : language === 'ar'
          ? 'يرجى ادخال الرقم'
          : 'تکایە ژمارەیەک هەڵبژێرە'
      );
      return;
    }
    if (updateNumberIsError) {
      toast.error(
        language === 'en'
          ? 'Failed please try again'
          : language === 'ar'
          ? 'فشل يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا تکایە هەوڵبدەرەوە'
      );
      return;
    }
  }, [updateNumberIsLoading]);
  /// ----------------- handle update date message
  useEffect(() => {
    if ((updateDateData?.status == 'success', updateDateIsSuccess)) {
      toast.success(
        language === 'en'
          ? 'Updated date successfully'
          : language === 'ar'
          ? 'تم تحديث التاريخ بنجاح'
          : 'بەروار نوێکراوە بە سەرکەوتوویی'
      );
      return;
    }
    if (updateDateError?.data?.data?.message == 'required') {
      toast.error(
        language === 'en'
          ? 'Please enter date'
          : language === 'ar'
          ? 'يرجى ادخال التاريخ'
          : 'تکایە بەروارێک هەڵبژێرە'
      );
      return;
    }
    if (updateDateIsError) {
      toast.error(
        language === 'en'
          ? 'Failed please try again'
          : language === 'ar'
          ? 'فشل يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا تکایە هەوڵبدەرەوە'
      );
      return;
    }
  }, [updateDateIsLoading]);
  /// ----------------- handel update number
  const handleSubmitUpdateNumber = (e) => {
    e.preventDefault();
    updateNumber(number);
  };
  /// ----------------- handel update date
  const handleSubmitUpdateDate = (e) => {
    e.preventDefault();
    updateDate(date);
  };
  //---------------- hnadle number
  const handleNumber = (e) => {
    setNumber({ id: id, number: e.target.value });
  };
  //--------------- hnadle date
  const handleDate = (e) => {
    setDate({ id: id, date: e.target.value });
  };

  return getISLaoding ? (
    <Loader />
  ) : (
    !getIsError && (
      <div className="w-full flex flex-col gap-y-7">
        <div className={`flex flex-col ${rtl ? 'text-right' : 'text-left'}`}>
          <Label
            text={
              language === 'en'
                ? 'Request'
                : language === 'ar'
                ? 'الطلب'
                : 'داواکاری'
            }
            textSize={'text-3xl font-bold'}
          />
          <PrintPage id={id} />
        </div>
        <div
          className={`grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3
       xl:grid-cols-4 p-5`}
          style={{ direction: rtl ? 'rtl' : 'ltr' }}
        >
          {/*------------ update number-------- */}
          {user?.role === 'admin' && (
            <form
              onSubmit={handleSubmitUpdateNumber}
              className="flex flex-col sm:col-span-2 gap-y-4 items-start"
            >
              <label className="text-primary dark:text-secondary text-lg font-semibold">
                {language === 'en'
                  ? 'Number of Case'
                  : language === 'ar'
                  ? 'رقم القضية'
                  : 'ژمارەی دۆسیە'}
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <input
                  value={number?.number || ''}
                  onChange={handleNumber}
                  className={` outline-none rounded-full border-[1.5px]
        border-stroke bg-transparent py-3 px-5 font-medium transition
         focus:border-primary active:border-primary 
         disabled:cursor-default disabled:bg-white 
         dark:border-form-strokedark dark:bg-form-input 
         dark:focus:border-primary
          ${rtl ? 'text-right' : 'text-left'}`}
                />
                <SuccessButton
                  type="submit"
                  content={
                    language === 'en'
                      ? 'Edit'
                      : language == 'ar'
                      ? 'تعديل'
                      : 'گۆڕین'
                  }
                />
              </div>
            </form>
          )}
          {user?.role === 'emp' && (
            <Element
              label={
                language === 'en'
                  ? 'Number of Case'
                  : language === 'ar'
                  ? 'رقم القضية'
                  : 'ژمارەی دۆسیە'
              }
              content={getData?.data?.number}
            />
          )}
          {/*------------ update date-------- */}
          {user?.role === 'admin' && (
            <form
              onSubmit={handleSubmitUpdateDate}
              className="flex flex-col sm:col-span-2 gap-y-4 items-start"
            >
              <label className="text-primary dark:text-secondary text-lg font-semibold">
                {language === 'en'
                  ? 'Date of Case'
                  : language === 'ar'
                  ? 'تاريخ القضية'
                  : 'بەرواری دۆسیە'}
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <input
                  type="date"
                  value={date?.date || ''}
                  onChange={handleDate}
                  className={` outline-none rounded-full border-[1.5px]
            border-stroke bg-transparent py-3 px-5 font-medium transition
             focus:border-primary active:border-primary 
             disabled:cursor-default disabled:bg-white 
             dark:border-form-strokedark dark:bg-form-input 
             dark:focus:border-primary
              ${rtl ? 'text-right' : 'text-left'}`}
                />
                <SuccessButton
                  type="submit"
                  content={
                    language === 'en'
                      ? 'Edit'
                      : language == 'ar'
                      ? 'تعديل'
                      : 'گۆڕین'
                  }
                />
              </div>
            </form>
          )}
          {user?.role === 'emp' && (
            <Element
              label={
                language === 'en'
                  ? 'Date of Case'
                  : language === 'ar'
                  ? 'تاريخ القضية'
                  : 'بەرواری دۆسیە'
              }
              content={handelDate(getData?.data?.date)}
            />
          )}
          {/* full name */}
          <Element
            label={
              language == 'en'
                ? 'Full Name'
                : language == 'ar'
                ? 'الاسم الكامل'
                : 'ناوی تەواو'
            }
            content={getData?.data?.fullname}
          />
          {/* directorate name */}
          <Element
            label={
              language == 'en'
                ? 'Directorate Name'
                : language == 'ar'
                ? 'اسم المديرية'
                : 'ن.بەڕێوەبەرایەتی'
            }
            content={getData?.data?.dirName}
          />

          {/* directorate address */}
          <Element
            label={
              language == 'en'
                ? 'Address'
                : language == 'ar'
                ? 'عنوان'
                : 'ناونیشان'
            }
            content={getData?.data?.dirAddress}
          />
          {/* vist date */}
          <Element
            label={
              language == 'en'
                ? 'Visit Date'
                : language == 'ar'
                ? 'تاريخ الزيارة'
                : 'بەرواری سەردان'
            }
            content={handelDate(getData?.data?.dateVist)}
          />
          {/* problem */}
          <Element
            label={
              language == 'en' ? 'Problem' : language == 'ar' ? 'مشكلة' : 'کێشە'
            }
            content={getData?.data?.problem}
          />
          {/* phone */}
          <Element
            label={
              language == 'en'
                ? 'Phone Number'
                : language == 'ar'
                ? 'رقم الهاتف'
                : 'ژمارەی تەلەفون'
            }
            content={getData?.data?.phone}
          />
          {/* select employee for visit width tow column  */}
          <Element
            label={
              language == 'en'
                ? 'Maintenance employee'
                : language == 'ar'
                ? 'موظف صيانة'
                : 'کارمەندی چاککردنەوە'
            }
            content={getData?.data?.empVist?.fullname}
          />
          {/* request description */}

          <div
            className="col-span-1 sm:col-span-2 md:col-span-3
       xl:col-span-4"
          >
            <Element
              label={
                language == 'en'
                  ? 'Note'
                  : language == 'ar'
                  ? 'ملاحظات'
                  : 'تێبینی'
              }
              content={getData?.data?.desc}
            />
          </div>
          {/* emp note */}
          <div
            className="col-span-1 sm:col-span-2 md:col-span-3
       xl:col-span-4"
          >
            <Element
              label={
                language == 'en'
                  ? 'Repair Department Note'
                  : language == 'ar'
                  ? 'ملاحظة قسم الإصلاح'
                  : 'تێبینی بەشی چاککردنەوە'
              }
              content={getData?.data?.empDesc}
            />{' '}
          </div>
        </div>
      </div>
    )
  );
}

export default EditCompeletRequest;
