import express from 'express';

interface statusProps {
    statusCode: number;
    message: string;
    stack ?: string;
}

export const errorHandler = (err: statusProps, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}
