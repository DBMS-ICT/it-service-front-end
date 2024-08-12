import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TextArea from '../../components/common/TextArea';
import { useEmployeeDescriptionMutation } from '../../app/api/request';
import SuccessButton from '../common/Button/SuccessButton';
import toast from 'react-hot-toast';
function Description({ empNote, request }) {
  const [addEmpNote, setAddEmpNote] = useState({
    id: '',
    desc: '',
  });
  const { rtl, language } = useSelector((state) => state.language);
  const [addDesc, { isLoading, isError, data, error, isSuccess }] =
    useEmployeeDescriptionMutation();
  const handelChange = (e) => {
    setAddEmpNote({ id: request, desc: e.target.value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    addDesc(addEmpNote);
  };
  useEffect(() => {
    setAddEmpNote({ id: request, desc: empNote });
  }, [empNote]);
  useEffect(() => {
    if (isSuccess && data?.status == 'success') {
      toast.success(
        language == 'en'
          ? 'Successfully Added'
          : language == 'ar'
          ? 'أضيف بنجاح'
          : 'بە سەرکەوتوویی زیادکرا'
      );
      return;
    }
    if (isError) {
      toast.error(
        language == 'en'
          ? 'Failed please try again'
          : language == 'ar'
          ? 'فشل يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا تکایە هەوڵبدەرەوە'
      );
      return;
    }
  }, [isLoading]);
  return (
    <div
      className={`p-4 flex flex-col gap-3 ${rtl ? 'text-right' : 'text-left'}`}
    >
      <label className="text-primary dark:text-secondary text-lg font-semibold">
        {language == 'en'
          ? 'Repair Department Note'
          : language == 'ar'
          ? 'ملاحظة قسم الإصلاح'
          : 'تێبینی بەشی چاککردنەوە'}
      </label>
      <TextArea
        name="desc"
        hndleOnChange={handelChange}
        value={addEmpNote?.desc}
        rounded={'rounded-full'}
      />
      <div>
        <SuccessButton
          type={'button'}
          onClick={handelSubmit}
          content={
            language == 'en' ? 'Save' : language == 'ar' ? 'حفظ' : 'زەخیرەکردن'
          }
        />
      </div>
    </div>
  );
}

export default Description;
