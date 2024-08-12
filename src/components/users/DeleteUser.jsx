import React, { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDeleteUserMutation } from '../../app/api/user';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function DeleteUser({ id }) {
  const { language, rtl } = useSelector((state) => state.language);
  const [deletUSer, { isLoading, isError, data, isSuccess }] =
    useDeleteUserMutation();
  const handleDelete = () => {
    const answer = window.confirm(
      language == 'en'
        ? 'Are you sure you want to delete this request?'
        : language == 'ar'
        ? 'هل أنت متأكد أنك تريد حذف هذا الطلب؟'
        : 'دڵنیای کە دەتەوێت ئەم داواکارییە بسڕیتەوە؟'
    );
    if (!isLoading && answer) deletUSer({ id: id });
  };
  useEffect(() => {
    if (isSuccess && data?.status === 'success') {
      toast.success(
        language == 'en'
          ? 'Deleted successfully'
          : language == 'ar'
          ? 'حذف بنجاح'
          : 'بە سەرکەوتوویی سڕایەوە'
      );
      return;
    }
    if (isError) {
      toast.error(
        language == 'en'
          ? 'Not deleted, please try again'
          : language == 'ar'
          ? 'لم يتم حذف، يرجى المحاولة مرة اخرى'
          : 'نەسڕایەوە تکایە دووبارە هەوڵبدەرەوە'
      );
      return;
    }
  }, [isLoading]);
  return (
    <div>
      <span
        onClick={handleDelete}
        className="flex justify-center coursor-pointer"
      >
        <MdDelete
          className={isLoading ? 'animate-spin' : 'text-danger'}
          size={27}
        />
      </span>
    </div>
  );
}

export default DeleteUser;
