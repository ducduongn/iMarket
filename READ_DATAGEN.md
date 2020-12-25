## Steps

1. delete folder migrations, DB  

2. pipenv install

3. makemigrations, migrate

4. `python manage.py runscript category --script-args add`

5. `python manage.py runscript product --script-args add`

Có cài thử  /api/vi/martService/products/

## Others

* Delete all product data (Product, TierVariation Rating, ...) or category data

> `python manage.py runscript product --script-args clear`  
> `python manage.py runscript category --script-args clear`