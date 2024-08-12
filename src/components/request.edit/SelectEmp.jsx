import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetActiveEmployeeQuery } from '../../app/api/user';
import { useAddEmployeeMutation } from '../../app/api/request';
import SuccessButton from '../common/Button/SuccessButton';
import toast from 'react-hot-toast';
function SelectEmp({ request }) {
  const [
    addEmployee,
    {
      isLoading: addIsLoading,
      isError: addIsError,
      data: addData,
      error: addError,
      isSuccess: addIsSuccess,
    },
  ] = useAddEmployeeMutation();
  const [addEmp, setAddEmp] = useState({
    request: '',
    emp: '',
  });
  useEffect(() => {
    setAddEmp({ ...addEmp, request: request });
  }, [request]);

  const {
    data: getData,
    isSuccess: getIsSuccess,
    isError: getIsError,
    isLoading: getIsLoading,
    error: getError,
  } = useGetActiveEmployeeQuery();
  const { rtl, language } = useSelector((state) => state.language);
  const handelChange = (e) => {
    setAddEmp({ ...addEmp, emp: e.target.value });
  };
  const AddEmployee = (e) => {
    e.preventDefault();
    if (request) addEmployee(addEmp);
  };
  useEffect(() => {
    if (addIsError) {
      toast.error(
        language == 'en'
          ? 'Failed please try again'
          : language == 'ar'
          ? 'فشل يرجى المحاولة مرة أخرى'
          : 'شکستی هێنا تکایە هەوڵبدەرەوە'
      );
      return;
    }
    if (addIsSuccess && addData?.status == 'success') {
      toast.success(
        language == 'en'
          ? 'Successfully Added'
          : language == 'ar'
          ? 'أضيف بنجاح'
          : 'بە سەرکەوتوویی زیادکرا'
      );
    }
  }, [addIsLoading]);
  return !getIsError && getIsLoading
    ? ''
    : request && (
        <div
          className={`p-4 flex flex-col gap-3 ${
            rtl ? 'text-right' : 'text-left'
          }`}
        >
          <label className="text-primary dark:text-secondary text-lg font-semibold">
            {language == 'en'
              ? 'Select Employee'
              : language == 'ar'
              ? 'اختر الموظف'
              : 'دیاری کردنی کارمەند'}
          </label>
          <form
            onSubmit={AddEmployee}
            className="w-full flex items-center justify-center gap-x-2"
          >
            <select
              required={true}
              onChange={handelChange}
              disabled={
                getIsError || getIsLoading || addIsLoading || addIsError
              }
              className={`w-full outline-none rounded-full border-[1.5px]
    border-stroke bg-transparent py-3 px-5 font-medium transition
     focus:border-primary active:border-primary 
     disabled:cursor-default disabled:bg-white 
     dark:border-form-strokedark dark:bg-form-input 
     dark:focus:border-primary
      ${rtl ? 'text-right pr-3' : 'text-left pl-3'} `}
            >
              <option value="">
                {language == 'en'
                  ? 'Select'
                  : language == 'ar'
                  ? 'اختر'
                  : 'دیاری کردن'}
              </option>
              {!getIsError &&
                !getIsLoading &&
                getIsSuccess &&
                getData?.data?.data?.map((emp) => (
                  <option key={emp?._id} value={emp?._id}>
                    {emp?.fullname}
                  </option>
                ))}
            </select>
            <SuccessButton
              disabled={getIsLoading || addIsLoading}
              type="submit"
              content={
                language == 'en'
                  ? 'Add'
                  : language == 'ar'
                  ? 'اضافة'
                  : 'زیادکردن'
              }
            />
          </form>
        </div>
      );
}

export default SelectEmp;
