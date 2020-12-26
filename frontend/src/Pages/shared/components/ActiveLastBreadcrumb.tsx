import React from 'react';
import Breadcrumbs, { BreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

type ActiveLastBreadcrumbProps = { path: Array<string>; href: Array<string> };
export default function ActiveLastBreadcrumb(props: ActiveLastBreadcrumbProps & BreadcrumbsProps): JSX.Element {
    const { path, href, ...others } = props;
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} {...others}>
            {path.map((p, i) =>
                i == path.length - 1 ? (
                    <Link color="inherit" href={href[i]}>
                        {p}
                    </Link>
                ) : (
                    <Link color="textPrimary" href={href[i]} aria-current="page">
                        {p}
                    </Link>
                ),
            )}
        </Breadcrumbs>
    );
}
