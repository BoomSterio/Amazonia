import React, {useState} from 'react'
import styles from './NewProductForm.module.css'
import {Accordion, AccordionDetails, AccordionSummary, FormControl, Input, InputLabel} from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons'

const NewProductForm = () => {
    const [product, setProduct] = useState({
        title: '',
        images: [
            ''
        ],
        price: null as number | null,
        rating: null as number | null
    })

    const handleChange = (prop: keyof (typeof product)) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e){
            setProduct({...product, [prop]: e.target.value})
        }
    }

    const handleImageChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let images = [...product.images]
        images[i] = e.target.value
        setProduct({...product, images: images})
    }

    const addImageInput = () => {
        setProduct({
            ...product,
            images: [
                ...product.images,
                ''
            ]
        })
    }

    return (
        <Accordion className={styles.form}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <h3>Create new product</h3>
            </AccordionSummary>
            <AccordionDetails className={styles.form}>
                <form>
                    {product.images.map((image, index) => <FormControl key={index} className={styles.formControl}>
                        Image #{index+1}
                        <Input
                            required
                            name={String(index)}
                            type={'text'}
                            value={product.images[index]}
                            onChange={handleImageChange(index)}
                        />
                    </FormControl>)}
                    <button onClick={addImageInput}>Add</button>

                    {/*<FormControl className={styles.formControl}>
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
                    </FormControl>*/}
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default NewProductForm
