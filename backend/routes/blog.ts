import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@mannat/medium-commons';

export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},

}>


// get post with id
blogRouter.get('/:id', async (c) => {
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
blogRouter.put('/blog', async (c) => {
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
blogRouter.post('/blog',async (c)=>{

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

blogRouter.get('/blog',async (c)=>{
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