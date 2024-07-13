import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign } from 'hono/jwt';
// import { z } from 'zod'
import { createBlogInput, signInSchema, signUpSchema, updateBlogInput } from '@mannat/medium-commons';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables : {
		userId: string
	}
}>;

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
app.post('/api/v1/signup', async (c) => {

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

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
		c.status(200)
		return c.json({ jwt })
	}
	catch {
		c.status(403)
		return c.text('Error signing up!')
	}
})

//signin route
app.post('/api/v1/signin', async (c) => {
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

	const { success } = signInSchema.safeParse(body)

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
	const auth = 'Bearer ' + jwt 
	// console.log(auth)
	// c.header('Authentication',auth)
	return c.json({ auth })

})

// get post with id
app.get('/api/v1/blog/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());
	
	const id = c.req.param('id')
	
	const getPost = await prisma.post.findFirst({
		where : {
			id
		}
	})

	if(!getPost)
	{
		c.status(403)
		return c.text('Post not found!')
	}

	return c.json({
		getPost
	})
})

// update a post route
app.put('/api/v1/blog', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	// const userId = c.req.header('userId')

	const body = await c.req.json()
	const { success } = updateBlogInput.safeParse(body)
	if(!success)
	{
		c.status(403)
		return c.text('Invalid Inputs!')
	}

	let updatePost;
	if(!body.title)
	{
		updatePost = await prisma.post.update({
			where : {
				id : body.id,
			},
			data : {
				content : body.content,
			}
		})
	}
	else if(!body.content)
	{
		updatePost = await prisma.post.update({
			where : {
				id : body.id,
			},
			data : {
				title : body.title,
			}
		})
	}
	else{
		updatePost = await prisma.post.update({
			where : {
				id : body.id,
			},
			data : {
				title : body.title,
				content : body.content
			}
		})
	}

	if(!updatePost)
	{
		c.status(403)
		return c.text('Unable to update post!')
	}

	c.status(200)
	return c.json({
		updatePost
	})
	
})

// create a post for a user route
app.post('/api/v1/blog',async (c)=>{

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const userId = c.req.header('userId')
	if(!userId)
	{
		return c.text('userId not found!')
	}

	const body = await c.req.json()
	if(!body)
	{
		return c.text('body not found!')
	}

	const { success } = createBlogInput.safeParse(body)
	if(!success)
	{
		c.status(403)
		return c.text('Invalid Body!')
	}

	const createPost = await prisma.post.create({
		data : {
			title : body.title,
			content : body.content,
			authorId : userId
		}
	})

	if(!createPost)
	{
		c.status(403)
		return c.text("unable to create Post!")
	}

	c.status(200)
	return c.json({
		psotId : createPost.id
	})
})

app.get('api/v1/blog',async (c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await prisma.post.findMany({
		where : {},
	})

	if(!body)
	{
	  c.status(400)
	  return c.text('Something went wrong!')
	}

	c.status(200)
	return c.json({
		body
	})
})

export default app;