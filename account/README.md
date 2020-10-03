# Account APP API

## Login

**REQUEST**  
POST method
```json 
{  
    "email": <email đăng nhập>,  
    "password": <mật khẩu>,  
}
```

**RESPONSE**
* Thành công  
RESPONSE STATUS: 200  
```json 
{  
    "user": <Serialized User>,  
    "token": <Token lưu phiên đăng nhập>   
}
```

* Lỗi  
RESPONSE STATUS: 400  
```json 
{  
    <field name>: <Noi dung loi>
}
```

## Sign Up

**REQUEST**  
POST Method 
```json 
{  
    "first_name",  
    "last_name",  
    "email",  
    "password",
    "captcha_value"
}
```

**RESPONSE**
* Thành công  
RESPONSE STATUS: 200  
```json 
{
    "user",
    "token",
    "verify_link"
}
```
* Lỗi  
RESPONSE STATUS: 400  
```json 
{   
    <field name>: <Noi dung loi>
}
```

## LOGOUT

**REQUEST**  
POST Method  
Header
> Authorication: Token \<token>
```json 
{  
}
```

**RESPONSE**
* Thành công  
RESPONSE STATUS: 200  
```json 
{
}
```
* Lỗi  
RESPONSE STATUS: 401 (Invalid Token)  
```json 
{  
    "detail": <nội dung lỗi>  
}
```