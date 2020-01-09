import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, Typography } from '@material-ui/core';


const RmaCustomerDetails = (props) => {
    let { model } = props;
    return (
        <div>
            {model && 
        <Card style={{padding: "1%"}}>
            <CardHeader 
                title={<Typography variant="body2">Customer Details</Typography>}>
            </CardHeader>
            <CardContent>
                    <form  noValidate autoComplete="off">
                
                    <FormControl variant="outlined" style={styles.fullWidth}>
                        <TextField
                            id="outlined-name"
                            label="Customer Name"
                            value={model.customerName}
                            onChange={(e) => props.onFieldChange(e.target.value, 'customerName', model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.fullWidth}>
                        <TextField
                            id="outlined-name"
                            label="Address"
                            value={model.address}
                            onChange={(e) => props.onFieldChange(e.target.value, 'address', model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.width50}>
                        <TextField
                            id="outlined-name"
                            label="Tel"
                            value={model.telephone}
                            onChange={(e) => props.onFieldChange(e.target.value, 'telephone', model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.width50}>
                        <TextField
                            id="outlined-name"
                            label="Fax"
                            value={model.fax}
                            onChange={(e) => props.onFieldChange(e.target.value, 'fax', model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.width50}>
                        <TextField
                            id="outlined-name"
                            label="Email"
                            value={model.email}
                            onChange={(e) => props.onFieldChange(e.target.value, 'email', model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl variant="outlined" style={styles.width50}>
                        <TextField
                            id="outlined-name"
                            label="Contact Person"
                            value={model.contactPerson}
                            onChange={(e) => props.onFieldChange(e.target.value, 'contactPerson', model)}
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
export default RmaCustomerDetails;

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
        marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}