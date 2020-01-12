import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Typography } from '@material-ui/core';


const RmaVendorDetails = (props) => {
    let { model } = props;
    return (
        <div>
            {model && 
        <Card style={{padding: "1%"}}>
            <CardHeader 
                title={<Typography variant="caption">If the product was not bought from us, please mention the details of purchase-</Typography>}>
            </CardHeader>
            <CardContent>
                    <form  noValidate autoComplete="off">
                <FormControl variant="outlined" style={styles.halfWidth}>
                    <TextField
                        id="outlined-purchaseDate"
                        label="Date of Purchase"
                        className={styles.dense}
                        value={model.purchaseDate ? model.purchaseDate : ''}
                        onChange={(e) => props.onFieldChange(e.target.value, 'purchaseDate')}
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl variant="outlined" style={styles.halfWidth}>
                    <TextField
                        id="outlined-vendorName"
                        label="Vendor / Supplier Name"
                        className={styles.dense}
                        value={model.vendorName ? model.vendorName : ''}
                        onChange={(e) => props.onFieldChange(e.target.value, 'vendorName')}
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>
                <FormControl variant="outlined" style={styles.formControl}>
                    <TextField
                        id="outlined-address"
                        label="Location / Address"
                        multiline
                        rows="4"
                        className={styles.dense}
                        value={model.address ? model.address : ''}
                        onChange={(e) => props.onFieldChange(e.target.value, 'address')}
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>
            </form>
            </CardContent>
        </Card>}
        </div>
    );
}
export default RmaVendorDetails;

const styles = {
    formControl: {
        width: '90%',
        marginLeft: '2%'
    },
    halfWidth: {
        width: '40%',
        marginLeft: '2%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};