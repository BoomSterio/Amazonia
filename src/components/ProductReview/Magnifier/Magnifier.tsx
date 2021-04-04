import React, { useState } from 'react'
import styles from './Magnifier.module.css'
import { Magnifier as ImageMagnifier, MOUSE_ACTIVATION, SideBySideMagnifier, TOUCH_ACTIVATION } from 'react-image-magnifiers'
import { Backdrop, Fade, IconButton, Modal, useMediaQuery } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Actions from '../Actions/Actions'
import { FullProductType } from '../../../types/types'
import ImageNav from '../ImageNav/ImageNav'

type Props = {
  product: FullProductType
  image: string
}

const Magnifier: React.FC<Props> = ({ product, image }) => {
  const [showModal, setShowModal] = useState(false)

  const mediaLg = useMediaQuery('(max-width:1300px)')
  const mediaMd = useMediaQuery('(max-width:767px)')

  const toggleShowModal = () => {
    setShowModal(!showModal)
  }

  const [previewIndex, setPreviewIndex] = useState(0)

  const handleImgItemHover = (i: number) => () => {
    setPreviewIndex(i)
  }

  return (
    <div className={styles.preview}>
      {mediaLg ? (
        <div onClick={toggleShowModal}>
          <ImageMagnifier imageSrc={image} imageAlt={image} mouseActivation={MOUSE_ACTIVATION.DOUBLE_CLICK} touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} />
        </div>
      ) : (
        <div onClick={toggleShowModal}>
          <SideBySideMagnifier className={styles.previewImg} fillGapTop={59} cursorStyle={'none'} imageSrc={image} imageAlt={image} />
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={showModal}
        onClose={toggleShowModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={styles.paper}>
            <div className={styles.container}>
              <div className={styles.images}>
                {!mediaMd && <ImageNav images={product.images} activeIndex={previewIndex} handleImgItemHover={handleImgItemHover} />}
                <ImageMagnifier
                  className={styles.modalImg}
                  dragToMove={false}
                  imageSrc={product.images[previewIndex]}
                  imageAlt={product.images[previewIndex]}
                  mouseActivation={MOUSE_ACTIVATION.CLICK}
                  touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP}
                />
              </div>
              <div className={styles.info}>
                <h2>{product.title}</h2>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.actions}>
                  <Actions product={product} />
                </div>
              </div>
            </div>
            <IconButton onClick={toggleShowModal}>
              <Close style={{ marginLeft: 'auto' }} />
            </IconButton>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Magnifier
