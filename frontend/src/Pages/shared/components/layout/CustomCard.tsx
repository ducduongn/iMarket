import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';

function CustomCard(props: { children: React.ReactNode }): JSX.Element {
    const { children } = props;
    return (
        <Card>
            <CardHeader
                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
                title="Danh sách sản phẩm"
            />
            <Divider />
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default CustomCard;
