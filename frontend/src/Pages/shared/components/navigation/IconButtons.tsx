import {
    Avatar,
    Badge,
    IconButton,
    Tooltip,
    useTheme,
    withStyles,
    makeStyles,
    IconButtonProps,
} from '@material-ui/core';
import { MoreVert, Menu, ShoppingCartOutlined } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { CustomNotificationIcon, CustomSearchIcon } from '../CustomIcons';
import CartDropDown from './CartDropDown';

const StyledBadge = withStyles(() => ({
    badge: {
        right: -3,
        top: 0,
        //   letterSpacing: "0.039rem",
        fontSize: '0.75rem',
        //   border: `1px solid ${theme.palette.background.appbar}`,
        padding: '0 0px',
    },
}))(Badge);

const iconStyles = makeStyles(() => ({
    navbarIcon: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

type IconProps = {
    tooltip: string;
} & IconButtonProps;

function PrimaryHeadBarIcon({ tooltip, children, onClick, ...others }: IconProps): JSX.Element {
    const classes = iconStyles();
    return (
        <Tooltip title={tooltip}>
            <IconButton className={classes.navbarIcon} color="inherit" onClick={onClick} {...others}>
                {children}
            </IconButton>
        </Tooltip>
    );
}

const CartIcon = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element | ((element: Element) => Element)>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <Fragment>
            <PrimaryHeadBarIcon tooltip="Cart" onClick={handleClick}>
                <StyledBadge badgeContent="2" overlap="circle" color="secondary" invisible={false}>
                    <ShoppingCartOutlined />
                </StyledBadge>
            </PrimaryHeadBarIcon>
            <CartDropDown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Fragment>
    );
};

const mapDispatchToProps = () => ({
    // toggleCartHidden: () => dispatch(toggleCartHidden())
});

export const CartIconButton = connect(null, mapDispatchToProps)(CartIcon);
type AccountIconType = {
    menuId: string;
    handleProfileMenuOpen?: (event: React.MouseEvent<HTMLElement>) => void;
} & IconProps;
const AccountIcon = ({ menuId, ...others }: AccountIconType): JSX.Element => {
    const theme = useTheme();
    // const theme = useTheme();
    return (
        <PrimaryHeadBarIcon
            tooltip="Account"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            {...others}
            // containerElement={<Link to="/listings" />}
        >
            <Avatar src="/static/images/avatar/1.jpg" style={{ width: theme.spacing(4), height: theme.spacing(4) }} />
        </PrimaryHeadBarIcon>
    );
};
export const AccountIconButton = AccountIcon;

export const NotiIconButton = (): JSX.Element => (
    <PrimaryHeadBarIcon tooltip="Notification">
        <Badge badgeContent={0} color="secondary">
            {/* <NotificationsOutlined className={className}/> */}
            {CustomNotificationIcon}
        </Badge>
    </PrimaryHeadBarIcon>
);

export const SearchIconButton = () => {
    return (
        <PrimaryHeadBarIcon tooltip="Search">
            <CustomSearchIcon style={{ fontSize: 22 }} />
        </PrimaryHeadBarIcon>
    );
};

// export const MobileMoreIconButton = ({ mobileMenuId, handleMobileMenuOpen }) => (
//     <PrimaryHeadBarIcon
//         aria-label="show more"
//         aria-controls={mobileMenuId}
//         aria-haspopup="true"
//         onClick={handleMobileMenuOpen}
//         color="inherit"
//     >
//         <Badge badgeContent={17} color="primary">
//             <MoreVert />
//         </Badge>
//     </PrimaryHeadBarIcon>
// );

type MenuIconButtonProps = { className: string };
export const MenuIconButton = ({ className }: MenuIconButtonProps): JSX.Element => {
    return (
        <IconButton edge="start" className={className} aria-label="open drawer">
            <Menu />
        </IconButton>
    );
};
