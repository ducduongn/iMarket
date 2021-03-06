import React from 'react'
// Icons 
import LaptopIcon from '@material-ui/icons/Laptop';
import HeadsetIcon from '@material-ui/icons/Headset';

export const productData = [
    ['Laptop HP ProBook 440 G6 (5YM63PA) (14" HD/i3-8145U/4GB/500GB HDD/UHD 620/Free DOS/1.6 kg)', '/api/products/19030313/default_image', '10.990.000đ'],
    ['Laptop ASUS 14 X409JA-EK012T (14" FHD/i5-1035G1/4GB/1TB HDD/Intel UHD/Win10/1.6kg)', '/api/products/200500680/default_image', '12.790.000đ'],
    ['Laptop ASUS VivoBook 14 A412FA-EK155T (14" FHD/i3-8145U/4GB/1TB HDD/UHD 620/Win10/1.5kg)', '/api/products/200500684/default_image', '10.690.000đ'],
    ['Laptop Acer Aspire 5 A514-51-35NN (NX.H6USV.001) (14" HD/i3-8145U/4GB/1TB HDD/Linux/1.9 kg)', '/api/products/19020002/default_image', '10.490.000đ'],
    ['Laptop MSIThin GF65 10SER-622VN622VN(15.6"Full HD/144Hz/Intel Core i7-10750H/8GB/512GBSSD/NVIDIA GeForce RTX 2060/Windows 10 Home SL 64-bit/1.9kg)', '/api/products/200501006/default_image', '31.490.000đ'],
    ['Laptop MSI Thin GF65 10SDR-623VN (15.6" FHD 144Hz/i5-10300H/8GB/512GB SSD/GeForce GTX 1660Ti/Win10/1.9kg)', '/api/products/200500687/default_image', '26.490.000đ'],
    ['Laptop LG Gram 15Z980-G.AH55A5 (15.6" FHD/i5-8250U/8GB/UHD 620/Win10/1 kg)', '/api/products/1808354/default_image', '29.890.000đ'],
    ['Laptop Acer Aspire 5 A515-53-5112 (NX.H6DSV.002) (15.6" FHD/i5-8265U/4GB/16GB Intel Optane/1TB HDD/Win10/2.1 kg)', '/api/products/19040038/default_image', '13.890.000đ'],
    ['Laptop HP ProBook 430 G5 (4SS49PA) (13.3" HD/i3-8130U/4GB/500GB HDD/UHD 620/Free DOS/1.6 kg)', '/api/products/1809232/default_image', '11.590.000đ'],
    ['Laptop Dell Vostro 14 3490-70207360 (14" FHD/i5-10210U/8GB/256GB SSD/Intel UHD/Win10/1.7kg)', '/api/products/200500674/default_image', '14.390.000đ'],
    ['Laptop Dell Inspiron 14 3493-N4I5122WA (14" FHD/i5-1035G1/8GB/256GB SSD/Intel UHD/Win10/1.8kg)', '/api/products/200500668/default_image', '14.490.000đ'],
    ['Chuột máy tính không dây A4Tech FG30S Silent (Xám)', '/api/products/200801175/default_image', '199.000đ'],
    ['Chuột máy tính không dây A4Tech FG30S Silent (Xanh)', '/api/products/200801176/default_image', '199.000đ'],
    ['Chuột máy tính không dây A4Tech FG30S Silent (Cam)', '/api/products/200801177/default_image', '199.000đ'],
    ['Chuột máy tính không dây A4Tech FG30S Silent (Trắng)', '/api/products/200801178/default_image', '199.000đ'],
    ['Bàn phím + Chuột Logitech MK235', '/api/products/1600597/default_image', '429.000đ'],
    ['Bàn phím + Chuột Logitech MK345', '/api/products/1404127/default_image', '569.000đ'],
    ['Màn Hình Dell 18.5" E1916HV (1366x768/TN/60Hz/5ms)', '/api/products/1503218/default_image', '1.750.000đ'],
    ['Màn Hình Dell 18.5" E1916H (1366x768/TN/60Hz/5ms)', '/api/products/1600341/default_image', '1.740.000đ'],
    ['Màn Hình Dell 21.5" E2216H (1920x1080/TN/60Hz/5ms)', '/api/products/1600342/default_image', '2.360.000đ'],
    ['Màn Hình Dell 19.5" E2016H (1600x900/60Hz/5ms)', '/api/products/1502484/default_image', '2.099.000đ'],
    ['Màn hình LCD HP 23.8" P241v (6CQ79AA) (1920 x 1080/IPS/60Hz/5 ms', '/api/products/190904263/default_image', ''],
    ['Màn hình LCD Acer 23.8" R241YB (UM.QR1SS.B01) (1920 x 1080/IPS/75Hz/1 ms/FreeSync)', '/api/products/190904259/default_image', '3.800.000đ'],
    ['Màn hình LCD HP 27 inch V270 - 2KZ35AA (FHD/IPS/60Hz/5ms)', '/api/products/19040938/default_image', ''],
    ['Màn Hình ViewSonic 24 inch VA2410-MH', '/api/products/19040332/default_image', ''],
    ['Máy Hút Bụi XIAOMI MI ROBOT VACUUM-MOP Pro (BLACK) (SKV4109GL)', '/api/products/200400130/default_image', ''],
    ['Máy Hút Bụi XIAOMI MI ROBOT VACUUM-MOP Pro (WHITE) (SKV4110GL)', '/api/products/200400131/default_image', ''],
    ['Máy hút bụi lau nhà Ecovacs Deebot OZMO 950', '/api/products/200302177/default_image', '11.899.000đ'],
    ['Máy hút bụi lau nhà Ecovacs Deebot OZMO T8 AIVI', '/api/products/200400623/default_image', '14.490.000đ'],
    ['Robot lau kính Ecovac Winbot 950', '/api/products/200400624/default_image', ''],
    ['Máy Hút Bụi XIAOMI MI ROBOT VACUUM-MOP (SKV4093GL)', '/api/products/200400129/default_image', '6.349.000đ'],
    ['Máy hút bụi Hitachi CV-SF20V(24CV-BRE)', '/api/products/191006828/default_image', '2.819.000đ'],
    ['Máy hút bụi Hitachi CV-SF18(24CV-BL)', '/api/products/191006829/default_image', '2.390.000đ'],
    ['Tủ lạnh Samsung Inverter 208 lít RT19M300BGS/SV', '/api/products/19070417/default_image', '4.590.000đ'],
    ['Tủ lạnh Toshiba Inverter 180 lít GR-B22VU (UKG)', '/api/products/19070369/default_image', '4.790.000đ'],
    ['Loa bluetooth JBL Go 2 (Đen)', '/api/products/19040334/default_image', ''],
    ['Loa Microlab B51 (Đen)', '/api/products/1301251/default_image', '229.000đ'],
    ['Smart Tivi Samsung 4K 55 inch UA55TU8500KXXV', '/api/products/200301305/default_image', '14.490.000đ'],
    ['Smart Tivi Samsung 4K 50 inch UA50TU7000KXXV', '/api/products/200301299/default_image', ''],
    ['Nồi chiên chân không Philips HD9220/20', '/api/products/200301231/default_image', '2.790.000đ'],
    ['Nồi chiên Philips HD9745', '/api/products/200400915/default_image', '5.190.000đ'],
]

export const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

export const featuredPosts = [
    {
        title: 'LAPTOP - MACBOOK',
        icon: <LaptopIcon />
    },
    {
        title: 'LOA - TAI NGHE - THIẾT BỊ NGOẠI VI',
        icon: <HeadsetIcon />
    },
    // {
    //   title: 'Post title',
    //   date: 'Nov 11',
    //   description:
    //     'This is a wider card with supporting text below as a natural lead-in to additional content.',
    //   image: 'https://source.unsplash.com/random',
    //   imageText: 'Image Text',
    // },
];

export const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    // image: 'https://source.unsplash.com/random',
    image: 'https://storage-asset.msi.com/global/picture/banner/banner_15958410275f1e9a03d0364.jpg',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};