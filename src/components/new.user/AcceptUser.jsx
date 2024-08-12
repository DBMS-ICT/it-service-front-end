import React from 'react';
import { useAcceptUserMutation } from '../../app/api/user';
import { SiVerizon } from 'react-icons/si';
import { useSelector } from 'react-redux';

function AcceptUser({ id }) {
  const { language } = useSelector((state) => state.language);
  const [acceptUser, { data, isLoading, isError, isSuccess }] =
    useAcceptUserMutation();
  const handleAccept = () => {
    const answer = window.confirm(
      language == 'en'
        ? 'Are you sure you want to accept this user?'
        : language == 'ar'
        ? 'هل أنت متأكد أنك تريد حذف هذا الطلب؟'
        : 'دڵنیای کە دەتەوێت ئەم بەکارهێنەرە قبوڵ بکەیت؟'
    );
    if (!isLoading && answer) acceptUser({ id: id });
  };
  return (
    <span
      onClick={handleAccept}
      className="flex justify-center coursor-pointer"
    >
      <SiVerizon
        size={20}
        className={isLoading ? 'animate-spin' : 'text-success'}
      />
    </span>
  );
}

export default AcceptUser;
