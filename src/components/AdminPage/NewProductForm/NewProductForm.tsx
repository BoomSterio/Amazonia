import React, {useState} from 'react'
import styles from './NewProductForm.module.css'
import {Accordion, AccordionDetails, AccordionSummary, IconButton, TextField} from '@material-ui/core'
import {AddRounded, ExpandMore, RemoveRounded} from '@material-ui/icons'
import Button from '../../common/Button/Button'
import {dbAPI} from '../../../api/db-api'
import {FullProductType} from '../../../types/types'

const NewProductForm = () => {
    const [product, setProduct] = useState({
        id: new Date().getTime(),
        title: '' as string,
        description: '' as string,
        images: ['' as string],
        specs: [{name: '' as string, info: '' as string}],
        price: null as number | null,
        rating: null as number | null,
        inStock: null as number | null
    } as FullProductType)

    const handleChange = (prop: keyof (typeof product)) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e) {
            setProduct({...product, [prop]: e.target.value})
        }
    }

    const handleImageChange = (i: number) => (e: any) => {
        let images = [...product.images]
        images[i] = e.target.value
        setProduct({...product, images: images})
    }

    const addImageInput = () => {
        if (product.images.length <= 10) {
            setProduct({
                ...product,
                images: [
                    ...product.images,
                    ''
                ]
            })
        } else {
            alert('Max images count - 10')
        }
    }

    const removeImageInput = (i: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setProduct({
            ...product,
            images: [
                ...product.images.filter((img, index) => index !== i)
            ]
        })
    }

    const handleSpecChange = (i: number, prop: 'name' | 'info') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e) {
            setProduct({
                ...product, specs: [...product.specs.map((spec, index) =>
                    index === i ? (prop === 'name' ? {...spec, name: e.target.value} : {
                        ...spec,
                        info: e.target.value
                    }) : spec)]
            })
        }
    }

    const addSpecInput = () => {
        if (product.specs.length <= 15) {
            setProduct({
                ...product,
                specs: [
                    ...product.specs,
                    {name: '', info: ''}
                ]
            })
        } else {
            alert('Max images count - 15')
        }
    }

    const removeSpecInput = (i: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (product.specs.length !== 1) {
            setProduct({
                ...product,
                specs: [...product.specs.filter((spec, index) => index !== i)]
            })
        } else {
            setProduct({
                ...product,
                specs: []
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProduct({
            id: new Date().getTime(),
            title: '' as string,
            description: '' as string,
            images: ['' as string],
            specs: [{name: '' as string, info: '' as string}],
            price: null as number | null,
            rating: null as number | null,
            inStock: null as number | null
        } as FullProductType)
        dbAPI.createProduct(product)
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
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={styles.input}
                        required
                        value={product.title}
                        onChange={handleChange('title')}
                        label="Title"/>
                    <div className={styles.multi}>
                        {product.images.map((image, index) => <div key={index} className={styles.formControl}>
                            <TextField
                                className={styles.imageInput}
                                required
                                name={String(index)}
                                label={`Image №${index + 1}`}
                                value={product.images[index]}
                                onChange={handleImageChange(index)}
                            />
                            {product.images[index] &&
                            <img className={styles.imgPreview} src={product.images[index]} alt={'Invalid source'}/>}
                            {index === 0 &&
                            <IconButton onClick={addImageInput} size={'small'}><AddRounded/></IconButton>}
                            {index !== 0 &&
                            <div onClick={removeImageInput(index)}><IconButton
                                size={'small'}><RemoveRounded/></IconButton></div>}
                        </div>)}
                    </div>
                    <div className={styles.multi}>
                        {product.specs.length === 0 &&
                        <Button onClick={addSpecInput} color={'secondary'}>Add Specification</Button>}
                        {product.specs.map((spec, index) => <div key={index} className={styles.formControl}>
                            <div className={styles.specInput}>
                                <TextField
                                    style={{marginRight: '5px'}}
                                    required
                                    name={String(index)}
                                    label={`Spec name`}
                                    value={product.specs[index].name}
                                    onChange={handleSpecChange(index, 'name')}
                                />
                                <TextField
                                    required
                                    name={String(index)}
                                    label={`Spec info`}
                                    value={product.specs[index].info}
                                    onChange={handleSpecChange(index, 'info')}
                                />
                            </div>
                            {index === 0 &&
                            <IconButton onClick={addSpecInput} size={'small'}><AddRounded/></IconButton>}
                            <div onClick={removeSpecInput(index)}><IconButton
                                size={'small'}><RemoveRounded/></IconButton></div>
                        </div>)}
                    </div>
                    <div className={styles.description}>
                        <TextField
                            style={{width: '100%'}}
                            value={product.description}
                            onChange={handleChange('description')}
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"/>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            value={product.price}
                            onChange={handleChange('price')}
                            required
                            label="Price"/>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            value={product.rating}
                            onChange={handleChange('rating')}
                            required
                            label="Rating"/>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            type={'number'}
                            inputProps={{min: 0, max: 5000}}
                            required
                            value={product.inStock}
                            onChange={handleChange('inStock')}
                            label="In Stock"/>
                    </div>
                    <Button>Create</Button>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default NewProductForm
