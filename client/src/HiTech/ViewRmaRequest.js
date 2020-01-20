import React from 'react';
import { Card, CardHeader, CardContent, Grid, Paper, Button, Divider, Chip } from '@material-ui/core';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import RmaProductList from './RmaProductList';
import RmaVendorDetails from './RmaVendorDetails';

class ViewRmaRequest extends React.Component {
    
    renderCustomerDetails = (customerDetails) => {
        return (
            <Grid container spacing={16} style={styles.group}>
                        <Grid item sm={3}>
                            Customer Name
                        </Grid>
                        <Grid item sm={3}>
                            <strong>{customerDetails.customerName}</strong>
                        </Grid>
                        <Grid item sm={3}>
                            Contact Person
                        </Grid>
                        <Grid item sm={3}>
                            <strong>{customerDetails.contactPerson}</strong>
                        </Grid>
                        <Grid item sm={3}>
                            Telephone
                        </Grid>
                        <Grid item sm={3}>
                            <strong>{customerDetails.telephone}</strong>
                        </Grid>
                        <Grid item sm={3}>
                            Email
                        </Grid>
                        <Grid item sm={3}>
                            <strong>{customerDetails.email}</strong>
                        </Grid>

            </Grid>
        );
    }

    renderVendorDetails = (vendorDetails) => {
        return (
            <Grid container spacing={16} style={styles.group}> 
            <Grid item sm={3}>
            Purchase Date
        </Grid>
        <Grid item sm={3}>
            <strong>{vendorDetails.purchaseDate}</strong>
        </Grid>
        <Grid item sm={3}>
            Vendor Name
        </Grid>
        <Grid item sm={3}>
            <strong>{vendorDetails.vendorName}</strong>
        </Grid>
        <Grid item sm={3}>
            Location
        </Grid>
        <Grid item sm={3}>
            <strong>{vendorDetails.address}</strong>
        </Grid>
        </Grid>
        );
    }

    render = () => {
        let { model } = this.props;
        console.log('view rma', model);
        return (
            <Card>
                <CardHeader
                    action={
                        // <Link to={ { pathname: "/rmaRequests" }}>
                            <Button color="primary" size="small" 
                                onClick={() => this.props.onBackToAllRequests()}>
                                    Back to all requests
                            </Button>
                        // </Link>
                    }         
                    title={`RMA Request # ${model['$loki']}`}
                />
                <CardContent>
                    <Grid container spacing={16}>
                        {this.renderCustomerDetails(model.customerDetails)}
                        <br></br>
                        {this.renderVendorDetails(model.vendorDetails)}
                        <RmaProductList
                            productList={model.productList}
                        />
                        {model.emailTo && <Grid item sm={3}>
                            <Chip label={`Notified to: ${model.emailTo}`}></Chip>
                        </Grid>}
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}
export default ViewRmaRequest;
const styles = {
    group: {
        padding: '2%'
    }
}