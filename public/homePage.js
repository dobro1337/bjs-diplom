let logoutButton = new LogoutButton();
logoutButton.action = function () {
    ApiConnector.logout((servAnswer) => {console.log(servAnswer.success);
        if(servAnswer.success) {
            location.reload();
        }
    });
}

ApiConnector.current((servAnswer) => {
    if(servAnswer.success){
        ProfileWidget.showProfile(servAnswer.data);
    }
})

let ratesBoard = new RatesBoard();

    ratesBoard.getCourse = function () {
        ApiConnector.getStocks(servAnswer => {
            if(servAnswer.success){
                ratesBoard.clearTable();
                ratesBoard.fillTable(servAnswer.data);
            }
        })
}

setInterval(RatesBoard.getCourse,1000);
ratesBoard.getCourse();

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data)  {
    ApiConnector.addMoney(data,(servAnswer) => {
        if(servAnswer.success){
            ProfileWidget.showProfile(servAnswer.data);
            moneyManager.setMessage(servAnswer.success,"Деньги добавлены")
        }
        else {
            moneyManager.setMessage(servAnswer.success,servAnswer.error)
        }
    })
}

moneyManager.conversionMoneyCallback  = function (data) {
    ApiConnector.convertMoney(data,(servAnswer) => {
        if(servAnswer.success){
            ProfileWidget.showProfile(servAnswer.data);
            moneyManager.setMessage(servAnswer.success,"Деньги конвертированы")
        }
        else {
            moneyManager.setMessage(servAnswer.success,servAnswer.error)
        }
    })
}

 moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data,(servAnswer) => {
        if(servAnswer.success){
            ProfileWidget.showProfile(servAnswer.data);
            moneyManager.setMessage(servAnswer.success,"Деньги переведены")
        }
        else{
            moneyManager.setMessage(servAnswer.success,servAnswer.error)
        }
    })
 }

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(servAnswer => {
    if(servAnswer.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(servAnswer.data);
        moneyManager.updateUsersList(servAnswer.data);
    }
})

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data,(servAnswer) => {
        if(servAnswer.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(servAnswer.data);
            moneyManager.updateUsersList(servAnswer.data);
            favoritesWidget.setMessage(servAnswer.success,"Пользователь добавлен")
        }
        else
            favoritesWidget.setMessage(servAnswer.success,servAnswer.error)
    })
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data,servAnswer => {
        if(servAnswer.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(servAnswer.data);
            moneyManager.updateUsersList(servAnswer.data);
            favoritesWidget.setMessage(servAnswer.success,"Пользователь удалён")
        }
        else
            favoritesWidget.setMessage(servAnswer.success,servAnswer.error)
    })
}