import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateStatusMutation } from '../../app/api/user';
import toast from 'react-hot-toast';

function UserStatus({ id, status }) {
  const { language, rtl } = useSelector((state) => state.language);
  const [
    updateRole,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateStatusMutation();
  const handleUpdateStatus = (e) => {
    updateRole({ id, status: e.target.value });
  };
  useEffect(() => {
    if (isErrorUpdate) {
      toast.error(
        language === 'en'
          ? 'The status change failed'
          : language === 'ar'
          ? 'فشل تغيير الحالة'
          : 'گۆڕینی دۆخ شکستی هێنا'
      );
      return;
    }
    if (isSuccessUpdate && dataUpdate.status == 'success') {
      toast.success(
        language === 'en'
          ? 'The status changed successfully'
          : language === 'ar'
          ? 'تم تغيير الحالة بنجاح'
          : 'دۆخ بە سەرکەوتوویی گۆڕا'
      );
      return;
    }
  }, [isLoadingUpdate]);
  return (
    <select
      onChange={handleUpdateStatus}
      disabled={isLoadingUpdate}
      defaultValue={status}
      className="w-[90px] dark:bg-black text-center"
    >
      <option value="active">
        {language === 'en' ? 'Active' : language === 'ar' ? 'نشيط' : 'چالاک'}
      </option>
      <option value="block">
        {language === 'en' ? 'Block' : language === 'ar' ? 'حاجز' : 'بلۆک'}
      </option>
    </select>
  );
}

export default UserStatus;
