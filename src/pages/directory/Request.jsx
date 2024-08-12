import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Label from '../../components/common/Label';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useGetAllDirectoriesQuery } from '../../app/api/directory';
import { useGetRepairDataQuery } from '../../app/api/repair.data';
import TextArea from '../../components/common/TextArea';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import LanguageChange from '../../components/header/LanguageChange';
import DarkModeSwitcher from '../../components/header/DarkModeSwitcher';
import toast from 'react-hot-toast';
import { useAddRequestMutation } from '../../app/api/request';
import SuccessButton from '../../components/common/Button/SuccessButton';
function Request() {
  const [dirOption, setDirOption] = useState([]);
  const [repairOption, setRepairOption] = useState([]);
  const [data, setData] = useState({
    fullname: '',
    dirName: '',
    dirAddress: '',
    dateVist: '',
    problem: '',
    desc: '',
    phone: '',
  });
  const [
    addRequest,
    {
      isLoading: addLoading,
      isError: addISErro,
      error: addError,
      isSuccess: addSuccess,
      data: addData,
    },
  ] = useAddRequestMutation();
  const { language, rtl } = useSelector((state) => state.language);
  const {
    data: dirData,
    isLoading: dirLoading,
    isSuccess: dirSuccess,
    isError: dirError,
  } = useGetAllDirectoriesQuery();
  const {
    data: repairData,
    isLoading: repairLoading,
    isSuccess: repairSuccess,
    isError: repairError,
  } = useGetRepairDataQuery();
  useEffect(() => {
    if (dirData) {
      setDirOption(dirData?.data);
    }
  }, [dirData]);
  useEffect(() => {
    if (repairData) {
      setRepairOption(repairData?.data);
    }
  }, [repairData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest(data);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'dateVist') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Add one day to today's date
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (selectedDate >= tomorrow) {
        setData({ ...data, [name]: value });
      } else {
        // show warning message
        toast.error(
          language == 'en'
            ? 'Please select a date in the future'
            : language == 'ar'
            ? 'الرجاء تحديد تاريخ في المستقبل'
            : 'تکایە بەروارێک بۆ داهاتوو هەڵبژێرە'
        );
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSelectDirname = (e) => {
    const selectedDirName = e.target.value;
    const selectedDir = dirOption.find((item) => item.name === selectedDirName);

    if (selectedDir) {
      setData({
        ...data,
        dirName: selectedDir.name,
        dirAddress: selectedDir.address,
        phone: selectedDir.phone,
      });
    }
  };
  useEffect(() => {
    if (addData?.status === 'success') {
      toast.success(
        language == 'en'
          ? 'Request sent successfully'
          : language == 'ar'
          ? 'تم إرسال الطلب بنجاح'
          : 'داواکاری بە سەرکەوتوویی نێردراوە'
      );
      setData({
        fullname: '',
        dirName: '',
        dirAddress: '',
        dateVist: '',
        problem: '',
        desc: '',
        phone: '',
      });
      return;
    }
    if (addError?.data?.data?.message == 'required') {
      toast.error(
        language == 'en'
          ? 'Please fill all required fields'
          : language == 'ar'
          ? 'يرجى تعبئة جميع الحقول المطلوبة'
          : 'تکایە هەموو بوارە پێویستەکان پڕبکەنەوە'
      );
      return;
    }
    if (addISErro || addError?.data?.data?.message == 'not-created') {
      toast.error(
        language == 'en'
          ? 'Failed, please try again !'
          : language == 'ar'
          ? 'فشلت، يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا، تکایە دووبارە هەوڵبدەرەوە'
      );
      return;
    }
  }, [addLoading]);
  return (
    <div className="w-full min-h-screen bg-[#836748] dark:bg-black text-black dark:text-white font-bold font-noto_nash">
      <div className=" flex justify-center p-5">
        <img
          src="https://gov.krd/media/8833/261356929_4509713965732427_1305439089432682545_n.jpg?anchor=center&mode=crop&width=1200&height=630&rnd=132827462640000000"
          className="w-full h-30"
        />
      </div>
      <h1
        className={`mt-10 text-3xl font-bold text-center text-dark dark:text-white`}
      >
        {language == 'en'
          ? 'Service Form'
          : language == 'ar'
          ? 'نموذج الخدمة'
          : ' IT فۆڕمی خزمەتگوزاری  '}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-5 py-6 w-full md:w-2/3 lg:w-1/2 mx-auto"
      >
        {/*-------------- fullname -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Full Name'
                : language == 'ar'
                ? 'الاسم الكامل'
                : 'ناوى تەواو'
            }
            textSize={'text-xl'}
          />
          <Input
            reqired={true}
            disabled={dirError ? false : dirLoading ? true : false}
            value={data.fullname}
            name={'fullname'}
            onChange={handleInput}
          />
        </div>
        {/*-------------- directorate name -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Directorate Name'
                : language == 'ar'
                ? 'اسم المديرية'
                : 'ناوی بەڕێوبەرایەتی'
            }
            textSize={'text-xl'}
          />
          {/* <Select
            reqired={true}
            disabled={dirError ? false : dirLoading ? true : false}
            option={dirOption}
            objName={'name'}
            onChange={handleSelectDirname}
            name={'dirName'}
          /> */}

          <Input
            reqired={true}
            disabled={dirError ? false : dirLoading ? true : false}
            type={'text'}
            value={data.dirName}
            name={'dirName'}
            onChange={handleInput}
          />
        </div>
        {/*-------------- phone -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Phone Number'
                : language == 'ar'
                ? 'رقم التليفون'
                : 'ژمارەی مۆبایل'
            }
            textSize={'text-xl'}
          />
          <Input
            reqired={true}
            disabled={dirError ? false : dirLoading ? true : false}
            type={'text'}
            value={data.phone}
            name={'phone'}
            onChange={handleInput}
          />
        </div>

        {/*-------------- address -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Address'
                : language == 'ar'
                ? 'العنوان'
                : 'ناونیشان'
            }
            textSize={'text-xl'}
          />
          <Input
            reqired={true}
            disabled={dirError ? false : dirLoading ? true : false}
            type={'text'}
            value={data.dirAddress}
            name={'dirAddress'}
            onChange={handleInput}
          />
        </div>
        {/*-------------- date of visit -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Date of visit'
                : language == 'ar'
                ? 'تاريخ الزيارة'
                : 'بەرواری سەردانیکردن'
            }
            textSize={'text-xl'}
          />
          <Input
            type={'date'}
            value={data.dateVist}
            name={'dateVist'}
            onChange={handleInput}
          />
        </div>

        {/*-------------- problem -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Problem'
                : language == 'ar'
                ? 'المشكلة'
                : 'کێشە'
            }
            textSize={'text-xl'}
          />
          <Select
            reqired={true}
            disabled={repairError ? false : repairLoading ? true : false}
            option={repairOption}
            objName={'name'}
            onChange={handleInput}
            name={'problem'}
          />
        </div>
        {/* -------------- description -------------- */}
        <div className="flex flex-col gap-2">
          <Label
            text={
              language == 'en'
                ? 'Note'
                : language == 'ar'
                ? 'ملاحظات'
                : 'تێبینی'
            }
            textSize={'text-xl'}
          />
          <TextArea
            rounded={'rounded-full'}
            rows={2}
            value={data.desc}
            name={'desc'}
            hndleOnChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <SuccessButton
            type={'Submit'}
            content={
              language == 'en'
                ? 'Submit'
                : language == 'ar'
                ? 'يُقدِّم'
                : 'پێشکەشکردن'
            }
          />
        </div>
      </form>
      <div
        className={`w-full bg-[#745b3f] flex p-3 border-b ${
          rtl ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className="flex pb-4">
          <div className="mt-5">
            <LanguageChange />
          </div>
          <div className="ml-5">
            <DarkModeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
