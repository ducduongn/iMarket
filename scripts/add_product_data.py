from customer.models import Product

products = [
    [
        "Laptop HP ProBook 440 G6 (5YM63PA) (14' HD/i3-8145U/4GB/500GB HDD/UHD 620/Free DOS/1.6 kg)",
        "/api/products/19030313/default_image",
        "10.990.000đ"
    ],
    [
        "Laptop ASUS 14 X409JA-EK012T (14' FHD/i5-1035G1/4GB/1TB HDD/Intel UHD/Win10/1.6kg)",
        "/api/products/200500680/default_image",
        "12.790.000đ"
    ],
]


def run(*arg):
    for p in products:
        price = p[2]
        price = int("".join(price[:-1].split(".")))
        print(price)
        prod = Product(title=p[0], image=p[1], price=price, quantity=10)
        prod.save()
