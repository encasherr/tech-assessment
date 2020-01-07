import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const AddRmaRequestComponent = (props) => {
    let { model } = props;
    let display = (props) ? 'block' : 'none';
    return (
        <Card style={{padding: "4%"}}>
        {!model && <Loading />} 
        {model &&    
            <form  noValidate autoComplete="off">
                <CardHeader 
                avatar={
                    <Avatar aria-label="Recipe" style={styles.avatar}>
                        <AddIcon />
                    </Avatar>
                    }
                    title="Add RMA Request">
                </CardHeader>
                <CardContent>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Customer Name"
                            value={model.customerName}
                            onChange={(e) => props.onFieldChange(e.target.value, 'customerName', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Address"
                            value={model.address}
                            onChange={(e) => props.onFieldChange(e.target.value, 'address', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Tel"
                            value={model.telephone}
                            onChange={(e) => props.onFieldChange(e.target.value, 'telephone', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Fax"
                            value={model.fax}
                            onChange={(e) => props.onFieldChange(e.target.value, 'fax', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Email"
                            value={model.email}
                            onChange={(e) => props.onFieldChange(e.target.value, 'email', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Contact Person"
                            value={model.contactPerson}
                            onChange={(e) => props.onFieldChange(e.target.value, 'contactPerson', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <RmaProductList 
                        productList={model.productList}
                        onAddProduct={(productItem) => props.onAddProduct(productItem)}
                        />
                    <RmaVendorDetails
                        vendorDetails={model.vendorDetails}
                        onFieldChange={(e, field) => props.onVendorDetailsFieldChange(e.target.value, field)}
                        />
                    <RmaTermsAndConditions />
                    <HiTechAddress />
                </CardContent>
                <CardActions style={styles.actionButton}>
                    <Button variant="contained" size="large" color="primary" 
                                onClick={ () => props.onSubmit(props.model) }>
                        {props.editMode ? 'Update' : 'Submit'}
                    </Button>
                </CardActions>
            </form>}
        </Card>
    );
}
export default AddRmaRequestComponent;
const styles={
    formControl: {
        width: '90%'
    },
    actionButton: {
        marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}