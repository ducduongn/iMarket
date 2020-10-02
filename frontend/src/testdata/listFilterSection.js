export default const filterSections = [
    {
        headingName: "PROCESSORS",
        queryName: "cpu",

        icon: < ProcessorIcon />,
        isRange: false,
        options:
            [
                'Intel 10th Gen. (Comet-Lake)',
                'Intel 9th Gen. (Coffe-Lake)',
                'Intel 8th Gen. (Coffe-Lake)',
                'AMD 3rd GEN Ryzen',
            ],
    },
    {
        headingName: "GRAPHICS",
        queryName: "gpu",
        icon: <ProcessorIcon />,
        isRange: false,
        options:
            [
                'GeForce RTX 2080 SUPER',
                'GeForce RTX 2080 Ti',
                'GeForce RTX 2080',
                'GeForce RTX 2070 SUPER',
                'GeForce RTX 2070',
            ],
    },
    {
        headingName: "RAM",
        queryName: "ram",
        icon: <RamIcon />,
        isRange: false,
        options:
            [
                '32 GB',
                '16 GB',
                '8 GB',
                '4 GB',
            ],
    }
]
