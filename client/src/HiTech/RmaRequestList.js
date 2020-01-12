import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, Typography, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const RmaRequestList = (props) => {
    let { rmaRequests } = props;
    let requestList = rmaRequests;
    if(rmaRequests && rmaRequests.length > 0) {
        requestList = rmaRequests.reverse();
    }
    return (
        <Card style={{padding: "1%"}}>
            <CardHeader 
                action={
                    <Link to={ { pathname: "/createRma" }}>
                        <Button variant="contained" size="large" color="primary" >
                                Create RMA Request
                        </Button>
                    </Link>
                }         
            title={<Typography variant="body2">{`RMA Requests ${props.rmaRequests ? "("+props.rmaRequests.length+")" : "" }`}</Typography>}>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Customer Name</CustomTableCell>
                        <CustomTableCell>Email</CustomTableCell>
                        <CustomTableCell>Contact Person</CustomTableCell>
                        <CustomTableCell>Telephone</CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {requestList && requestList.map((rmaRequest, index) => (
                        <Fragment key={index}>
                        <TableRow >
                            <CustomTableCell>{rmaRequest.customerDetails.customerName}</CustomTableCell>
                            <CustomTableCell>{rmaRequest.customerDetails.email}</CustomTableCell>
                            <CustomTableCell>{rmaRequest.customerDetails.contactPerson}</CustomTableCell>
                            <CustomTableCell>{rmaRequest.customerDetails.telephone}</CustomTableCell>
                            <CustomTableCell align="right" scope="row" component="th">
                                <Button color="primary" onClick={() => props.onViewRma(rmaRequest)}>View</Button>
                            </CustomTableCell>
                        </TableRow>
                        </Fragment>
                    ))}
                    </TableBody>
                </Table>
            {(!props.rmaRequests || props.rmaRequests.length === 0) &&
            <Typography variant="subtitle1" align="center">
                No RMA requests found
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
export default RmaRequestList;
