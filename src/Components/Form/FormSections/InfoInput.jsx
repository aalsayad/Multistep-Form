import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <AnimatePresence>
          {error.length > 0 && error !== 'verified' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ ease: 'easeIn', duration: 0.2 }}
              className='flex form_input-error-container'
            >
              <i className='fi fi-rs-exclamation'></i>
              <p>{error}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <input onChange={handleInput} name={name} value={value} type={type} onBlur={handleBlur}></input>
      <AnimatePresence>
        {error === 'verified' && (
          <motion.i
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ ease: 'easeIn', duration: 0.2 }}
            id='form_input-check'
            className='fi fi-rs-check-circle'
          ></motion.i>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InfoInputs;
