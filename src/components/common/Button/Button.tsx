import React from 'react'
import styles from './Button.module.css'

type Props = {
  color?: 'primary' | 'secondary'
}

const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ color = 'primary', children, ...props }) => {
  let style
  switch (color) {
    case 'primary':
      style = styles.primary
      break
    case 'secondary':
      style = styles.secondary
      break
    default:
      style = styles.primary
  }

  return (
    <button className={style} {...props}>
      {children}
    </button>
  )
}

export default Button
