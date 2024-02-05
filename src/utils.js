function getScriptSecret(key) {
    let secret = PropertiesService.getScriptProperties().getProperty(key);
    if (!secret)
        throw Error('Secret ' + key + ' is empty');

    return secret;
}

function makeBold(inputString) {
    return '<b>' + inputString + '</b>';
}