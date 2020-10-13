from customer.models import Product, Category
from .utils import load_json

products = load_json('product_list.json')


def run(*arg):
    '''
    add: Thêm dữ liệu từ file static/testdata/product_list.json vào database\n
    clear: xóa toàn bộ bản ghi trong database
    '''
    if len(arg) > 0:
        if arg[0] == 'add':
            for ele in products:
                c = Category.objects.get(name=ele['category'].lower()) 
                print(c)
                for p in ele['products']:
                    price = p[2]
                    if price == '':
                        price = -1
                    else:
                        price = int("".join(price[:-1].split(".")))
                    prod = Product(name=p[0], 
                                image=p[1], 
                                price=price, 
                                quantity=10, 
                                category=c)
                    prod.save()
        elif arg[0] == 'clear':
            Product.objects.all().delete()

    
