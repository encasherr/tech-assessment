import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddRmaProduct from './AddRmaProduct';

const RmaProductList = (props) => {
    return (
        <Card style={{padding: "1%"}}>
            <CardHeader 
                action={
                    <AddRmaProduct
                        onSubmit={ (product) => props.onAddRmaProduct(product) }
                        model={props.current_product}
                        onFieldChange={ (val, field) => props.onProductFieldChange(val, field) } 
                        />
                }         
            title={<Typography variant="subtitle1">{`Products ${props.productList ? "("+props.productList.length+")" : "" }`}</Typography>}>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Model No.</CustomTableCell>
                        <CustomTableCell>Description</CustomTableCell>
                        <CustomTableCell>Qty</CustomTableCell>
                        <CustomTableCell>Invoice#</CustomTableCell>
                        <CustomTableCell>Delivery Challan#</CustomTableCell>
                        <CustomTableCell>Serial#</CustomTableCell>
                        <CustomTableCell>Location of product use (complete address)</CustomTableCell>
                        <CustomTableCell>Failure Description</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.productList.map((product, index) => (
                        <Fragment key={index}>
                        <TableRow >
                            <CustomTableCell>{product.modelNo}</CustomTableCell>
                            <CustomTableCell>{product.description}</CustomTableCell>
                            <CustomTableCell>{product.quantity}</CustomTableCell>
                            <CustomTableCell>{product.invoiceNo}</CustomTableCell>
                            <CustomTableCell>{product.deliveryChallanNo}</CustomTableCell>
                            <CustomTableCell>{product.serialNo}</CustomTableCell>
                            <CustomTableCell>{product.productUseAddress}</CustomTableCell>
                            <CustomTableCell>{product.failureDescription}</CustomTableCell>
                        </TableRow>
                        </Fragment>
                    ))}
                    </TableBody>
                </Table>
            {(!props.productList || props.productList.length === 0) &&
            <Typography variant="subtitle1" align="center">
                Please add product details
            </Typography>}
            </CardContent>
        </Card>
    );
}
const CustomTableCell = withStyles(theme => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
export default RmaProductList;
