import express from 'express'
import morgan from 'morgan';
import {createRoles} from './libs/initialSetup.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express();
createRoles();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json(
        {
            autor: "Gasparini",
            description: "",
            version: "1.0.0"
        }
    )
})

app.use('/api/auth/', authRoutes)
app.use('/api/users/', userRoutes)

export default app;

