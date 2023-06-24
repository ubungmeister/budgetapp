import React from 'react'
import { PmTableType } from './types'

const PMTable = ({ pocketMoney }: PmTableType) => {
  console.log(pocketMoney)
  return (
    <div>
      <div>
        {Object.keys(pocketMoney).map((item, index) => {
          return (
            <div key={index}>
              <div>{item}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PMTable
