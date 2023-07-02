import * as express from 'express'
import { pool } from "../config/db_connection"
import { QueryResult } from "pg"

export const getHome = async (req: express.Request, res: express.Response) => {
    try {
        const skip = parseInt(req.query.skip as string);
        const take = parseInt(req.query.take as string);
        const response: QueryResult = await pool.query('SELECT id, "name", "desc", price, post_code FROM public.house ORDER BY id OFFSET $1 LIMIT $2', [skip, take]);
        const payload: any[] = response.rows;
        const count: number = response.rowCount;
        return res.status(200).json({payload, count});
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const createHome = async (req: express.Request, res: express.Response) => {
    const { name, desc, price, post_code} = req.body;
    const response = await pool.query('INSERT INTO public.house ("name", "desc", price, post_code) VALUES ($1, $2, $3, $4)', [name, desc, price, post_code]);
    res.json({
        message: 'House Added successfully',
        body: {
            House: { name, desc, price, post_code} 
        }
    })
}

export const updateHome = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const { name, desc, price, post_code } = req.body;

    const response = await pool.query('UPDATE public.house SET "name" = $1, "desc" = $2, price = $3, post_code = $4 where id = $5', [
        name,
        desc,
        price,
        post_code,
        id
    ]);
    res.json('House Updated Successfully');
}

export const deleteHome = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM public.house where id = $1', [
        id
    ]);
    res.json(`House ${id} deleted Successfully`);
}

export const getPostCode = async (req: express.Request, res: express.Response) => {
    try {
        const response: QueryResult = await pool.query('SELECT DISTINCT post_code FROM public.house');
        const payload: any[] = response.rows;
        const count: number = response.rowCount;
        return res.status(200).json({payload, count});
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}

export const getPostCodeDetail = async (req: express.Request, res: express.Response) => {
    try {
        const postCodeValue = req.params.postCodeValue;
        const avgResponse: QueryResult = await pool.query('SELECT AVG(CAST(price AS float4)) As average FROM public.house where post_code = $1',[postCodeValue]);
        const average: number = avgResponse.rows[0].average;
        const medianResponse: QueryResult = await pool.query(`
            SELECT price
            FROM public.house
            ORDER BY price
            OFFSET floor((SELECT COUNT(*) FROM public.house) / 2)
            LIMIT 1
            `);
        const median: number = medianResponse.rows[0].price;
        const payload: any = {
            average: average,
            median: median
        };
        return res.status(200).json({payload});
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
}
