import React from 'react';
import AddonCard from './AddonCard';
import useFormStore from '../../../Stores/FormStore';
import { useAnimate, stagger, cubicBezier } from 'framer-motion';
import { useEffect } from 'react';

function Addons() {
  //Fetch Addons from Store
  const addons = useFormStore((state) => state.addons);

  //animations
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const easing = cubicBezier(0.76, 0, 0.24, 1);
    const startAnimation = () => {
      animate([
        ['#addon_card', { y: 0 }, { ease: easing, duration: 0.3, delay: stagger(0.05) }],
        ['#addon_card', { opacity: 1 }, { ease: easing, duration: 0.75, delay: stagger(0.05), at: 0 }],
      ]);
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
            <AddonCard
              key={addon.id}
              title={addon.title}
              id={addon.id}
              description={addon.description}
              monthlyPrice={addon.monthlyPrice}
              yearlyPrice={addon.yearlyPrice}
              selected={addon.selected}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Addons;
