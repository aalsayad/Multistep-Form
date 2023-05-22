import React from 'react';
import './Plan.styles.css';
import { MdOutlineLocalOffer } from 'react-icons/md';
import PlanCard from './PlanCard';
import useFormStore from '../../../Stores/FormStore';
import { useAnimate, stagger } from 'framer-motion';
import { useEffect } from 'react';

function PlanSelection() {
  //Access Store for Plans
  const plans = useFormStore((state) => state.plans);
  const yearlyBilling = useFormStore((state) => state.yearlyBilling);
  const toggleBilling = useFormStore((state) => state.toggleBilling);

  //Control Monthly/Yearly Plans
  const handleToggleSwitch = () => {
    toggleBilling();
  };

  //Animations
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const startAnimation = () => {
      animate('#animate-plan-card', { y: [20, 0], opacity: [0, 1] }, { duration: 0.45, delay: stagger(0.05) });
    };
    startAnimation();
  }, []);

  //Render
  return (
    <div ref={scope}>
      <div className='form_section-heading-group'>
        <h1 className='form_section-heading'>Select Your Plan</h1>
        <h3 className='form_section-subheading'>You have the option of monthly or yearly billing.</h3>
      </div>
      <div className='form_monthly-toggle-container'>
        <div className='flex'>
          <MdOutlineLocalOffer size={'15px'} style={{ marginRight: '10px' }} />
          <p>
            Save More with <br></br> Yearly Subscriptions
          </p>
        </div>

        <div className='flex'>
          <p className={`form_toggle-p ${!yearlyBilling ? 'active' : null}`}>Monthly</p>
          <div onClick={handleToggleSwitch} className='form_monthly-toggle'>
            <div className={`form_monthly-toggle-dot ${yearlyBilling && 'yearly'}`}></div>
          </div>
          <p className={`form_toggle-p  ${yearlyBilling ? 'active' : null}`}>Yearly</p>
        </div>
      </div>
      <div className='form-plan_cards-container'>
        {plans.map((plan) => {
          return (
            <div key={plan.id} id='animate-plan-card'>
              <PlanCard
                id={plan.id}
                title={plan.title}
                icon={plan.icon}
                color={plan.color}
                monthlyPrice={plan.monthlyPrice}
                yearlyPrice={plan.yearlyPrice}
                selected={plan.selected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanSelection;
