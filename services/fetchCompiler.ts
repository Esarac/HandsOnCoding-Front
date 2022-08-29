export const postOutput = async(language: string, code: string) => {
    let output = '';

    try{
        const response = await fetch('http://localhost:12345/code',
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({language: language, text: code}),
        })
        const { out } = await response.json()
        output = out
    }
    catch(e){
        console.log(e)
    }

    return output;
}