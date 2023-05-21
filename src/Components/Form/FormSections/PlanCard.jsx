import React from 'react';
import useFormStore from '../../../Stores/FormStore';

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
    <div onClick={() => handlePlanSelection(id)} className={`form-plan_card ${selected && 'selected'}`}>
      <div style={{ background: color }} className='form-plan_card-icon'>
        <i id='plan_icon' className={`${icon} ${title}`}></i>
      </div>
      <div className='form-plan_card-content'>
        <h3>{title}</h3>
        <h4>{yearlyBilling ? yearlyPrice : monthlyPrice}</h4>
      </div>
    </div>
  );
}

export default PlanCard;
