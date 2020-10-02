import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import CustomizedSlider from './Slider'

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
})

const PopoverPopupState = ({ classes }) => (
    <PopupState variant="popover" popupId="demoPopover">
        {popupState => (
            <div>
                <Button variant="contained" {...bindTrigger(popupState)}>
                    Open Popover
                </Button>
                <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <CustomizedSlider label="Price" />
                </Popover>
            </div>
        )}
    </PopupState>
)

PopoverPopupState.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PopoverPopupState)