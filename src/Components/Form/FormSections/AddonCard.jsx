import React from 'react';
import './AddonCard.styles.css';
import { BsCheckLg } from 'react-icons/Bs';
import useFormStore from '../../../Stores/FormStore';

function AddonCard({ id, fees, title, description, selected }) {
  //Get Store
  const updateAddons = useFormStore((state) => state.updateAddons);

  //Update Store with new addons
  const handleAddonSelect = (id) => {
    updateAddons(id);
  };

  return (
    <>
      <div onClick={() => handleAddonSelect(id)} className={`addon_container ${selected && 'active'}`}>
        <div className='flex'>
          <div className={`addon_checkbox ${selected && 'active'}`}>{selected && <BsCheckLg />}</div>
          <div className='addon_text'>
            <h3>{title}</h3>
            <h4>{description}</h4>
          </div>
        </div>

        <div className='addon_fees'>{fees}</div>
      </div>
    </>
  );
}

export default AddonCard;
