"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function (date) {
    ApiConnector.login({login:date.login, password:date.password}, servAnswer => {
        if(servAnswer.success === true){
            location.reload();
        }
        else {
            userForm.setLoginErrorMessage(servAnswer.error);
        }
    })
} 



userForm.registerFormCallback = function (date) {
    ApiConnector.register({login:date.login, password:date.password}, servAnswer => {
        if(servAnswer.success === true){
            location.reload();
        }
        else {
            userForm.setRegisterErrorMessage(servAnswer.error);
        }
    })
}



