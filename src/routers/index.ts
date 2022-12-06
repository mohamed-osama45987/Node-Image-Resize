import express from 'express'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    res.send(
        'Hello from the index route of the project Here we will build our front end  landing page Later'
    )
})

export default router
