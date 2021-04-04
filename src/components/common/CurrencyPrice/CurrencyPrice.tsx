import React from 'react'
// @ts-ignore
import { default as CurrencyFormat } from 'react-currency-format'

type Props = {
  value: number
  text?: string
  prefix?: string
}

const CurrencyPrice: React.FC<Props> = ({ value, text, prefix = '$' }) => {
  return (
    <CurrencyFormat
      renderText={(value: number) => (
        <>
          <p>
            {text}
            <strong>{value}</strong>
          </p>
        </>
      )}
      decimalScale={2}
      value={value}
      displayType={'text'}
      prefix={'$'}
      thousandSeparator
    />
  )
}

export default CurrencyPrice
