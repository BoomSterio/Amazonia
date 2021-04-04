import React, { useState } from 'react'
import styles from './OrdersMonitor.module.css'
import { db } from '../../../api/firebase'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import Button from '../../common/Button/Button'
import { ExpandMore } from '@material-ui/icons'
import OrderItem from '../../OrdersPage/OrderItem/OrderItem'

const OrdersMonitor: React.FC = () => {
  const [orders, setOrders] = useState({ data: [] })
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const handleStatusChange = (created: number) => (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    setOrders({
      ...orders,
      // @ts-ignore
      data: orders?.data.map(o => (created === o.created ? { ...o, status: e.target.value as string } : o)),
    })
    db.collection('users').doc(query).set({
      // @ts-ignore
      orders: orders.data,
    })
  }

  const searchOrders = () => {
    if (query)
      db.collection('users')
        .doc(query)
        .get()
        .then(snapshot => {
          // @ts-ignore
          if (snapshot.exists && snapshot.data().orders) {
            setOrders({
              // @ts-ignore
              id: snapshot.id,
              // @ts-ignore
              data: snapshot.data().orders.map((order: any) => order),
            })
            handleClose()
          } else {
            setOrders({ data: [] })
            alert('No user with id ' + query)
          }
        })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Accordion className={styles.orders}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
        <h3>Orders</h3>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Search orders by user id</DialogTitle>
          <DialogContent>
            <TextField label={'Search'} value={query} onChange={e => setQuery(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={searchOrders}>Confirm</Button>
          </DialogActions>
        </Dialog>
        <Button onClick={handleOpen}>Search</Button>
        {orders.data.reverse().map((o, i) => (
          <OrderItem key={i} editMode handleStatusChange={handleStatusChange} order={o} />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default OrdersMonitor
