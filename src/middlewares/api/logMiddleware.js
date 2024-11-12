export function logMiddleware(req) {
    return { response: req.method + " " + req.url + "YES" }

}