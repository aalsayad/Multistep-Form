import { useEffect, useState } from 'react';
import useFormStore from '../../../Stores/FormStore';
import InfoInput from './InfoInput';

function Info({ setNavigationEnabled }) {
  //Access Info from Global Store
  const [info, updateInfo] = useFormStore((state) => [state.info, state.updateInfo]);

  //Access Error States from Global Store
  const [errorState, updateErrorState] = useFormStore((state) => [state.infoErrors, state.updateInfoErrors]);

  //Track the number of currently verified fields
  const [currentlyVerifiedFileds, setCurrentlyVerifiedFileds] = useState(0);

  //Enabled Navigation if all error states are verified
  useEffect(() => {
    const enableNavigation = () => {
      //Update Navigation
      if (errorState.name === 'verified' && errorState.email === 'verified' && errorState.phone === 'verified') {
        setNavigationEnabled(true);
      } else {
        setNavigationEnabled(false);
      }
    };
    enableNavigation();
  }, [errorState]);

  //Handle Input Change and Update Store State
  const handleInput = (e) => {
    let currentName = e.target.name;
    let value = e.target.value;
    //Updating Info
    updateInfo(currentName, value);

    //Check if atleast 2 are verified so we can start validating the third on input change
    //spoil UX if we need to wait for blur
    if (currentlyVerifiedFileds === 2 && value.length > 2) {
      validateInput(currentName, value);
    }

    //Validate Inputs ONLY if the input has an error message (the >10 happens because the error message
    //is long so its the condition that becomes true when there is an error)
    if (errorState[currentName].length > 10) {
      validateInput(currentName, value);
    }
  };

  //Input Validation
  const validateInput = (name, value) => {
    const nameRegex = /^[a-zA-Z ]{1,30}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    //Validate for name
    if (name === 'name') {
      if (!nameRegex.test(value)) {
        updateErrorState('Please enter a valid name. (20 characters max)', name);
      } else {
        updateErrorState('verified', name);
        setCurrentlyVerifiedFileds((prev) => prev + 1);
      }
    }
    //Validate for email
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        updateErrorState('Please enter a valid email.', name);
      } else {
        updateErrorState('verified', name);
        setCurrentlyVerifiedFileds((prev) => prev + 1);
      }
    }
    //Validate for phone
    if (name === 'phone') {
      if (!phoneRegex.test(value)) {
        updateErrorState('Please enter a valid phone number.', name);
      } else {
        updateErrorState('verified', name);
        setCurrentlyVerifiedFileds((prev) => prev + 1);
      }
    }
  };

  //Validation on Blur of fields
  const handleBlur = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validateInput(name, value);
  };

  //Render
  return (
    <>
      <div className='form_section-heading-group'>
        <h1 className='form_section-heading'>Personal Info</h1>
        <h3 className='form_section-subheading'>Please provide your name, email address, and phone number.</h3>
      </div>

      <div className='form_section-form'>
        <InfoInput
          handleInput={handleInput}
          handleBlur={handleBlur}
          name='name'
          value={info.name}
          type='text'
          error={errorState.name}
          setNavigationEnabled={setNavigationEnabled}
        />
        <InfoInput
          handleInput={handleInput}
          handleBlur={handleBlur}
          name='email'
          value={info.email}
          type='text'
          error={errorState.email}
          setNavigationEnabled={setNavigationEnabled}
        />
        <InfoInput
          handleInput={handleInput}
          handleBlur={handleBlur}
          name='phone'
          value={info.phone}
          type='text'
          error={errorState.phone}
          setNavigationEnabled={setNavigationEnabled}
        />
      </div>
    </>
  );
}

export default Info;
