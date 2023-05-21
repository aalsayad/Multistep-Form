import { create } from 'zustand';

const useFormStore = create((set, get) => ({
  info: {
    name: '',
    email: '',
    phone: '',
  },

  infoErrors: {
    name: '',
    email: '',
    phone: '',
  },

  yearlyBilling: true,

  plans: [
    {
      id: 1,
      title: 'Arcade',
      monthlyPrice: '$9/month',
      yearlyPrice: '$90/year',
      icon: 'fi fi-rs-puzzle-piece',
      color: '#ffae7d',
      selected: true,
    },
    {
      id: 2,
      title: 'Advanced',
      monthlyPrice: '$12/month',
      yearlyPrice: '$120/year',
      icon: 'fi fi-rs-mouse',
      color: '#f3808d',
      selected: false,
    },
    {
      id: 3,
      title: 'Pro',
      monthlyPrice: '$15/month',
      yearlyPrice: '$150/year',
      icon: 'fi fi-rs-joystick',
      color: '#463cfa',
      selected: false,
    },
  ],
  addons: [
    {
      id: 1,
      title: 'Online service',
      description: 'Access to multiplayer games',
      fees: '+$1/month',
      selected: true,
    },
    {
      id: 2,
      title: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      fees: '+$2/month',
      selected: false,
    },
    {
      id: 3,
      title: 'Customizable Profile',
      description: 'Access to multiplayer games',
      fees: '+$2/month',
      selected: false,
    },
  ],
  updateInfo: (name, value) => set((state) => ({ info: { ...state.info, [name]: value } })),
  updatePlans: (id) => {
    const plans = get().plans;
    const newPlans = plans.map((plan) => {
      if (id === plan.id) {
        return {
          ...plan,
          selected: true,
        };
      } else {
        return {
          ...plan,
          selected: false,
        };
      }
    });
    set(() => ({
      plans: newPlans,
    }));
  },
  updateAddons: (id) => {
    const addons = get().addons;
    let newAddons = [];
    newAddons = addons.map((addon) => {
      if (id === addon.id && !addon.selected) {
        return {
          ...addon,
          selected: true,
        };
      } else if (id === addon.id && addon.selected) {
        return {
          ...addon,
          selected: false,
        };
      } else {
        return addon;
      }
    });
    set(() => ({
      addons: newAddons,
    }));
  },
  toggleBilling: () => {
    const yearlyBilling = get().yearlyBilling;
    set(() => ({
      yearlyBilling: !yearlyBilling,
    }));
  },

  updateInfoErrors: (errorString, fieldName) => {
    const currentInfoErrors = get().infoErrors;
    set(() => ({
      infoErrors: {
        ...currentInfoErrors,
        [fieldName]: errorString,
      },
    }));
  },
}));
export default useFormStore;
