import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export default function notFound(req: Request, res: Response) { return res.status(StatusCodes.NOT_FOUND).send('Route does not exist') }

