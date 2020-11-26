function validCityNames(cityDepart, cityArriving) {
    console.log("check names valid ", cityDepart, cityArriving);
    //this regular expression from https://www.regextester.com/94502
    //ther are alot of ------------
    //var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    var regex = /^[a-zA-Z\s]{0,255}$/;
    if (regex.test(cityDepart) && regex.test(cityArriving)) {
        return true;
    }
    return false;
}
export { validCityNames }