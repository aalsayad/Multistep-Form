import React, { useEffect, useState } from 'react';

function InfoInputs({ handleInput, name, value, type, handleBlur, error, setNavigationEnabled }) {
  const [inputClassname, setInputClassname] = useState('');

  useEffect(() => {
    const outputClassname = () => {
      if (error === '') {
        setInputClassname(null);
        // setNavigationEnabled(false);
      }
      if (error.length > 10) {
        setInputClassname('errored_input');
        // setNavigationEnabled(false);
      } else if (error === 'verified') {
        setInputClassname('verified');
        // setNavigationEnabled(true);
      }
    };
    outputClassname();
  }, [error]);

  return (
    <div className={`form_section-group ${inputClassname}`}>
      <div className='form_label-error-div'>
        <label className='form_label'>{name}</label>
        {error.length > 0 && error !== 'verified' ? (
          <div className='flex form_input-error-container'>
            <i className='fi fi-rs-exclamation'></i>
            <p>{error}</p>
          </div>
        ) : null}
      </div>

      <input onChange={handleInput} name={name} value={value} type={type} onBlur={handleBlur}></input>
      {error === 'verified' && <i id='form_input-check' className='fi fi-rs-check-circle'></i>}
    </div>
  );
}

export default InfoInputs;
