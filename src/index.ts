import express from 'express'

import indexRoutes from './routers/index'
import apiRoutes from './routers/api/image'

const app = express()
const port = 3000

app.use(express.static('/assets'))

app.use(indexRoutes)
app.use('/api', apiRoutes)

// 404 route
app.use((req: express.Request, res: express.Response): express.Response => {
    return res.status(404).send('<h1>Page not found</h1>')
})

// error handling middleware

class StatsError extends Error {
    statusCode: number | undefined
}
app.use(
    (
        error: StatsError,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: express.NextFunction
    ): express.Response => {
        return res.status(error.statusCode as number).json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
)

app.listen(port, (): void => {
    console.log(`App is started at http://localhost:${port}`)
})

export default app
