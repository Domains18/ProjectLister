function lostErrorHandler(req, res, next) { //error 404
    res.status(404);
    res.json({
        error: "resource not found"
    });

    //exception handler
    function AppErrorHandler(req, res, next) {
        res.status()
    }
}
