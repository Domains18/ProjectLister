function lostErrorHandler(req, res, next) { //error 404
    res.status(404);
    res.json({
        error: "resource not found"
    });
}
//exception handler
function AppErrorHandler(req, res, next) {
    res.status(err.status || 500);
    if (err.authorizationError == true) {
        //setting available headers
        res.set(err.authHeaders)
    }
    const error = err?.cause || err?.message;
    const provideFeedback = err?.feedback;

    res.json({ error, ...AppErrorHandler(provideFeedback && { feedback: provideFeedback }) });
}

module.exports = { lostErrorHandler, AppErrorHandler }
