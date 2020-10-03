# Account APP API

## Login

* **REQUEST** (POST)

    ```json
    {  
        "email": <email đăng nhập>,  
        "password": <mật khẩu>,  
    }
    ```

* **RESPONSE**

  * Thành công: `response_status: 200`  

    ```json
    {  
        "user": <Serialized User>,  
        "token": <Token lưu phiên đăng nhập>
    }
    ```

  * Lỗi 1: `response_status: 400`  

    ```json
    {  
        <field name>: <Noi dung loi>
    }
    ```

## Sign Up

* **REQUEST** (POST)

    ```json

    {  
        "first_name",  
        "last_name",  
        "email",  
        "password",
        "captcha_value"
    }
    ```

* **RESPONSE**

  * Thành công: `response_status: 200`  
  
    ```json
    {
        "user",
        "token",
        "verify_link"
    }
    ```

  * Lỗi 1: `response_status: 400`

    ```json
    {
        <field name>: <Noi dung loi>
    }
    ```

## LOGOUT

* **REQUEST** (POST)
    > Header  
    > Authorication: Token \<token>

    ```json
    {  
    }
    ```

* **RESPONSE**

  * Thành công

  ```json
    {
    }
  ```

  * Lỗi: `status code: 401 (Invalid Token)`

  ```json
    {  
        "detail": <nội dung lỗi>  
    }
    ```
