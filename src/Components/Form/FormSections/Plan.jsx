import React from 'react';
import './Plan.styles.css';
import { MdOutlineLocalOffer } from 'react-icons/md';
import PlanCard from './PlanCard';
import useFormStore from '../../../Stores/FormStore';
import { useAnimate, cubicBezier, stagger, easeInOut } from 'framer-motion';
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
    const easing = cubicBezier(0.76, 0, 0.24, 1);
    const startAnimation = () => {
      animate([
        ['#plan_card', { y: [20, 0] }, { ease: easing, duration: 0.3, delay: stagger(0.05) }],
        ['#plan_card', { opacity: [0, 1] }, { ease: easing, duration: 0.75, delay: stagger(0.05), at: 0 }],
      ]);
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
            <PlanCard
              key={plan.id}
              id={plan.id}
              title={plan.title}
              icon={plan.icon}
              color={plan.color}
              monthlyPrice={plan.monthlyPrice}
              yearlyPrice={plan.yearlyPrice}
              selected={plan.selected}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PlanSelection;
