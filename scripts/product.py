from MartService.models import Category, Product, ProductModel, Rating, TierVariation
from .utils import load_json
import time
import requests
import json
from .utils import DATA_DIR
import os
from scripts.utils import download_image, headers
from django.core import files
from .shop import get_or_add_shop
from datetime import datetime
from PIL import Image
import copy
from django.core.files.base import ContentFile


refs = [r"https://shopee.vn/M%C3%A1y-t%C3%ADnh-Laptop-cat.13030",
        r'https://shopee.vn/Laptop-cat.13030.13065',
        r'https://shopee.vn/M%C3%A1y-T%C3%ADnh-B%C3%A0n-cat.13030.13067',
        r'https://shopee.vn/Linh-Ki%E1%BB%87n-M%C3%A1y-T%C3%ADnh-cat.13030.13069',
        r'https://shopee.vn/Chu%E1%BB%99t-B%C3%A0n-Ph%C3%ADm-cat.13030.13077',
        r'https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-M%E1%BA%A1ng-cat.13030.13079',
        r'https://shopee.vn/USB-%E1%BB%94-C%E1%BB%A9ng-cat.13030.13083',
        r'https://shopee.vn/M%C3%A1y-In-M%C3%A1y-Scan-M%C3%A1y-Chi%E1%BA%BFu-cat.13030.13081',
        r'https://shopee.vn/Ph%E1%BA%A7n-M%E1%BB%81m-cat.13030.13186',
        r'https://shopee.vn/Ph%E1%BB%A5-Ki%E1%BB%87n-M%C3%A1y-T%C3%ADnh-Kh%C3%A1c-cat.13030.14318',
        r'https://shopee.vn/Audio-Video-Accessories-cat.13030.16671',
        ]

def get_json(catid, ref):
    time.sleep(1)
    url = f'https://shopee.vn/api/v2/search_items/?by=relevancy&limit=50&match_id={catid}&newest=0&order=desc&page_type=search&version=2'
    add_headers = {
        "Accept": r"*/*",
        "Referer": ref,
        "X-Shopee-Language": "vi",
        "X-Requested-With": "XMLHttpRequest",
        "X-API-SOURCE": "pc",
        "If-None-Match-": "55b03-08cd7b081e2835f705ffd8223ffd2ff4",
        "If-None-Match": "3a5d154fd6ded088e61e47f63040b759",
    }

    r = requests.get(url, headers=dict(headers, **add_headers))
    return r.json()


def get_detail_json(itemid, shopid):
    ddir = os.path.join(DATA_DIR, 'products/detail')
    cached = os.listdir(ddir)
    fn = f'{itemid}_{shopid}.json'
    if fn not in cached:
        url = f'https://shopee.vn/api/v2/item/get?itemid={itemid}&shopid={shopid}'
        add_headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "If-None-Match": "c7534bed9414400fb22a9b68afe40451",
        }
        r = requests.get(url, headers=dict(headers, **add_headers))
        js = r.json()
        with open(os.path.join(ddir, fn), 'w') as f:
            json.dump(js, f)
    else:
        with open(os.path.join(ddir, fn), 'r') as f:
            js = json.load(f)
    return js


def add_product_by_dict(d):
    # print(d)
    itemid = d['itemid']
    if Product.objects.filter(pk=itemid): return
    product = Product.spcreate(get_or_add_shop(d['shopid']), **d)
    # img = Image.open(img) # Creates an instance of PIL Image class - PIL does the verification of file
    # img_copy = copy.copy(img) # Verify the copied image, not original - verification requires you to open the image again after verification, but since we don't have the file saved yet we won't be able to. This is because once we read() urllib2.urlopen we can't access the response again without remaking the request (i.e. downloading the image again). Rather than do that, we duplicate the PIL Image in memory.
    # img_copy.save('test2.jpeg')
    # name = img.name
    img_name = d['image'] + '.jpeg'
    try:
        img = open('media/images/' + img_name, 'rb')
    except Exception as e:
        print(e)
        print(img_name)
        img = download_image(d['image'])
        img =  files.File(img)
    # img = open(img.name, 'rb')
    product.image.save(img_name, files.File(img), save=False)
    img.close()
    tiers = []
    models = []
    for i, t in enumerate(d['tier_variations']):
        t = TierVariation.spcreate(i, product, **t)
        if t is not None: 
            tiers.append(t)
        else:
            try:
                assert len(d['tier_variations']) == 1
            except AssertionError as e:
                print(d['tier_variations'])
                raise e
    for m in d['models']:
        if len(tiers) == 0:
            m['tier_index'] = -1
        models.append(ProductModel.spcreate(m['modelid'], product, **m))
    rating = Rating.spcreate(product, **d['item_rating'])
    product.save()
    for t in tiers:
        t.save()
    for m in models:
        m.save()
        # stock
    rating.save()
    print('added', product)

def run(*arg):
    '''
    add: Thêm dữ liệu từ file static/testdata/product_list.json vào database\n
    clear: xóa toàn bộ bản ghi trong database
    '''
    if len(arg) > 0:
        if arg[0] == 'json':
            for ref in refs:
                print(ref)
                catid = ref[-5:]
                js = get_json(catid, ref)
                with open(DATA_DIR + f'/products/{catid}.json', 'w') as f:
                    json.dump(js, f)
        elif arg[0] == 'add':
            ddir = os.path.join(DATA_DIR, 'products/cate')
            for fn in os.listdir(ddir):
                with open(os.path.join(ddir, fn), 'r') as f:
                    js = json.load(f)
                    for item in js['items']:
                        add_product_by_dict(get_detail_json(item['itemid'], item['shopid'])['item'])
        elif arg[0] == 'clear':
            Product.objects.all().delete()
            TierVariation.objects.all().delete()
            ProductModel.objects.all().delete()
            Rating.objects.all().delete()
