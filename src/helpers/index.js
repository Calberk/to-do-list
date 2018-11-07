export function randomString(length){

    const values = 'abcdefghijklmnopqrstuvwxzABCDEFGHIJKLMNOPQRSTUVWZY1234567890';
    
    let randomStr = '';

    for(let t = 0; t <length; t++){
        const randIndex = Math.floor(Math.random()*values.length);
        randomStr += values[randIndex]
    }

    return randomStr;
    
}