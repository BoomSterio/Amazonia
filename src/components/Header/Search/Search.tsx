import React, {ChangeEvent, useState} from 'react'
import styles from './Search.module.css'
import {InputBase, NativeSelect, withStyles} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const Search: React.FC = () => {
    const [category, setCategory] = useState('all')

    const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    }

    const BootstrapInput = withStyles((theme) => ({
        input: {
            height: '38px',
            borderRadius: '4px 0 0 4px',
            position: 'relative',
            backgroundColor: '#f3f3f3',
            border: '1px solid #ced4da',
            fontSize: 14,
            padding: '0 26px 0 11px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                backgroundColor: 'white',
                borderRadius: 4,
                borderColor: '#f19102',
            },
        },
    }))(InputBase);

    return (
        <div className={styles.search}>
            <div className={styles.category}>
                <NativeSelect input={<BootstrapInput/>} value={category} onChange={handleSelectCategory}>
                    <option value={'all'}>All</option>
                    <option value={'cars'}>Cars</option>
                    <option value={'kitchen'}>Kitchen</option>
                    <option value={'electronics'}>Electronics</option>
                </NativeSelect>
            </div>
            <div className={styles.input}>
                <input/>
            </div>
            <div className={styles.searchBtn}>
                <SearchIcon />
            </div>
        </div>
    )
}

export default Search