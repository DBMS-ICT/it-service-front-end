import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAddReqCompleteMutation } from '../../../app/api/request';
import { MdOutlineDone } from 'react-icons/md';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddCompleteRequest({ reqId }) {
  const { language, rtl } = useSelector((state) => state.language);
  const [
    addToCompleted,
    {
      isLoading: addIsLoading,
      isError: addIsError,
      data: addData,
      error: addError,
      isSuccess: addIsSuccess,
    },
  ] = useAddReqCompleteMutation();
  const addToCompletedHandler = () => {
    const answer = window.confirm(
      language === 'en'
        ? 'Are you sure you want to end the work?'
        : language === 'ar'
        ? 'هل انت متاكد من انك تريد الانتهاء من العمل؟'
        : 'دڵنیای کە دەتەوێت کۆتایی بە کارەکە بهێنیت؟'
    );
    if (answer) addToCompleted({ id: reqId });
  };
  useEffect(() => {
    if (addIsSuccess && addData?.status === 'success') {
      toast.success(
        language === 'en'
          ? 'Successfully completed'
          : language === 'ar'
          ? 'تمت العمل بنجاح'
          : 'بە سەرکەوتویی تەواوکرا'
      );
    }
  }, [addIsLoading]);

  if (addIsSuccess && addData?.status === 'success') {
    return <Navigate to={'/processing'} />;
  }
  return (
    <button
      type="button"
      onClick={addToCompletedHandler}
      className={`bg-primary dark:bg-meta-4 rounded-md flex items-center gap-2
         px-3 py-2 text-white  ${rtl && 'flex-row-reverse'}`}
    >
      <MdOutlineDone size={20} />
      {language === 'en'
        ? 'End the Work'
        : language === 'ar'
        ? 'انهاء العمل'
        : 'کۆتایی بە کارەکە بهێنە'}
    </button>
  );
}

export default AddCompleteRequest;
