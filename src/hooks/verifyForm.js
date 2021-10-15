export default function verify(values){
    let verified = true;
    Object.keys(values).forEach(function (key){ 
        if (values[key] === undefined ||values[key] === null || values[key].length === 0 ){
            verified = false
        }
    })
    return verified
}