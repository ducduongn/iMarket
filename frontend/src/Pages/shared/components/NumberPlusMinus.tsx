import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup, { ButtonGroupProps } from '@material-ui/core/ButtonGroup';

type GroupedButtonsProps = {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    min: number;
    max: number;
} & ButtonGroupProps;
function GroupedButtons(props: GroupedButtonsProps): JSX.Element {
    const { value, setValue, min, max, ...others } = props;
    const handleChangeValue = (step: number) => () => {
        setValue(value + step);
    };
    return (
        <ButtonGroup {...others} aria-label="small outlined button group">
            <Button onClick={handleChangeValue(-1)} disabled={value <= min}>
                -
            </Button>
            <Button>{value}</Button>
            <Button onClick={handleChangeValue(1)} disabled={value >= max}>
                +
            </Button>
        </ButtonGroup>
    );
}

export default GroupedButtons;
