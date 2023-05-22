import React from 'react';

import './Steps.styles.css';

function Steps({ number, currentStep, setCurrentStep, title, navigationEnabled }) {
  const handleStepSelect = () => {
    if (navigationEnabled) {
      setCurrentStep(number);
    }
  };
  return (
    <div onClick={handleStepSelect} className={currentStep !== number ? 'step_container' : 'step_container active'}>
      <div className={currentStep !== number ? 'step_circle-no' : 'step_circle-no active'}>{number}</div>
      <div className='step_info'>
        <p className='step_info-subtitle'>Step {number}</p>
        <h2 className='step_info-title'>{title}</h2>
      </div>
    </div>
  );
}

export default Steps;
