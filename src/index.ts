import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt';
import { z } from 'zod'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
}>;

async function hashPassword(password: string) {
	const encoder = new TextEncoder()
	const data = encoder.encode(password)
	const hash = await crypto.subtle.digest('SHA-256', data)
	return Array.from(new Uint8Array(hash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

// signup route
app.post('/api/v1/signup', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const userSchema = z.object({
		name : z.string(),
		email : z.string().email(),
		password : z.string()
	})
	
	const body = await c.req.json()

	if (!body) {
		c.status(400)
		return c.json({
			msg: 'Unable to signup/Invalid Credentials'
		})
	}
	const { success } = userSchema.safeParse(body)

	if (!success) {
		c.status(403)
		return c.text('Error signing up!')
	}

	const hashedPassword = await hashPassword(body.password)

	try {
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: hashedPassword
			}
		})

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
		c.status(200)
		return c.json({ jwt })
	}
	catch {
		c.status(403)
		return c.text('Error signing up!')
	}
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const userSchema = z.object({
		name : z.string(),
		email : z.string().email(),
		password : z.string()
	})
	
	const body = await c.req.json()

	if (!body) {
		c.status(400)
		return c.json({
			msg: 'Unable to signup/Invalid Credentials'
		})
	}

	const { success } = userSchema.safeParse(body)

	if (!success) {
		c.status(403)
		return c.text('Error signing up!')
	}
	
	const response = await prisma.user.findFirst({where : {
		email : body.email
	}})

	if(!response)
		{
			c.status(403)
			return c.text('Invaild Credentials!')
		}
	
		const hashedPassword = await hashPassword(body.password)

		if(hashedPassword != response.password)
			{
				c.status(403)
				return c.text('Invalid Credentials')
			}
		
		
	const jwt = await sign({id : response.id},c.env.JWT_SECRET)
	return c.json({ jwt })
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
