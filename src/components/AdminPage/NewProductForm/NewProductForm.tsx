import React, {useState} from 'react'
import styles from './NewProductForm.module.css'
import {Accordion, AccordionDetails, AccordionSummary, IconButton, TextField} from '@material-ui/core'
import {AddRounded, ExpandMore, RemoveRounded} from '@material-ui/icons'

const NewProductForm = () => {
    const [product, setProduct] = useState({
        title: '' as string,
        description: '' as string,
        images: [''],
        specification: [] as {name: string, info: string}[],
        price: null as number | null,
        rating: null as number | null
    })

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
        if(product.images.length <= 10) {
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
                    <TextField
                        className={styles.input}
                        required
                        value={product.title}
                        onChange={handleChange('title')}
                        label="Title"/>
                    <div className={styles.imageForms}>
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
                            <div onClick={removeImageInput(index)}><IconButton size={'small'}><RemoveRounded/></IconButton></div>}
                        </div>)}
                    </div>
                    <TextField
                        className={styles.description}
                        value={product.description}
                        onChange={handleChange('description')}
                        label="Description"
                        multiline
                        rows={3}
                        variant="outlined"/>
                    <TextField
                        className={styles.input}
                        value={product.price}
                        onChange={handleChange('price')}
                        required
                        label="Price"/>
                    <TextField
                        className={styles.input}
                        value={product.rating}
                        onChange={handleChange('rating')}
                        required
                        label="Rating"/>
                    <TextField className={styles.input} type={'number'} inputProps={{min: 0, max: 5000}} required label="In Stock"/>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default NewProductForm
