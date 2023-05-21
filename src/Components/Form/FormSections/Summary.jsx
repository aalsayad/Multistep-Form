import React, { useEffect, useState } from 'react';
import useFormStore from '../../../Stores/FormStore';
import './Summary.styles.css';

export default function Summary({ setCurrentStep }) {
  //Access Store for Plans
  const [summary, updateSummary] = useFormStore((state) => [state.summary, state.updateSummary]);

  //Use Effect to update Summary
  useEffect(() => {
    updateSummary();
  }, []);

  return (
    <>
      <div className='form_section-heading-group'>
        <h1 className='form_section-heading'>Finishing Up</h1>
        <h3 className='form_section-subheading'>Double check everything looks OK before confirming.</h3>
      </div>

      <div className='summary_container'>
        <div className='summary_plan flex spacebetween'>
          <div className='summary_selectedplan'>
            <h3>
              {summary.plan[0]?.title} ({summary.yearlyBilling ? 'Yearly' : 'Monthly'})
            </h3>

            <a
              onClick={() => {
                setCurrentStep(2);
              }}
            >
              Change
            </a>
          </div>
          <h3>{summary.yearlyBilling ? summary.plan[0]?.yearlyPrice : summary.plan[0]?.monthlyPrice}</h3>
        </div>
        {summary.addons.length !== 0 && <div className='divider'></div>}
        <div className='summary_addons-container'>
          {summary.addons.map((selectedAddon) => {
            return (
              <div key={selectedAddon.id} className='flex spacebetween summary_addon'>
                <p>+ {selectedAddon.title}</p>
                <p>{summary.yearlyBilling ? selectedAddon?.yearlyPrice : selectedAddon?.monthlyPrice}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='summary_total-container flex spacebetween'>
        <h4>{`Total ${summary.yearlyBilling ? '(per year)' : '(per month)'}`}</h4>
        <h3>{`$${summary.totalPrice}/${summary.yearlyBilling ? 'year' : 'month'}`}</h3>
      </div>
    </>
  );
}
