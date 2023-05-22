import React from 'react';
import useFormStore from '../../../Stores/FormStore';
import { motion } from 'framer-motion';

function PlanCard({ id, title, color, icon, monthlyPrice, yearlyPrice, selected }) {
  //Access Store State
  const updatePlans = useFormStore((state) => state.updatePlans);
  const yearlyBilling = useFormStore((state) => state.yearlyBilling);

  //Handle Plan Selection
  const handlePlanSelection = (id) => {
    updatePlans(id);
  };

  //Render
  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      id='plan_card'
      onClick={() => handlePlanSelection(id)}
      className={`form-plan_card ${selected && 'selected'}`}
    >
      <div style={{ background: color }} className='form-plan_card-icon'>
        <i id='plan_icon' className={`${icon} ${title}`}></i>
      </div>
      <div className='form-plan_card-content'>
        <h3>{title}</h3>
        <h4>{yearlyBilling ? yearlyPrice : monthlyPrice}</h4>
      </div>
    </motion.div>
  );
}

export default PlanCard;
