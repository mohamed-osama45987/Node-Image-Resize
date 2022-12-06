import express from 'express'

import indexRoutes from './routers/index'
import apiRoutes from './routers/api/image'

const app = express()
const port = 3000

app.use(express.static('/assets'))

app.use(indexRoutes)
app.use('/api', apiRoutes)

app.use((req: express.Request, res: express.Response) => {
    return res.status(404).send('Page not found ')
})

app.use(
    (
        error: express.ErrorRequestHandler,
        req: express.Request,
        res: express.Response
    ) => {
        return res.status(500).send('Somthing went wrong')
    }
)

app.listen(port, () => {
    console.log(`App is started at http://localhost:${port}`)
})
