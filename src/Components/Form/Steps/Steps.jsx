import React from 'react';
import { motion } from 'framer-motion';
import './Steps.styles.css';

function Steps({ number, currentStep, setCurrentStep, title, navigationEnabled }) {
  const handleStepSelect = () => {
    if (navigationEnabled) {
      setCurrentStep(number);
    }
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      id='step-animate'
      onClick={handleStepSelect}
      className={currentStep !== number ? 'step_container' : 'step_container active'}
    >
      <div className={currentStep !== number ? 'step_circle-no' : 'step_circle-no active'}>{number}</div>
      <div className='step_info'>
        <p className='step_info-subtitle'>Step {number}</p>
        <h2 className='step_info-title'>{title}</h2>
      </div>
    </motion.div>
  );
}

export default Steps;
