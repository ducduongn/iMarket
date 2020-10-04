import React, { Fragment } from 'react'
import { connect } from 'react-redux'

// Material UI
import { Breadcrumbs, Button, Card, Divider, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';

// My Components
import { Base } from './Base';

// Others Component
//      
import ReactImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

// Icons

// Router
import { Link } from 'react-router-dom';
import history from '../router/history';

// Backend API
import { api_getProductDetail, api_getProductList } from '../protocol/ProductCall';
import CustomedPaper from '../component/general/CustomedPaper';
import SimpleRating from '../component/general/Rating';
import { Margin } from '../component/general/Margin';
import { withStyles } from '@material-ui/styles';

import clsx from 'clsx';
import FeaturedPost from '../component/ListProduct/HomeList/FeaturePost';

const useStyles = makeStyles(theme => ({
    breadcrumbs: {
        margin: "10px 0",
    }
}))

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = theme => ({
    root: {
        // background: styledBy('color', {
        //     default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //     blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        // }),
        width: "90%",
        borderRadius: 3,
        border: 0,
        color: "black",
        // height: 12,
        padding: theme.spacing(4),
        boxShadow: styledBy('color', {
            default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }),
    },
    margin: {
        margin: "0px 10px"
    },
    selected: {
        background: styledBy('color', {
            default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
        color: "white"
    }
});

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => {
    const { value, option } = other
    const normalClass = classes.root
    const selectedClass = `${classes.root} ${classes.selected}`
    return (
        <Button className={value === option ? selectedClass : normalClass} {...other.buttonProps} children={other.children} />
    )
})

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


export const ProductDetail = () => {
    const classes = useStyles();
    const [detail, setDetail] = React.useState();
    const [productList, setProductList] = React.useState([]);

    React.useEffect(() => {
        api_getProductList(setProductList)
        api_getProductDetail(setDetail)
    }, [])
    console.log(detail)
    if(!detail) return (<div></div>)
    return (
        <Base>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={() => history.push("/")}>
                    Home
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick} >
                    Laptop
                </Link>
                <Typography color="textPrimary">SKU</Typography>
            </Breadcrumbs>
            <CustomedPaper>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <ReactImageGallery showNav={false} items={detail.images} showPlayButton={false}/>
                    </Grid>
                    <Grid item sm={8}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                <Typography variant="h4">
                                    {detail.title}
                                </Typography>
                                <Typography variant="caption" >By {detail.brand}</Typography>
                                <Margin size="10px"/>
                                <SimpleRating value={detail.rating} disabled/>
                                <Margin size="20px"/>

                                <Typography variant="h4">{detail.price}</Typography>
                                <Divider />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledButton color='blue' option={1} value={1} >Thêm vào giỏ hàng</StyledButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledButton color='default' option={1} value={1} >Đặt mua</StyledButton>
                                </Grid>
                            </Grid>
                        
                    </Grid>
                </Grid>
                
            </CustomedPaper>
            <CustomedPaper title="Mô tả chi tiết">
                <Typography>
                    A512FA-EJ1281T (15.6' FHD/i5-10210U/8GB/512GB SSD/Intel UHD/Win10/1.7kg)
                </Typography>
                <Typography>
                {"- CPU: Intel Core i5-10210U\n- Màn hình: 15.6' (1920 x 1080)\n- RAM: 8GB (4GB + 4GB Onboard) DDR4 2666MHz\n\
                - Đồ họa: Intel UHD Graphics\n\
                - Lưu trữ: 512GB SSD M.2 NVMe \n\
                - Hệ điều hành: Windows 10 Home SL 64-bit\n\
                - Pin: 2 cell 37 Wh Pin liền\n\
                - Khối lượng: 1.7 kg"}
                </Typography>
            </CustomedPaper>
            <CustomedPaper title="Đặt câu hỏi">
                    <TextField
                        variant="outlined"
                        name='name'
                        placeholder="Ví dụ: Thời gian bảo hành của sản phẩm là bao lâu?"
                        fullWidth
                        // onChange={e => handleInputChange(e.target.value, "name")}
                        // value={state.name}
                    ></TextField>
                </CustomedPaper>
                <FeaturedPost title={"Các sản phẩm liên quan".toUpperCase()} productList={detail.relatedProducts} icon={'laptop'} />
        </Base>
    )
}

ProductDetail.propTypes = {
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
