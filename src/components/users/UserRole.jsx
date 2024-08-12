import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateRoleMutation } from '../../app/api/user';
import toast from 'react-hot-toast';

function UserRole({ id, role }) {
  const { language, rtl } = useSelector((state) => state.language);
  const [
    updateRole,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateRoleMutation();
  const handleUpdateRole = (e) => {
    updateRole({ id, role: e.target.value });
  };
  useEffect(() => {
    if (isErrorUpdate) {
      toast.error(
        language === 'en'
          ? 'The role change failed'
          : language === 'ar'
          ? 'فشل تغيير الدور'
          : 'گۆڕینی ڕۆڵەکە شکستی هێنا'
      );
      return;
    }
    if (isSuccessUpdate && dataUpdate.status == 'success') {
      toast.success(
        language === 'en'
          ? 'The role changed successfully'
          : language === 'ar'
          ? 'تم تغيير الدور بنجاح'
          : 'ڕۆڵەکە بە سەرکەوتوویی گۆڕا'
      );
      return;
    }
  }, [isLoadingUpdate]);
  return (
    <select
      disabled={isLoadingUpdate}
      onChange={handleUpdateRole}
      defaultValue={role}
      className="w-[90px] dark:bg-black text-center"
    >
      <option value="admin">
        {language === 'en' ? 'Admin' : language === 'ar' ? 'مدير' : 'ئەدمین'}
      </option>
      <option value="emp">
        {language === 'en'
          ? 'Employee'
          : language === 'ar'
          ? 'موظف'
          : 'کارمەند'}
      </option>
    </select>
  );
}

export default UserRole;
