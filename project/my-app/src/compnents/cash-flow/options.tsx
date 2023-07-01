import ic_icecream from '../../compnents/cash-flow/images/ic_icecream.png'
import ic_computer from '../../compnents/cash-flow/images/ic_computer.png'
import ic_boat from '../../compnents/cash-flow/images/ic_boat.png'
import ic_drink from '../../compnents/cash-flow/images/ic_drink.png'
import ic_gift from '../../compnents/cash-flow/images/ic_gift.png'
import other from '../../compnents/cash-flow/images/other.png'
import deposit from '../../compnents/cash-flow/images/deposit.png'
import ic_Food from '../../compnents/cash-flow/images/ic_Food.png'
import ic_working from '../../compnents/cash-flow/images/ic_working.png'
import business from '../../compnents/cash-flow/images/business.png'

export const optionsExpense = [
  {
    value: 'Snacks and Treats',
    label: 'Snacks and treats',
    src: ic_icecream,
  },
  {
    value: 'Lunch',
    label: 'lunch',
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
]
export const optionsIncome = [
  {
    value: 'Gifts',
    label: 'Gifts',
    src: ic_gift,
  },
  {
    value: 'Part-time ',
    label: 'Part-time',
    src: ic_working,
  },
  {
    value: 'business',
    label: 'Business',
    src: business,
  },
  {
    value: 'Other',
    label: 'Other',
    src: other,
  },
]
