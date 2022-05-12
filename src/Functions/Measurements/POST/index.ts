

exports.handler = async (_ : any) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({guillaume : "success"}),
    }
    return Promise.resolve(response);
}
