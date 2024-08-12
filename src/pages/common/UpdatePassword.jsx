import React, { useEffect, useState } from 'react';
import Label from '../../components/common/Label';
import { useSelector } from 'react-redux';
import { useUpdatePasswordMutation } from '../../app/api/user';
import Input from '../../components/common/Input';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function UpdatePassword() {
  const [UpdatePassword, { isLoading, isSuccess, isError, error, data }] =
    useUpdatePasswordMutation();
  const { language, rtl } = useSelector((state) => state.language);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  useEffect(() => {
    if (data?.status === 'success' && isSuccess) {
      toast.success(
        language == 'en'
          ? 'Password changed successfully'
          : language == 'ar'
          ? 'تم تغيير كلمة المرور بنجاح'
          : 'وشەی نهێنی بە سەرکەوتوویی گۆڕدرا'
      );
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      return;
    }
    if (isError || data?.status === 'failed') {
      toast.error(
        language == 'en'
          ? 'Something went wrong, please try again later.'
          : language == 'ar'
          ? 'حدث خطأ ما ، يرجى المحاولة مرة اخرى لاحقاً.'
          : 'شتێک هەڵە بوو. تکایە دوبارە هەوڵ بدەرەوە.'
      );
      return;
    }
  }, [isLoading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword.length < 8) {
      toast.error(
        language == 'en'
          ? 'Password must be at least 8 characters long'
          : language == 'ar'
          ? 'كلمة المرور يجب ان تكون على الاقل 8 حروف'
          : 'پێویستە وشەی نهێنی لانیکەم ٨ پیت بێت'
      );
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error(
        language == 'en'
          ? 'The new password and confirmation password do not match.'
          : language == 'ar'
          ? 'كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين.'
          : 'وشەی نهێنی نوێ و وشەی نهێنی پشتڕاستکردنەوە یەک ناگرنەوە.'
      );
      return;
    }
    const answer = window.confirm(
      language == 'en'
        ? 'Are you sure you want to change your password?'
        : language == 'ar'
        ? 'هل انت متأكد من تغيير كلمة المرور؟'
        : 'دڵنیای کە دەتەوێت وشەی نهێنی خۆت بگۆڕیت؟'
    );
    if (answer) UpdatePassword(passwordData);
  };

  return (
    <div className="text-black dark:text-white flex flex-col">
      <Label
        text={
          language == 'en'
            ? 'Change Password'
            : language == 'ar'
            ? 'تغيير كلمة المرور'
            : 'گۆڕینی وشەی نهێنی'
        }
        textSize={'text-2xl'}
      />
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 gap-4">
        {/* old password */}
        <div className="mb-6">
          <Label
            text={
              language == 'en'
                ? 'Old Password'
                : language == 'ar'
                ? 'كلمة المرور القديمة'
                : 'تێپەڕە وشەی کۆن'
            }
            textSize="text-lg font-medium mx-3"
          />
          <div className="relative">
            <Input
              name={'oldPassword'}
              value={passwordData.oldPassword}
              onChange={handleInput}
              reqired={true}
              isPassword={showPassword.old}
              type={showPassword.old ? 'text' : 'password'}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setShowPassword({ ...showPassword, old: !showPassword.old })
            }
            className={`
                    w-full text-right px-5 pt-3 outline-none
                     text-[#676b72] flex ${
                       rtl ? 'justify-start' : 'justify-end'
                     }`}
          >
            {!showPassword.old ? (
              <IoEye className="text-body " size={20} />
            ) : (
              <IoEyeOff className="text-body " size={20} />
            )}
          </button>
        </div>

        {/* new password */}
        <div className="mb-6">
          <Label
            text={
              language == 'en'
                ? 'New Password'
                : language == 'ar'
                ? 'كلمة المرور الجديدة'
                : 'نوێ وشەی نهێنی'
            }
            textSize="text-lg font-medium mx-3"
          />
          <div className="relative">
            <Input
              name={'newPassword'}
              value={passwordData.newPassword}
              onChange={handleInput}
              reqired={true}
              isPassword={showPassword.new}
              type={showPassword.new ? 'text' : 'password'}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setShowPassword({ ...showPassword, new: !showPassword.new })
            }
            className={`
                    w-full text-right px-5 pt-3 outline-none
                     text-[#676b72] flex ${
                       rtl ? 'justify-start' : 'justify-end'
                     }`}
          >
            {!showPassword.new ? (
              <IoEye className="text-body " size={20} />
            ) : (
              <IoEyeOff className="text-body " size={20} />
            )}
          </button>
        </div>
        {/* confirm new password */}
        <div className="mb-6">
          <Label
            text={
              language == 'en'
                ? 'Confirm New Password'
                : language == 'ar'
                ? 'تأكيد كلمة المرور الجديدة'
                : 'د.کردنەوە ووشەى نهێنى نوێ'
            }
            textSize="text-lg font-medium mx-3"
          />
          <div className="relative">
            <Input
              name={'confirmNewPassword'}
              value={passwordData.confirmNewPassword}
              onChange={handleInput}
              reqired={true}
              isPassword={showPassword.confirm}
              type={showPassword.confirm ? 'text' : 'password'}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                confirm: !showPassword.confirm,
              })
            }
            className={`
                    w-full text-right px-5 pt-3 outline-none
                     text-[#676b72] flex ${
                       rtl ? 'justify-start' : 'justify-end'
                     }`}
          >
            {!showPassword.confirm ? (
              <IoEye className="text-body " size={20} />
            ) : (
              <IoEyeOff className="text-body " size={20} />
            )}
          </button>
        </div>
        <div className="mb-6">
          <PrimaryButton
            type={'submit'}
            content={
              language == 'en' ? 'Change' : language == 'ar' ? 'تغيير' : 'گوڕین'
            }
            textSize={'text-2xl'}
          />
          <div className="mt-6 text-center">
            <p>
              {language == 'en'
                ? 'forgot password'
                : language == 'ar'
                ? 'هل نسيت كلمة المرور'
                : 'وشەی نهێنی لەبیر کردووە'}
              <Link
                to="/forget-password"
                className="text-primary dark:text-secondary mx-3"
              >
                {language == 'en'
                  ? 'click here'
                  : language == 'ar'
                  ? 'انقر هنا'
                  : 'کرتەی ئێرە بکە'}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
