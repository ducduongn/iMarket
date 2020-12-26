import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    Section,
    BreackDrirectionGrid,
    SectionHeader,
    SectionImage,
    SectionHeaderCta,
    SectionHeaderNote,
} from '../../../shared/components/Section';
import { SectionHeaderCtaStyle, SectionHeaderNoteStyle, sectionHeaderStyles, SectionStyles } from '../Styles';

const styles = () => ({
    featureImage: {
        maxWidth: '600px',
    },
});

function HeadSection(props: WithStyles<typeof styles>): JSX.Element {
    const { classes } = props;
    return (
        <Section classes={SectionStyles()}>
            <BreackDrirectionGrid>
                <SectionHeader
                    classes={sectionHeaderStyles()}
                    title="GS66 STEAL"
                    note={
                        <SectionHeaderNote classes={SectionHeaderNoteStyle()}>
                            $60 Apple Music gift card with purchase of select Beats products.
                        </SectionHeaderNote>
                    }
                >
                    {/* <SectionHeaderSubtile classes={SectionHeaderSubtileStyle()} text="37.052.000" is_price/> */}
                    <SectionHeaderCta classes={SectionHeaderCtaStyle()}>Buy now</SectionHeaderCta>
                </SectionHeader>
                <SectionImage classes={classes} />
            </BreackDrirectionGrid>
        </Section>
    );
}

export default withStyles(styles)(HeadSection);
