import express from 'express'

import indexRoutes from './routers/index'
import apiRoutes from './routers/api/image'

const app = express()
const port = 3000

app.use(express.static('/assets'))

app.use(indexRoutes)
app.use('/api', apiRoutes)

// 404 route
app.use((req: express.Request, res: express.Response) => {
    return res.status(404).send('Page not found ')
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
        next: express.NextFunction
    ) => {
        res.status(error.statusCode as number).json({
            message: error.message,
            statusCode: error.statusCode,
        })
    }
)

app.listen(port, () => {
    console.log(`App is started at http://localhost:${port}`)
})

export default app
