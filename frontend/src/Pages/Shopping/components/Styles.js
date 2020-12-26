import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    fullwh: {
        width: '100%',
        height: '100%',
    },
    section: {
        // paddingTop: "24px",
    },
}));

export const SectionStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0 auto',
        padding: '48px 16px',
        maxWidth: '1280px',

        [theme.breakpoints.up('sm')]: {
            // padding: "24px 16px 48px",
            padding: '64px 64px',
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: '96px',
        },
    },
}));

export const sectionHeaderStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '16px',
        [theme.breakpoints.up('md')]: {
            marginBottom: '24px',
        },
    },
    titleWraper: {},
    title: {
        fontWeight: '400',
        textTransform: 'uppercase',
    },
}));

export const SectionHeaderNoteStyle = makeStyles(() => ({
    root: {
        display: 'inline-block',
        padding: '4px 8px',
        background: 'rgb(247, 249, 250)',
        borderRadius: '16px',
    },
}));

export const SectionHeaderCtaStyle = makeStyles(() => ({
    wrapper: {
        marginLeft: '8px',
        '&:first-child': {
            marginLeft: 0,
        },
    },
}));

export const SectionHeaderSubtileStyle = makeStyles((theme) => ({
    root: {
        '$ span': {},
    },
    price: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '32px',
        fontWeight: 'normal',
        [theme.breakpoints.up('md')]: {
            fontSize: '48px',
        },
    },
}));
