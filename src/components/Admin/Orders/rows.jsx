
import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { api } from "../../../services/api.js";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { status } from "./order-status";
import {ProductImg,ReactSelectStyle} from './styles'

export function Row({row, setOrders, orders}) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    


  async function setNewStatus(id,status){
    setIsLoading(true)
    try{
      await api.put(`orders/${id}`,{status})

      const  newOrders = orders.map(order =>{
        return order._id === id ? {... order, status} : order
      })

      setOrders(newOrders)

    }catch(err){
        console.error(err)
    }finally{
        setIsLoading(false)
    }
    
  }
    return <>
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.orderId}
          </TableCell>
          <TableCell >{row.name}</TableCell>
          <TableCell >{row.date}</TableCell>
          <TableCell >
            <ReactSelectStyle 
            options={status.filter(sts => sts.value !== 'Todos')} 
            menuPortalTarget={document.body}
             placeholder='Status'
             defaultValue={status.find(option => option.value === row.status) || null}
             onChange={newStatus =>{
                setNewStatus(row.orderId, newStatus.value)
             }}
             isLoading={isLoading}
            
            
            />
            </TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Pedido
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Produtos</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Imagen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map((productRow) => (
                      <TableRow key={productRow.id}>
                        <TableCell component="th" scope="row">
                          {productRow.quantity}
                        </TableCell>
                        <TableCell>{productRow.name}</TableCell>
                        <TableCell >{productRow.category}</TableCell>
                        <TableCell>
                            <ProductImg src={productRow.url} alt="Imagen-do-produto" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      </>
}

Row.propTypes = {
    orders: PropTypes.array,
    setOrders: PropTypes.func,
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      orderId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          quantity: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  };
  