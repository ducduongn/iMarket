# iMarket

## Installation

### Chuẩn bị dev-env backend
**Yêu cầu**  
Có cài đặt pipenv

**Các bước**  
1. Dùng pipenv tạo virtual env và cài các package cần thiết, rồi activate env đó
> <code>~~pipenv install~~</code> **Có lỗi sử dụng sync https://github.com/pypa/pipenv/issues/3772**  
> <code>pipenv sync</code>  
> <code>pipenv shell</code>  
2. Migration và Migrate Database
> <code>python manage.py makemigrations</code>  
> <code>python manage.py migrate</code>  
3. Runserver
> <code>python manage.py runserver</code>  

### Chuẩn bị dev-env frontend
**Yêu cầu**  
Có cài đặt nodejs, npm

**Các bước**  
1. <code>npm i</code>
2. <code>npm run dev</code>
3. Run django server 

# Project log

**10/2**  
* Chỉnh lại setting.py
* Thêm app account 
* setup frontend