import React from 'react';
import './AddonCard.styles.css';
import { BsCheckLg } from 'react-icons/bs';
import useFormStore from '../../../Stores/FormStore';
import { motion } from 'framer-motion';

function AddonCard({ id, fees, title, description, selected, monthlyPrice, yearlyPrice }) {
  //Get global Store
  const updateAddons = useFormStore((state) => state.updateAddons);
  const yearlyBilling = useFormStore((state) => state.yearlyBilling);

  //Update Store with new addons
  const handleAddonSelect = (id) => {
    updateAddons(id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        id='addon_card'
        onClick={() => handleAddonSelect(id)}
        className={`addon_container ${selected && 'active'}`}
      >
        <div className='flex'>
          <div className={`addon_checkbox ${selected && 'active'}`}>{selected && <BsCheckLg />}</div>
          <div className='addon_text'>
            <h3>{title}</h3>
            <h4>{description}</h4>
          </div>
        </div>

        <div className='addon_fees'>{yearlyBilling ? yearlyPrice : monthlyPrice}</div>
      </motion.div>
    </>
  );
}

export default AddonCard;
