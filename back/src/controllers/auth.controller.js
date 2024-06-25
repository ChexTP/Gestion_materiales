import { pool } from "../db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TOKEN_ADMIN } from "../config.js";

export const registrarAdmin = async (req,res)=>{
    
    const {nombre,email,contraseña}=req.body

    try {
        const [rows] = await pool.query('SELECT * FROM administrador WHERE email = ?',[email])
        if(rows.length>0){
            return res.status(400).json({message:'Email ya esta registrado'})
        }

        const contraseñaHash= await bcrypt.hash(contraseña,10)

        const [result] = await pool.query('INSERT INTO administrador (nombre,email,contraseña) VALUES (?,?,?)',[nombre,email,contraseñaHash])

        res.status(201).json({ id: result.insertId, nombre, email });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error al registrar administrador'})
        
    }
}

export const loginAdmin = async (req,res)=>{

    const { email, contraseña } = req.body;

    try {
        console.log(email);
        console.log(contraseña);
        
        const [rows] = await pool.query('SELECT * FROM administrador WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        
        const admin = rows[0];
        console.log(admin.contraseña);
        const isMatch = await bcrypt.compare(contraseña,admin.contraseña)

        if(!isMatch) return res.status(400).json({message:"contraseña incorrecta"})

        const token = jwt.sign({ id: admin.id, email: admin.email }, TOKEN_ADMIN, { expiresIn: '1h' });
        res.status(200).json({ admin });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }


}