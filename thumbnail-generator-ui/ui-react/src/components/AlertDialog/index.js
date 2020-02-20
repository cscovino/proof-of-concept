import React, { useState, useEffect } from 'react';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.css'

function AlertDialog(props) {
    const [data, setData] = useState({
        open: props.open, 
        code: 404,
        message: "Not Found"
    });
  
    const handleClose = () => {
        setData({...data, open: false});
    };

    useEffect(() => {
        setData({
            open: props.open,
            code: props.code,
            message: props.message
        })
    }, [props.open, props.message, props.code]);

    return (
        <div>
            <Dialog
                open={data.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <PhoneInTalkIcon />
                    OOPS! Houston we have a problem.
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {data.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        It's okay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;