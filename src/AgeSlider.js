import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './AgeSlider.css'
import Typography from '@mui/material/Typography';

const AgeSlider = ({ setAgeValue }) => {
    const [value, setValue] = useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className='slider-container'>
            <Typography sx={{ width: '40%' }}>
                Filter By Age:
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                onChangeCommitted={() => setAgeValue(value)}
            />
        </Box>
    );
}

export default AgeSlider;