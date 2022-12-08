import express from 'express'

const router = express.Router()

router.get(
    '/',
    (req: express.Request, res: express.Response): express.Response => {
        return res.status(200).send(
            `<h1>Hello from the index route of the project Here we will build our front end landing page Later </h1>
                
                    <p>Please use the <a href="/api/image?filename=&width=&height=">api</a> end point only  </p>
                
                `
        )
    }
)

export default router
