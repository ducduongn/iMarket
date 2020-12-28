from MartService.models import Category
from .utils import load_json
import requests
import time
import os
import json
from .utils import DATA_DIR

header = {
    "Host": r"shopee.vn",
    "User-Agent": r"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
    "Accept": r"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": r"en-US,en;q=0.5",
    "Accept-Encoding": r"gzip, deflate, br",
    "Connection": r"keep-alive",
    "Cookie": r'_gcl_au=1.1.223904526.1608626442; _med=refer; _fbp=fb.1.1608626441999.537134204; SPC_R_T_ID="RSzo10KauXVP+MHA9muEeLy6sZSNQ0yljYmZgs+2Cey74zTHlt060MpsgLH5KneZrn9Fea1Yjnc3TY8SdK+YcefjBqpXvO2JQS2WRZV5AMs="; SPC_IA=-1; SPC_EC=wm0AgV+EiFHk24+OA32Y5FN13xXjSdrF/pHSTeTPUZiKzaqy3HdiMjuDiKo/pphGABceSdvqax1x2p2VQXWpaIhVb8Yzilw3zMJ/r2LVaL6wegF+1GEHuvKLVmvimatEk4FssF4cHF69bJUuw0b0RJki8b+EP117o0jD329C6Z0=; SPC_F=jHPTQSGgSA0m2HgqHrAg84mAhX4gxH4y; REC_T_ID=602ec774-4431-11eb-ace7-1409dcb3ab07; SPC_T_ID="RSzo10KauXVP+MHA9muEeLy6sZSNQ0yljYmZgs+2Cey74zTHlt060MpsgLH5KneZrn9Fea1Yjnc3TY8SdK+YcefjBqpXvO2JQS2WRZV5AMs="; SPC_R_T_IV="x1RX95XyLc7mi5Yqmtjsig=="; SPC_U=152237872; SPC_T_IV="x1RX95XyLc7mi5Yqmtjsig=="; _ga_M32T05RVZT=GS1.1.1608888253.16.1.1608892243.0; _ga=GA1.1.472370920.1608626444; _hjid=42df9960-c4e6-465a-923e-99dc859586c6; cto_bundle=QthxVV9qYkliNiUyRnBSUXZrcG12R1hzb1RzQWZFS0ElMkJFb3lNMGRhclQyT1A3QiUyRlpSNnNBWndKQmxQY1klMkZ4NjNUUCUyQmlGY0M3NUtVNmpEcEdMeG5VcnVUeXh4dnZoaUMyOHhUcllHQURBUFBEaVprZiUyRkplREs5OE5yWTd0WE91ZVUlMkJubnFOTzJwSm5aZG1JTWhyJTJGNnN6UTNadlhBJTNEJTNE; SC_DFP=UWwwVz7FsAcLUWej4NWu8t1YmmA7JyiM; G_ENABLED_IDPS=google; SPC_CLIENTID=akhQVFFTR2dTQTBtrriztrckyclsoevo; SPC_SC_TK=a942830af77c90108679dc769b5a77e8; SPC_STK="Zs5Wc7ZV0A7ni/TP03mtrybEdZgYKuZwSs8SvBAYCLo8btgBNlV+27LC8FpNZgXiNu3unXGNkKwkvEUgXFwKCj5eM6OiIxGsRq9Bl0vE4sQMdrC6B6lnlF7lAQiwGUeL/jWf86mFlO+lJkRCYHy+iyXLPCCpVQnbc9Pb3QMu7p8="; SPC_SC_UD=152237872; SPC_SI=mall.YCvRHx2DizJsNEM5YxYIzenXBU9jIsAH; _gid=GA1.2.2004111472.1608861413; _hjAbsoluteSessionInProgress=0; SPC_CT_8c8455f4="1608892320.jkTN2D92qTP2EtEzhlyn76tpSPNlu1ZHzaa/dsFpeC4="; SPC_CT_ed86f2fc="1608891739.ko9FPNS99g53GE0tTFwLVLVhPD95IDqYpt4fyEfqFSY="; SPC_CT_6cb1647f="1608891846.kuCEB2jXemxSlXNq+5Pj/G1vNHOmJqa8NFDotKHngAc="; SPC_CT_8e11e488="1608892109.H6W0a+YAf7GP1HEvEaKzt29ydcMernhy3YAqSbGPR+0="; AMP_TOKEN=%24NOT_FOUND; SPC_CT_10ebf1c6="1608891966.DWkbId3BQHx46iLKNU7+rSOPapvqHbICElSL2B90dR0="; SPC_CT_c13ffe94="1608891925.h9AxZHtuBxrNmjicLay16vmfYmTX+H7d1FhCSiuopx4="; SPC_CT_bb612976="1608892007.SG68e/20BYsSacf+xXdTviWcqo2NpKDEUOk1AFGlksg="; SPC_CT_2c4e2221="1608892105.LSv/UAIrfUijJ3KBhR24agpeCAJ9t3TAVgxi4BziarA="; SPC_CT_0577eab7="1608892100.Bz+1ROao339ziS6CpFinuoesX0B1f77xIXL9DYou1fM="; csrftoken=3xM6TyyqB4xd7cCBSlkKlNv4nGvLHg8R',
    "Upgrade-Insecure-Requests": r"1",
    "Cache-Control": r"max-age=0",
    "TE": r"Trailers",
}


def recur_buid_cate_tree(o, parents, children):
    # print(o)
    catid = o['catid']
    is_p = False
    add_to = children
    if len(o['category']['parentids']) == 1:
        add_to = parents
        is_p = True
    if catid == 13030:
        return
    if catid in add_to:
        return
    name = o['category']['name'].lower()
    if name == 'others' or name == 'default':
        name = name + f" {o['category']['parent_category_detail']['catid']}"
    add_to[catid] = {
        "name": name,
        "catid_parent": None if is_p else o['category']['parent_category_detail']['catid']
    }
    if not is_p:
        recur_buid_cate_tree(
            o['category']['parent_category_detail'], parents, children)


def buid_cate_tree():
    js = get_json(13030)
    parents = {}
    children = {}
    interest_cat = [o['catid'] for o in js['facets']] + [13065,
                                                         13067, 13069, 13077, 13079, 13083, 13081, 13086, 14318, 16671, 13186]
    # interest_cat = []
    print(interest_cat)
    for cid in interest_cat:
        jf = get_json(cid)
        for o in jf['colorful_block']:
            recur_buid_cate_tree(o, parents, children)
    
    return parents, children


def get_json(catid):
    time.sleep(1)
    ddir = os.path.join(DATA_DIR, 'cate')
    cached = os.listdir(ddir)
    fn = f'{catid}.json'
    if fn not in cached:
        r = requests.get(
            f'https://shopee.vn/api/v4/search/search_facet?match_id={catid}&page_type=search', headers=header)
        js = r.json()
        with open(os.path.join(ddir, fn), 'w') as f:
            json.dump(js, f)
    else:
        with open(os.path.join(ddir, fn), 'r') as f:
            js = json.load(f)
    return js


parents = {13079: {'name': 'network devices', 'catid_parent': None}, 13069: {'name': 'pc components', 'catid_parent': None}, 13081: {'name': 'printer, scanner & projector', 'catid_parent': None}, 13083: {'name': 'usb & portable hard drives', 'catid_parent': None}, 14318: {'name': 'gadgets', 'catid_parent': None}, 13077: {'name': 'mice and keyboards', 'catid_parent': None}, 16671: {'name': 'audio & video accessories', 'catid_parent': None}, 13065: {'name': 'laptop', 'catid_parent': None}, 13067: {'name': 'desktop', 'catid_parent': None}, 13186: {'name': 'software', 'catid_parent': None}}
children = {13116: {'name': 'wifi repeater', 'catid_parent': 13079}, 13121: {'name': 'others 13079', 'catid_parent': 13079}, 13115: {'name': 'wifi routers', 'catid_parent': 13079}, 13119: {'name': '3g/4g routers', 'catid_parent': 13079}, 13120: {'name': 'computer\xa0networking\xa0switches', 'catid_parent': 13079}, 13117: {'name': 'wifi receivers', 'catid_parent': 13079}, 13415: {'name': 'default 13079', 'catid_parent': 13079}, 13118: {'name': 'usb 3g', 'catid_parent': 13079}, 13104: {'name': 'computer cables & interconnects', 'catid_parent': 13069}, 13126: {'name': 'printer, scanner & projector accessories', 'catid_parent': 13081}, 13123: {'name': 'printer', 'catid_parent': 13081}, 13125: {'name': 'printer ink', 'catid_parent': 13081}, 13127: {'name': 'others 13081', 'catid_parent': 13081}, 13124: {'name': 'projector', 'catid_parent': 13081}, 13417: {'name': 'default 13081', 'catid_parent': 13081}, 13122: {'name': 'scanner', 'catid_parent': 13081}, 13135: {'name': 'external hard drives', 'catid_parent': 13083}, 13131: {'name': 'usb hub', 'catid_parent': 13083}, 13133: {'name': 'internal solid state drives', 'catid_parent': 13083}, 13129: {'name': 'usb 2.0', 'catid_parent': 13083}, 13136: {'name': 'others 13083', 'catid_parent': 13083}, 13134: {'name': 'internal hard drives (hdd)', 'catid_parent': 13083}, 13132: {'name': 'usb otg', 'catid_parent': 13083}, 13130: {'name': 'usb 3.0/3.1', 'catid_parent': 13083}, 13103: {'name': 'laptop battery & charges', 'catid_parent': 13069}, 13105: {'name': 'others 13069', 'catid_parent': 13069}, 13100: {'name': 'fan & cooling', 'catid_parent': 13069}, 14319: {'name': 'default 14318', 'catid_parent': 14318}, 13106: {'name': 'wire keyboards', 'catid_parent': 13077}, 13111: {'name': 'wired keyboard & mouse combos', 'catid_parent': 13077}, 16703: {'name': 'computer speakers', 'catid_parent': 16671}, 16687: {'name': 'webcams', 'catid_parent': 16671}, 16707: {'name': 'computer sound accessories', 'catid_parent': 16671}, 16706: {'name': 'computer headsets', 'catid_parent': 16671}, 16672: {'name': 'default 16671', 'catid_parent': 16671}, 16691: {'name': 'video conference', 'catid_parent': 16671}, 18678: {'name': 'gaming audio', 'catid_parent': 16671}, 13110: {'name': 'mousepad', 'catid_parent': 13077}, 13091: {'name': 'used laptop', 'catid_parent': 13065}, 13087: {'name': 'traditional laptop', 'catid_parent': 13065}, 13089: {'name': 'macbook', 'catid_parent': 13065}, 13090: {'name': 'gaming laptop', 'catid_parent': 13065}, 13066: {'name': 'default 13065', 'catid_parent': 13065}, 13088: {'name': '2 in 1 laptop', 'catid_parent': 13065}, 13094: {'name': 'monitors', 'catid_parent': 13067}, 13093: {'name': 'cpu', 'catid_parent': 13067}, 13092: {'name': 'desktop', 'catid_parent': 13067}, 13068: {'name': 'default 13067', 'catid_parent': 13067}, 13095: {'name': 'all-in-one desktop', 'catid_parent': 13067}, 13096: {'name': 'motherboards', 'catid_parent': 13069}, 13098: {'name': 'power supplies', 'catid_parent': 13069}, 13102: {'name': 'case', 'catid_parent': 13069}, 13101: {'name': 'ram', 'catid_parent': 13069}, 13099: {'name': 'cpu processors', 'catid_parent': 13069}, 13097: {'name': 'vga card', 'catid_parent': 13069}, 13109: {'name': 'wireless mice', 'catid_parent': 13077}, 13108: {'name': 'wired mice', 'catid_parent': 13077}, 13107: {'name': 'wireless keyboards', 'catid_parent': 13077}, 13904: {'name': 'gaming mice', 'catid_parent': 13077}, 13416: {'name': 'default 13077', 'catid_parent': 13077}, 13905: {'name': 'gaming keyboard', 'catid_parent': 13077}, 13112: {'name': 'wireless keyboard & mouse combos', 'catid_parent': 13077}, 13187: {'name': 'default 13186', 'catid_parent': 13186}}

def run(*arg):
    if len(arg) > 0:
        if arg[0] == 'json':
            # get_json()
            pass
        elif arg[0] == 'add':
            parents, children = buid_cate_tree()
            print(parents)
            print(children)
            for k, v in parents.items():
                print(k)
                pc = Category.spcreate(pk=k,**v)
                pc.save()
            for k, v in children.items():
                try:
                    c = Category.spcreate(pk=k, **v)
                    c.save()
                except Exception:
                    print(v)
                    raise Exception
        elif arg[0] == 'clear':
            Category.objects.all().delete()
