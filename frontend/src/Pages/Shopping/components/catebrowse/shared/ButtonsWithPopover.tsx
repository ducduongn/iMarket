import { Button, List, Popover } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import React, { Fragment } from 'react';
type ButtonsWithPopoverProps = {
    options: Record<
        string,
        {
            buttonText: string;
        } & Record<string, unknown>
    >;
    element: React.ComponentType<Record<string, unknown>>;
};
function ButtonsWithPopover(props: ButtonsWithPopoverProps): JSX.Element {
    const { options, element: Element } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Fragment>
            {Object.keys(options).map((v) => (
                <Button key={v} onClick={handleClick} value={v}>
                    {options[v].buttonText} <ArrowDropDown fontSize="small" />
                </Button>
            ))}

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>{anchorEl && <Element {...options[anchorEl.value as string]} />}</List>
            </Popover>
        </Fragment>
    );
}

export default ButtonsWithPopover;
