
const ErrorMessageParser = (message, culture) => {

    var retMessage = "";
    switch (message) {
        case "auth/email-already-exists":
            retMessage = "Sağlanan e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor. Her kullanıcının benzersiz bir e-posta adresi olmalıdır.";   
            break;
        case "auth/email-already-in-use":
            retMessage ="Girilen e-posta zaten mevcut bir kullanıcı tarafından kullanılıyor";
            break;
        case "auth/invalid-email":
            retMessage="Geçersiz bir e-posta girdiniz";
            break;
        case "auth/weak-password":
            retMessage="Girilen şifre zayıf bir şifredir";
            break;
        case "auth/wrong-password":
            retMessage="Yanlış şifre girdiniz";
            break;
        default:
            break;
    }

    return {retMessage};
};

export default ErrorMessageParser;