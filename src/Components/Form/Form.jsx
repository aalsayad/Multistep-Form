import React from 'react';
import Info from './FormSections/Info';
import Plan from './FormSections/Plan';
import Addons from './FormSections/Addons';
import Summary from './FormSections/Summary';
import BgVideo from '../../assets/animated-BG.webm';
import Steps from './Steps/Steps';
import './Form.styles.css';
import { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';

function Form() {
  //State to check for Info form completion
  const [navigationEnabled, setNavigationEnabled] = useState(false);

  //Track Steps
  const [currentStep, setCurrentStep] = useState(1);
  const stepTitles = [
    {
      id: 1,
      title: 'Your Info',
    },
    {
      id: 2,
      title: 'Select Plan',
    },
    {
      id: 3,
      title: 'Add-ons',
    },
    {
      id: 4,
      title: 'Summary',
    },
  ];

  const handlePreviousStep = () => {
    if (currentStep > 1 && navigationEnabled) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleNextStep = () => {
    if (currentStep < 4 && navigationEnabled) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <>
      <div className='fullscreen-centered'>
        <div className='form_container'>
          <div className='form_steps-container'>
            {stepTitles.map((step) => {
              return (
                <Steps
                  key={step.id}
                  number={step.id}
                  title={step.title}
                  setCurrentStep={setCurrentStep}
                  currentStep={currentStep}
                  navigationEnabled={navigationEnabled}
                />
              );
            })}
            <div className='form_steps-video'>
              <video className='form_steps-videofile' autoPlay muted loop>
                <source src={BgVideo} type='video/webm' />
              </video>
            </div>
          </div>
          <div className='form_sections'>
            {currentStep === 1 && <Info setNavigationEnabled={setNavigationEnabled} />}
            {currentStep === 2 && <Plan />}
            {currentStep === 3 && <Addons />}
            {currentStep === 4 && <Summary />}
          </div>
          <div className='form_buttons-container'>
            {currentStep !== 1 ? (
              <button onClick={handlePreviousStep} className='button previous'>
                Go Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep !== 4 ? (
              <button onClick={handleNextStep} className={`button next ${!navigationEnabled && 'disabled'}`}>
                Next Step <AiOutlineRight className='form_button-icon' />
              </button>
            ) : (
              <button onClick={handleSubmit} className='button next'>
                Submit Form
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
