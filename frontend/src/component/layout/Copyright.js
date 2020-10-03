import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '} {new Date().getFullYear()} {' - '}
            <Link color="inherit" href="#">
                IMarket
            </Link>{' '}
            - Bản quyền của Công Ty Cổ Phần ...
        </Typography>
    );
}