import jwt from 'jsonwebtoken';

import config from '../config.js';
import User from '../models/User.js';
import Role from '../models/Role.js';

export const verifyToken = async (req, res, next)=> {
   try {
    const token = req.headers.token;

    console.log(token);

    if (!token) return res.status(403).json({message: 'No hay token'});

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id;
;

    const user = await User.findById(req.userId, {password: 0})
    if (!user) return res.status(404).json({message: 'El usuario no existe'});
    req.user = user
    next();
   } catch (error) {
    return res.status(401).json({message:'No autorizado'})
   }
}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (const role of roles) {
            if (role.name === 'moderator') {
                return next();
            }
        }

        return res.status(403).json({ message: 'El usuario no es moderador' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor aaaa' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const roles = await Role.find({ _id: { $in: user.roles } });

        for (const role of roles) {
            if (role.name === 'admin') {
                return next();
            }
        }

        return res.status(403).json({ message: 'El usuario no es administrador' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor admins', error });
    }
};
