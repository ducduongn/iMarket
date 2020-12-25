from django.conf import settings
import os

from MartService.models import Category
import json
import requests
import tempfile
from PIL import Image
import copy
import time
from django.core.files.temp import NamedTemporaryFile

DATA_DIR = os.path.join(settings.BASE_DIR, 'static/testdata')
cookie = r'_gcl_au=1.1.223904526.1608626442; _med=refer; _fbp=fb.1.1608626441999.537134204; SPC_R_T_ID="DDo0Ors+xki/e/KI50CkBumOtrbye831JZ9aJbLiiLnNwd2cpmUCtiWAHsEBmIZNKpz8UQBPt002FkTxOsv7PQCy/GX+nIDpGEMthAc9Myw="; SPC_EC=wm0AgV+EiFHk24+OA32Y5FN13xXjSdrF/pHSTeTPUZiKzaqy3HdiMjuDiKo/pphGABceSdvqax1x2p2VQXWpaIhVb8Yzilw3zMJ/r2LVaL6wegF+1GEHuvKLVmvimatEk4FssF4cHF69bJUuw0b0RJki8b+EP117o0jD329C6Z0=; SPC_F=jHPTQSGgSA0m2HgqHrAg84mAhX4gxH4y; SPC_R_T_IV="yX2rilf0YMX4BkGNtvHNiQ=="; SPC_U=152237872; _ga_M32T05RVZT=GS1.1.1608900819.18.1.1608901898.0; _ga=GA1.1.472370920.1608626444; _hjid=42df9960-c4e6-465a-923e-99dc859586c6; cto_bundle=0RwFol9qYkliNiUyRnBSUXZrcG12R1hzb1RzQWFVZTJSUTRKcDBtRTFhZ2hNSHc0YjVEOFoyek5YYWZNWXNsNkVMekM2R1pPQkVvUUZGS2RoUG44dHhPSjF4NEVlcTEwWjdZYWNjRFVkSHJNT01nUkNWeHJQNVZucExoUnZNRWhmWkxyYkpheTVjS0VMdCUyRkViTFBDaGlENThpRUtBJTNEJTNE; SC_DFP=UWwwVz7FsAcLUWej4NWu8t1YmmA7JyiM; G_ENABLED_IDPS=google; SPC_CLIENTID=akhQVFFTR2dTQTBtrriztrckyclsoevo; SPC_SC_TK=a942830af77c90108679dc769b5a77e8; SPC_STK="Zs5Wc7ZV0A7ni/TP03mtrybEdZgYKuZwSs8SvBAYCLo8btgBNlV+27LC8FpNZgXiNu3unXGNkKwkvEUgXFwKCj5eM6OiIxGsRq9Bl0vE4sQMdrC6B6lnlF7lAQiwGUeL/jWf86mFlO+lJkRCYHy+iyXLPCCpVQnbc9Pb3QMu7p8="; SPC_SC_UD=152237872; SPC_SI=mall.YCvRHx2DizJsNEM5YxYIzenXBU9jIsAH; _gid=GA1.2.2004111472.1608861413'
headers = {
    "Host": r"shopee.vn",
    "User-Agent": r"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
    "Accept-Language": r"en-US,en;q=0.5",
    "Accept-Encoding": r"gzip, deflate, br",
    "Connection": r"keep-alive",
    "Cookie": cookie, #r'_gcl_au=1.1.223904526.1608626442; _med=refer; _fbp=fb.1.1608626441999.537134204; SPC_R_T_ID="RSzo10KauXVP+MHA9muEeLy6sZSNQ0yljYmZgs+2Cey74zTHlt060MpsgLH5KneZrn9Fea1Yjnc3TY8SdK+YcefjBqpXvO2JQS2WRZV5AMs="; SPC_IA=-1; SPC_EC=wm0AgV+EiFHk24+OA32Y5FN13xXjSdrF/pHSTeTPUZiKzaqy3HdiMjuDiKo/pphGABceSdvqax1x2p2VQXWpaIhVb8Yzilw3zMJ/r2LVaL6wegF+1GEHuvKLVmvimatEk4FssF4cHF69bJUuw0b0RJki8b+EP117o0jD329C6Z0=; SPC_F=jHPTQSGgSA0m2HgqHrAg84mAhX4gxH4y; REC_T_ID=602ec774-4431-11eb-ace7-1409dcb3ab07; SPC_T_ID="RSzo10KauXVP+MHA9muEeLy6sZSNQ0yljYmZgs+2Cey74zTHlt060MpsgLH5KneZrn9Fea1Yjnc3TY8SdK+YcefjBqpXvO2JQS2WRZV5AMs="; SPC_R_T_IV="x1RX95XyLc7mi5Yqmtjsig=="; SPC_U=152237872; SPC_T_IV="x1RX95XyLc7mi5Yqmtjsig=="; _ga_M32T05RVZT=GS1.1.1608888253.16.1.1608892243.0; _ga=GA1.1.472370920.1608626444; _hjid=42df9960-c4e6-465a-923e-99dc859586c6; cto_bundle=QthxVV9qYkliNiUyRnBSUXZrcG12R1hzb1RzQWZFS0ElMkJFb3lNMGRhclQyT1A3QiUyRlpSNnNBWndKQmxQY1klMkZ4NjNUUCUyQmlGY0M3NUtVNmpEcEdMeG5VcnVUeXh4dnZoaUMyOHhUcllHQURBUFBEaVprZiUyRkplREs5OE5yWTd0WE91ZVUlMkJubnFOTzJwSm5aZG1JTWhyJTJGNnN6UTNadlhBJTNEJTNE; SC_DFP=UWwwVz7FsAcLUWej4NWu8t1YmmA7JyiM; G_ENABLED_IDPS=google; SPC_CLIENTID=akhQVFFTR2dTQTBtrriztrckyclsoevo; SPC_SC_TK=a942830af77c90108679dc769b5a77e8; SPC_STK="Zs5Wc7ZV0A7ni/TP03mtrybEdZgYKuZwSs8SvBAYCLo8btgBNlV+27LC8FpNZgXiNu3unXGNkKwkvEUgXFwKCj5eM6OiIxGsRq9Bl0vE4sQMdrC6B6lnlF7lAQiwGUeL/jWf86mFlO+lJkRCYHy+iyXLPCCpVQnbc9Pb3QMu7p8="; SPC_SC_UD=152237872; SPC_SI=mall.YCvRHx2DizJsNEM5YxYIzenXBU9jIsAH; _gid=GA1.2.2004111472.1608861413; _hjAbsoluteSessionInProgress=0; SPC_CT_8c8455f4="1608892320.jkTN2D92qTP2EtEzhlyn76tpSPNlu1ZHzaa/dsFpeC4="; SPC_CT_ed86f2fc="1608891739.ko9FPNS99g53GE0tTFwLVLVhPD95IDqYpt4fyEfqFSY="; SPC_CT_6cb1647f="1608891846.kuCEB2jXemxSlXNq+5Pj/G1vNHOmJqa8NFDotKHngAc="; SPC_CT_8e11e488="1608892109.H6W0a+YAf7GP1HEvEaKzt29ydcMernhy3YAqSbGPR+0="; AMP_TOKEN=%24NOT_FOUND; SPC_CT_10ebf1c6="1608891966.DWkbId3BQHx46iLKNU7+rSOPapvqHbICElSL2B90dR0="; SPC_CT_c13ffe94="1608891925.h9AxZHtuBxrNmjicLay16vmfYmTX+H7d1FhCSiuopx4="; SPC_CT_bb612976="1608892007.SG68e/20BYsSacf+xXdTviWcqo2NpKDEUOk1AFGlksg="; SPC_CT_2c4e2221="1608892105.LSv/UAIrfUijJ3KBhR24agpeCAJ9t3TAVgxi4BziarA="; SPC_CT_0577eab7="1608892100.Bz+1ROao339ziS6CpFinuoesX0B1f77xIXL9DYou1fM="; csrftoken=3xM6TyyqB4xd7cCBSlkKlNv4nGvLHg8R',
    "Upgrade-Insecure-Requests": r"1",
    "Cache-Control": r"max-age=0",
    "TE": r"Trailers",
}

def load_json(name):
    with open(os.path.join(DATA_DIR, name), 'r') as f:
        return json.load(f)

def download_image(imageid):
    add_headers = {
        "Host": "cf.shopee.vn",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        # "If-Modified-Since": "Mon, 07 Dec 2020 16:20:00 GMT",
        "If-None-Match": f"{imageid}_tn",
    }
    url = f'https://cf.shopee.vn/file/{imageid}_tn'
    print(url)
    response = requests.get(url, stream=True, headers=dict(headers, **add_headers))
    time.sleep(1)
    # Was the request OK?
    if response.status_code != requests.codes.ok:
        # Nope, error handling, skip file etc etc etc
        raise RuntimeError("Response with fail status")

    lf = NamedTemporaryFile(suffix='.jpeg', dir='media/images/tmp')

    # Read the streamed image in sections
    
    for block in response.iter_content(1024 * 8):
        # If no more file then stop
        if not block:
            break
        # Write image block to temporary file
        lf.write(block)
    lf.flush()
    print(lf is None)
    return lf
    img = Image.open(lf) # Creates an instance of PIL Image class - PIL does the verification of file
    img_copy = copy.copy(img) # Verify the copied image, not original - verification requires you to open the image again after verification, but since we don't have the file saved yet we won't be able to. This is because once we read() urllib2.urlopen we can't access the response again without remaking the request (i.e. downloading the image again). Rather than do that, we duplicate the PIL Image in memory.
    img_copy.save('test.jpeg')
    if valid_img(img_copy):
        return lf
    else:
        # Maybe this is not the best error handling...you might want to just provide a path to a generic image instead
        raise Exception('An invalid image was detected when attempting to save a Product!')

def valid_img(img):
    """Verifies that an instance of a PIL Image Class is actually an image and returns either True or False."""
    type = img.format
    print(type)
    if type in ('GIF', 'JPEG', 'JPG', 'PNG'):
        try:
            img.verify()
            return True
        except:
            return False
    else: return False