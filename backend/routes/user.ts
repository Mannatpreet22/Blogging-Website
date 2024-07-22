import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign } from 'hono/jwt';
import { signInSchema, signUpSchema } from '@mannat/medium-commons';


export const userRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	}
}>


// hashPassword
async function hashPassword(password: string) {
	const encoder = new TextEncoder()
	const data = encoder.encode(password)
	const hash = await crypto.subtle.digest('SHA-256', data)
	return Array.from(new Uint8Array(hash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('')
}

// signup route
userRouter.post('/signup', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	// const userSchema = z.object({
	// 	name : z.string(),
	// 	email : z.string().email(),
	// 	password : z.string()
	// })
	const body = await c.req.json()

	if (!body) {
		c.status(400)
		return c.json({
			msg: 'Unable to signup/Invalid Credentials'
		})
	}
	const { success } = signUpSchema.safeParse(body)

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

		const jwt = 'Bearer ' + await sign({ id: user.id }, c.env.JWT_SECRET)
		c.status(200)
		return c.text(jwt)
	}
	catch {
		c.status(403)
		return c.text('Error signing up!')
	}
})

//signin route
userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	// const userSchema = z.object({
	// 	name : z.string(),
	// 	email : z.string().email(),
	// 	password : z.string()
	// })
	
	const body = await c.req.json()
	console.log(body)
	if (!body) {
		c.status(400)
		return c.json({
			msg: 'Unable to signup/Invalid Credentials'
		})
	}
	
	const { success,error } = signInSchema.safeParse(body)

	if (!success) {
		console.log(error)
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
	const auth = 'Bearer ' + jwt 
	// console.log(auth)
	// c.header('Authentication',auth)
	return c.text( auth )

})

userRouter.get('/profile',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate())

	
})