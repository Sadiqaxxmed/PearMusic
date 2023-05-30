import React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';

const CustomSlider = ({ currentTime, duration, handleProgressChange }) => {
    const position = currentTime;

    const CustomSliderComponent = styled(Slider)({
        color: 'white',
        height: '2px',
        '& .MuiSlider-thumb': {
            display:'none',
            width: 8,
            height: 8,
            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
                boxShadow: '0px 0px 0px 8px rgb(0 0 0 / 16%)',
            },
            '&.Mui-active': {
                width: 20,
                height: 20,
            },
        },
        '& .MuiSlider-rail': {
            opacity: .7,
            width:'87vw',
            height:'2px',
            backgroundColor:'rgb(49,49,49)',
        },
    });

    return (
        <CustomSliderComponent
            className='M-NB-Slider'
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => handleProgressChange(value)}
        />
    );
};

export default CustomSlider;
