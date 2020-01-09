import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, DialogContent, Dialog, DialogTitle, DialogActions, Divider } from '@material-ui/core';
import { MenuItem, OutlinedInput, Select, InputLabel, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Close, Add } from '@material-ui/icons';

class AddRmaProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
        
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
      this.props.onSubmit(this.props.model);
      this.handleClose();
    }
    
    render = () => {
        let { model } = this.props;
        console.log('current_product', model);
        return (
            <div>
            {model && 
            <Card>   
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}><Add /></Button>
                <Dialog
                fullWidth={true}
                open={this.state.open}
                onClose={this.handleClose}
                >
                <DialogTitle onClose={this.handleClose}>Add product to RMA</DialogTitle>
                <Divider />
                <DialogContent style={{padding: '4%'}}>
                    <form  noValidate autoComplete="off">
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-modelNo"
                                        label="Model No"
                                        className={styles.dense}
                                        value={model.modelNo}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'modelNo')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-desc"
                                        label="Description"
                                        className={styles.dense}
                                        value={model.description}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'description')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-qty"
                                        label="Qty"
                                        className={styles.dense}
                                        value={model.quantity}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'quantity')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-invoice"
                                        label="Invoice#"
                                        className={styles.dense}
                                        value={model.invoiceNo}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'invoiceNo')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-deliveryChallanNo"
                                        label="Delivery Challan#"
                                        className={styles.dense}
                                        value={model.deliveryChallanNo}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'deliveryChallanNo')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-serialNo"
                                        label="Serial#"
                                        className={styles.dense}
                                        value={model.serialNo}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'serialNo')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-productUseAddress"
                                        label="Location of product use"
                                        className={styles.dense}
                                        value={model.productUseAddress}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'productUseAddress')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl variant="outlined" style={styles.formControl}>
                                    <TextField
                                        id="outlined-failureDescription"
                                        label="Failure Description"
                                        multiline
                                        rows="4"
                                        className={styles.dense}
                                        value={model.failureDescription}
                                        onChange={(e) => this.props.onFieldChange(e.target.value, 'failureDescription')}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </FormControl>
                    </form>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" size="small" color="default"
                                        onClick={ () => this.handleSubmit(this.props.model)}>
                            Add Product
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>}
        
            </div>
        );
    }
}
const styles = {
    formControl: {
        width: '80%',
        marginBottom: '4%'
    },
    avatar: {
        backgroundColor: '#555'
    }
};
export default AddRmaProduct;