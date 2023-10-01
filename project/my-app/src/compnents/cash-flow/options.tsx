import business from '../../assets/images/business.png';
import deposit from '../../assets/images/deposit.png';
import ic_Food from '../../assets/images/ic_Food.png';
import ic_boat from '../../assets/images/ic_boat.png';
import ic_computer from '../../assets/images/ic_computer.png';
import ic_drink from '../../assets/images/ic_drink.png';
import ic_gift from '../../assets/images/ic_gift.png';
import ic_icecream from '../../assets/images/ic_icecream.png';
import ic_working from '../../assets/images/ic_working.png';
import other from '../../assets/images/other.png';

export const optionsExpense = [
  {
    value: 'Snacks and Treats',
    label: 'Snacks and treats',
    src: ic_icecream,
  },
  {
    value: 'Lunch',
    label: 'Lunch',
    src: ic_Food,
  },
  {
    value: 'Games and Toys',
    label: 'Games',
    src: ic_computer,
  },
  {
    value: 'Activities',
    label: 'Activities',
    src: ic_boat,
  },
  {
    value: 'Hobbies',
    label: 'Hobbies',
    src: ic_drink,
  },
  {
    value: 'Gifts',
    label: 'Gifts',
    src: ic_gift,
  },
  {
    value: 'Other',
    label: 'Other',
    src: other,
  },
  {
    value: 'Goals savings',
    label: 'Goals savings',
    src: deposit,
  },
];
export const optionsIncome = [
  {
    value: 'Part-time',
    label: 'Part-time',
    src: ic_working,
  },
  {
    value: 'Gifts',
    label: 'Gifts',
    src: ic_gift,
  },
  {
    value: 'Business',
    label: 'Business',
    src: business,
  },
  {
    value: 'Other',
    label: 'Other',
    src: other,
  },
];
