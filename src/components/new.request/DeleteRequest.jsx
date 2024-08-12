import React, { useEffect } from 'react';
import CustomeButton from '../common/Button/CustomeButton';
import { MdDelete } from 'react-icons/md';
import { useDeleteRequestMutation } from '../../app/api/request';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function DeleteRequest({ id, getISLaoding }) {
  const { language } = useSelector((state) => state.language);
  const [
    dalete,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      data: dataDelete,
      error: errorDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteRequestMutation();
  const handleDalete = () => {
    if (!id) {
      return toast(
        language == 'en'
          ? 'Please select row'
          : language == 'ar'
          ? 'يرجى تحديد الصف'
          : 'تکایە ڕیزێک هەڵبژێرە'
      );
    }
    const answer = window.confirm(
      language == 'en'
        ? 'Are you sure you want to delete this request?'
        : language == 'ar'
        ? 'هل أنت متأكد أنك تريد حذف هذا الطلب؟'
        : 'دڵنیای کە دەتەوێت ئەم داواکارییە بسڕیتەوە؟'
    );
    if (answer) dalete({ id: id });
  };
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(
        language == 'en'
          ? 'Deleted successfully'
          : language == 'ar'
          ? 'تم حذف بنجاح'
          : ' بە سەرکەوتوویی سڕایەوە'
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
  }, [dataDelete]);
  return (
    <CustomeButton
      content={
        <MdDelete
          className={getISLaoding ? 'animate-spin' : 'text-danger'}
          size={27}
        />
      }
      onClick={handleDalete}
    />
  );
}

export default DeleteRequest;
