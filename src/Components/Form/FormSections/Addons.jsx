import React from 'react';
import AddonCard from './AddonCard';
import useFormStore from '../../../Stores/FormStore';

function Addons() {
  //Fetch Addons from Store
  const addons = useFormStore((state) => state.addons);

  return (
    <>
      <div className='form_section-heading-group'>
        <h1 className='form_section-heading'>Pick Addons</h1>
        <h3 className='form_section-subheading'>Add-ons help enhance your experience.</h3>
      </div>

      <div className='form_addons-container'>
        {addons.map((addon) => {
          return (
            <AddonCard
              key={addon.id}
              title={addon.title}
              id={addon.id}
              description={addon.description}
              fees={addon.fees}
              selected={addon.selected}
            />
          );
        })}
      </div>
    </>
  );
}

export default Addons;
