import React from 'react'
import styles from './ImageNav.module.css'

type Props = {
  images: string[]
  activeIndex: number
  handleImgItemHover: (i: number) => () => void
}

const ImageNav: React.FC<Props> = ({ images, activeIndex, handleImgItemHover }) => {
  return (
    <div className={styles.imgNav}>
      {images.map((img: string, i: number) => (
        <img onMouseOver={handleImgItemHover(i)} className={activeIndex === i ? styles.activeImgItem : styles.imgItem} src={img} alt={'item'} />
      ))}
    </div>
  )
}

export default ImageNav
