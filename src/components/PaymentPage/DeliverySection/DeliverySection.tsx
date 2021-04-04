import React, { useState } from 'react'
import styles from './DeliverySection.module.css'
import { DeliveryMethodType, DeliveryType } from '../../../types/types'
import Button from '../../common/Button/Button'
import { FormControl, Input, InputLabel, NativeSelect } from '@material-ui/core'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type Props = {
  delivery: DeliveryType
  handleChange: (
    prop: keyof DeliveryType
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | DeliveryMethodType | string | boolean) => void
}

const DeliverySection: React.FC<Props> = ({ delivery, handleChange }) => {
  const [editMode, setEditMode] = useState(true)

  const changeMode = () => {
    setEditMode(!editMode)
    if (editMode) handleChange('isValid')(false)
    handleChange('isValid')(true)
  }

  return (
    <>
      <div className={styles.title}>
        <h4>Delivery Address</h4>
      </div>
      {editMode ? (
        <form onSubmit={changeMode} className={styles.address}>
          <div className={styles.formRow}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="outlined-adornment-fullName">Full name</InputLabel>
              <Input
                required
                id={'outlined-adornment-fullName'}
                autoComplete={'name'}
                type={'text'}
                value={delivery.fullName}
                onChange={handleChange('fullName')}
              />
            </FormControl>
            <div className={styles.phoneInput}>
              <PhoneInput value={delivery.phone} onChange={handleChange('phone')} />
            </div>
          </div>
          <div className={styles.formRow}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="outlined-adornment-country">Country</InputLabel>
              <Input
                required
                id={'outlined-adornment-country'}
                autoComplete={'country-name'}
                type={'text'}
                value={delivery.country}
                onChange={handleChange('country')}
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
              <Input
                required
                id={'outlined-adornment-city'}
                autoComplete={'address-level2'}
                type={'text'}
                value={delivery.city}
                onChange={handleChange('city')}
              />
            </FormControl>
          </div>
          <div className={styles.formRow}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="outlined-adornment-address">Address Line</InputLabel>
              <Input
                required
                id={'outlined-adornment-address'}
                autoComplete={'address'}
                type={'text'}
                value={delivery.addressLine}
                onChange={handleChange('addressLine')}
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="outlined-adornment-index">Index</InputLabel>
              <Input
                required
                id={'outlined-adornment-index'}
                autoComplete={'postal-code'}
                type={'text'}
                value={delivery.index}
                onChange={handleChange('index')}
              />
            </FormControl>
          </div>
          <FormControl className={styles.formControl}>
            <InputLabel shrink htmlFor="method-native-label-placeholder">
              Method
            </InputLabel>
            <NativeSelect
              value={delivery.method}
              onChange={handleChange('method')}
              inputProps={{
                name: 'method',
                id: 'method-native-label-placeholder',
              }}
            >
              <option value={'EMS Economy'}>EMS Economy</option>
              <option value={'UPS Express'}>UPS Express</option>
              <option value={'FedEx'}>FedEx</option>
              <option value={'DHL International'}>DHL International</option>
            </NativeSelect>
          </FormControl>
          <Button color={'primary'} style={{ width: '160px', marginTop: '15px' }}>
            Save
          </Button>
        </form>
      ) : (
        <div className={styles.address}>
          <p>
            {delivery.fullName}, {delivery.phone}
          </p>
          <p>{delivery.email}</p>
          {delivery.country && delivery.city && (
            <p>
              {delivery.country}, {delivery.city} {delivery.index}
            </p>
          )}
          <p>{delivery.addressLine}</p>
          <p>{delivery.method}</p>
          <span onClick={changeMode} className={styles.changeBtn}>
            Change...
          </span>
        </div>
      )}
    </>
  )
}

export default DeliverySection
