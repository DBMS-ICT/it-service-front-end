import React from 'react';
import {
  useGetRepairDataQuery,
  useDeleteRepairDataMutation,
} from '../../app/api/repair.data';
import Loader from '../common/Loader';
import { useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import CustomeButton from '../common/Button/CustomeButton';

function RepairList() {
  const { language, rtl } = useSelector((state) => state.language);
  const {
    data: repairData,
    isLoading: isLoadingRepair,
    isError: isErrorRepair,
  } = useGetRepairDataQuery();
  const [deleteRepairData] = useDeleteRepairDataMutation();
  const handleDelete = (e) => {
    deleteRepairData({ id: id });
  };
  return (
    <div>
      {isErrorRepair ? (
        ''
      ) : isLoadingRepair ? (
        <Loader />
      ) : (
        repairData?.data?.map((repair, index) => (
          <div
            className={`flex ${rtl ? 'flex-row-reverse' : 'flex-row'} 
             gap-3 p-3 border-b border-stroke dark:border-form-strokedark`}
            key={repair._id}
          >
            <p
              className={`flex ${
                rtl ? 'flex-row' : 'flex-row-reverse'
              } gap-3 gap-x-5`}
            >
              {repair.name}

              <CustomeButton
                icon={
                  <MdDelete
                    className={isLoadingRepair ? 'animate-spin' : 'text-danger'}
                    size={27}
                  />
                }
                onClick={() => {
                  // create alert for qustion to are delete or not
                  const answer = window.confirm(
                    language === 'en'
                      ? 'Are you sure you want to delete this repair?'
                      : language === 'ar'
                      ? 'هل أنت متأكد أنك تريد حذف هذا الإصلاح؟'
                      : 'دڵنیای کە دەتەوێت ئەم چاککردنەوە بسڕیتەوە؟'
                  );
                  if (answer) {
                    deleteRepairData({ id: repair._id });
                  }
                }}
              />
              {index + 1}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RepairList;
