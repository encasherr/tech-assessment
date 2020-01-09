import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../components/lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RmaCustomerDetails from './RmaCustomerDetails';
import RmaProductList from './RmaProductList';
import RmaVendorDetails from './RmaVendorDetails';
import RmaTermsAndConditions from './RmaTermsAndConditions';
import HiTechAddress from './HiTechAddress';
import Book from '@material-ui/icons/Book';

const AddRmaRequestComponent = (props) => {
    let { model } = props;
    model.customerDetails = !model.customerDetails ? {} : model.customerDetails;
    model.productList = !model.productList ? [] : model.productList;
    model.current_product = !model.current_product ? {} : model.current_product;
    model.vendorDetails = !model.vendorDetails ? {} : model.vendorDetails;
    
    let display = (props) ? 'block' : 'none';
    return (
        <Card style={{padding: "1%"}}>
                    <CardHeader 
                        avatar={
                            <Avatar aria-label="Recipe" style={styles.avatar}>
                                <Book />
                            </Avatar>
                            }
                            title="Create RMA Request">
                    </CardHeader>
                <CardContent>
                    <RmaCustomerDetails
                        model={model.customerDetails}
                        onFieldChange={(val, field, model) => props.onFieldChange(val, field, model)}
                    />
                    <br></br>
                    <RmaProductList
                        current_product={model.current_product}
                        productList={model.productList}
                        onProductFieldChange={(val, field) => props.onProductFieldChange(val, field, model)}
                        onAddRmaProduct={(productItem) => props.onAddRmaProduct(productItem, model)}
                        />
                    <br></br>
                    <RmaVendorDetails
                        model={model.vendorDetails}
                        onFieldChange={(e, field) => props.onVendorDetailsFieldChange(e.target.value, field, model)}
                        />
                    <RmaTermsAndConditions />
                    <HiTechAddress />
                </CardContent>
                <CardActions style={styles.actionButton}>
                    <Button variant="contained" size="large" color="primary" 
                                onClick={ () => props.onSubmit(model) }>
                                Submit
                    </Button>
                </CardActions>
        </Card>
    );
}
export default AddRmaRequestComponent;
const styles={
    fullWidth: {
        width: '100%',
        paddingLeft: '2%',
        // paddingRight: '2%'
    },
    width50: {
        width: '40%',
        paddingLeft: '2%',
        paddingRight: '2%'
    },
    actionButton: {
        // marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}