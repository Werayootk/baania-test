import * as express from 'express'
interface IHelloResponse {
	message: string
}

export const getHome = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${( "getHome")}.`,
	}
	return res.json({
		...resp
	})
}

export const createHome = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${("createHome")}.`,
	}
	return res.json({
		...resp
	})
}

export const updateHome = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${("updateHome")}.`,
	}
	return res.json({
		...resp
	})
}

export const deleteHome = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${("deleteHome")}.`,
	}
	return res.json({
		...resp
	})
}

export const getPostCode = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${("getPostCode")}.`,
	}
	return res.json({
		...resp
	})
}

export const getPostCodeDetail = (req: express.Request, res: express.Response) => {
	const resp: IHelloResponse = {
		message: `Hello : ${("getPostCodeDetail")}.`,
	}
	return res.json({
		...resp
	})
}
