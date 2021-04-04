import React from 'react'
import styles from './Specifications.module.css'
import { createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Theme, withStyles } from '@material-ui/core'

type Props = {
  specs: { name: string; info: string }[]
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow)

const Specifications: React.FC<Props> = ({ specs }) => {
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table className={styles.table} aria-label="customized table">
        <TableBody>
          {specs?.map(spec => (
            <StyledTableRow key={spec.name}>
              <TableCell component="th" scope="row">
                {spec.name}
              </TableCell>
              <TableCell align="right">{spec.info}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Specifications
