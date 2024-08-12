import React, { useState } from 'react';
import AddDirectory from '../../components/directory/AddDirectory';
import SuccessButton from '../../components/common/Button/SuccessButton';
import { useSelector } from 'react-redux';
import { IoMdAddCircle } from 'react-icons/io';
import DirectoryList from '../../components/directory/DirectoryList';
function Directory() {
  const { language } = useSelector((state) => state.language);
  const [showModal, setShowModal] = useState({ add: false, edit: false });
  return (
    <div className="w-full flex flex-col gap-3 gap-y-8">
      <SuccessButton
        icon={<IoMdAddCircle />}
        content={
          language == 'en'
            ? 'Add Directory'
            : language == 'ar'
            ? 'اضافة مديرية'
            : 'زیادکردنی بەڕێوبەرایەتی'
        }
        onClick={() => setShowModal({ add: true })}
      />
      {showModal.add && <AddDirectory setShowModal={setShowModal} />}

      <div className="max-w-full overflow-x-auto">
        <DirectoryList />
      </div>
    </div>
  );
}

export default Directory;
