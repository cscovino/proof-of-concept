import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './index.css';

const useStyles = makeStyles({
    select: {
        color: "#fff",
        "&:focus": {
            color: "#fff"
        },
    },
    label: {
        color: "#ffc901",
        "&.Mui-focused": {
            color: "#ffc901"
        },
    },
    icon: {
        color: "#fff"
    }
});

function InterpolationSelect(props) {
    const classes = useStyles();
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setData({...data, interpolation: event.target.value})
    };
    return (
        <div>
            <FormControl
                classes={{root: classes.select}}
                variant="outlined"
                style={{marginTop: "2vh"}}>
                <InputLabel 
                    classes={{root: classes.label}}
                    ref={inputLabel} 
                    id="select-outline-label">
                    Interpolation Function
                </InputLabel>
                <Select
                    labelId="select-outline-label"
                    id="select-outline"
                    value={data.interpolation}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                    classes={{
                        root: classes.select,
                        icon: classes.select
                    }}
                >
                    <MenuItem value="Bicubic">Bicubic</MenuItem>
                    <MenuItem value="Bilinear">Bilinear</MenuItem>
                    <MenuItem value="MitchellNetravali">MitchellNetravali</MenuItem>
                    <MenuItem value="NearestNeighbor">NearestNeighbor</MenuItem>
                    <MenuItem value="Lanczos2">Lanczos2</MenuItem>
                    <MenuItem value="Lanczos3">Lanczos3</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default InterpolationSelect