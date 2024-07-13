import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { blogRouter } from '../routes/blog';
import { userRouter } from '../routes/user';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables : {
		userId: string
	}
}>;

app.route('api/v1/user',userRouter)
app.route("api/v1/blog",blogRouter)

// middleware
app.use('/api/v1/blog/*', async (c, next) => {
	const authHeader = c.req.header('auth') || ''
	if(!authHeader)
	{
		c.status(401)
		return c.text(' Auth header not found!')
	}
	const auth = authHeader.split(' ')[1]
	try{
		const decode : any = await verify(auth,c.env.JWT_SECRET)
		c.set("userId",decode.id)
	}
	catch{
		c.status(400)
		return c.text('Jwt verification failed!')
	}

	await next()
  })


export default app;