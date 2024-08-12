import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useCheckForgetQuery,
  useUpdateForgetPasswordMutation,
} from '../../app/api/user';
import Loader from '../../components/common/Loader';
import Label from '../../components/common/Label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { useSelector } from 'react-redux';
import Input from '../../components/common/Input';
import LanguageChange from '../../components/header/LanguageChange';
import DarkModeSwitcher from '../../components/header/DarkModeSwitcher';
import toast from 'react-hot-toast';

function UpdateForgetPassword() {
  const { language, rtl } = useSelector((state) => state.language);
  const { id } = useParams();
  const navigate = useNavigate();

  const [
    UpdatePassword,
    {
      data: updateData,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
      isLoading: updateIsLoading,
    },
  ] = useUpdateForgetPasswordMutation();

  const {
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    isLoading: getIsLoading,
    error: getError,
  } = useCheckForgetQuery(id);

  useEffect(() => {
    if (updateData?.status === 'success' && updateIsSuccess) {
      toast.success(
        language === 'en'
          ? 'Password updated successfully'
          : language === 'ar'
          ? 'تم تحديث كلمة المرور بنجاح'
          : 'وشەی نهێنی بە سەرکەوتوویی نوێکرایەوە'
      );
      navigate('/auth/signin');
      return;
    }
    if (updateData?.status === 'failed') {
      toast.error(
        language === 'en'
          ? 'Something went wrong, please try again later.'
          : language === 'ar'
          ? 'حدث خطأ ما ، يرجى المحاولة مرة اخرى لاحقاً.'
          : 'شتێک هەڵە بوو. تکایە دوبارە هەوڵ بدەرەوە'
      );
      return;
    }
  }, [updateData, updateIsLoading]);

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value, code: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /// password equla and more than 8
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
    /// password equla and more than 8
    UpdatePassword(passwordData);
  };

  useEffect(() => {
    if (
      getIsError ||
      getError?.data?.data?.message === '100' ||
      updateIsError ||
      updateError?.data?.data?.message === '100'
    ) {
      navigate('/forget-password', { replace: true });
    }
  }, [getIsError, getError, navigate, updateError, updateIsError]);

  if (getIsLoading || updateIsLoading) {
    return <Loader />;
  }

  if (getIsSuccess && getData?.status === 'success') {
    return (
      <div className="min-h-screen dark:bg-black text-black dark:text-white">
        <div
          className={`w-full bg-black flex p-3 border-b ${
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
        <div
          className="p-5 md:p-10 
         flex flex-col items-center justify-center max-w-[650px] mx-auto"
        >
          <div
            className={`w-full pb-5 font-bold ${
              rtl ? 'text-right' : 'text-left'
            }`}
          >
            <Label
              text={
                language === 'en'
                  ? 'Change Password'
                  : language === 'ar'
                  ? 'تغيير كلمة المرور'
                  : 'گۆڕینی وشەی نهێنی'
              }
              textSize={'text-2xl'}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 gap-4"
          >
            {/* new password */}
            <div className="mb-6">
              <Label
                text={
                  language === 'en'
                    ? 'New Password'
                    : language === 'ar'
                    ? 'كلمة المرور الجديدة'
                    : 'وشەی نهێنی نوێ'
                }
                textSize="text-lg font-medium mx-3"
              />
              <div className="relative">
                <Input
                  name={'newPassword'}
                  value={passwordData.newPassword}
                  onChange={handleInput}
                  required={true}
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
                  language === 'en'
                    ? 'Confirm New Password'
                    : language === 'ar'
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
                  required={true}
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
                  language === 'en'
                    ? 'Change'
                    : language === 'ar'
                    ? 'تغيير'
                    : 'گۆڕین'
                }
                textSize={'text-2xl'}
              />
              <div className="mt-6 text-center">
                <p>
                  {language === 'en'
                    ? 'forgot password'
                    : language === 'ar'
                    ? 'هل نسيت كلمة المرور'
                    : 'وشەی نهێنی لەبیر کردووە'}
                  <Link
                    to="/forget-password"
                    className="text-primary dark:text-secondary mx-3"
                  >
                    {language === 'en'
                      ? 'click here'
                      : language === 'ar'
                      ? 'انقر هنا'
                      : 'کرتەی ئێرە بکە'}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <Loader />;
}

export default UpdateForgetPassword;
