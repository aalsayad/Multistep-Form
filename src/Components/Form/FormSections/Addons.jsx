import React from 'react';
import AddonCard from './AddonCard';
import useFormStore from '../../../Stores/FormStore';
import { useAnimate, stagger } from 'framer-motion';
import { useEffect } from 'react';

function Addons() {
  //Fetch Addons from Store
  const addons = useFormStore((state) => state.addons);

  //animations
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const startAnimation = () => {
      animate('#animate-addon-card', { y: [20, 0], opacity: [0, 1] }, { duration: 0.45, delay: stagger(0.05) });
    };
    startAnimation();
  }, []);

  return (
    <div ref={scope}>
      <div className='form_section-heading-group'>
        <h1 className='form_section-heading'>Pick Addons</h1>
        <h3 className='form_section-subheading'>Add-ons help enhance your experience.</h3>
      </div>

      <div className='form_addons-container'>
        {addons.map((addon) => {
          return (
            <div key={addon.id} id='animate-addon-card'>
              <AddonCard
                title={addon.title}
                id={addon.id}
                description={addon.description}
                monthlyPrice={addon.monthlyPrice}
                yearlyPrice={addon.yearlyPrice}
                selected={addon.selected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Addons;
