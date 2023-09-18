import { ROLES } from '../models/Role.js';
import User from '../models/User.js';

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: 'El usuario ya existe' });

    const email = User.findOne({ email: req.body.email });
    if (email) return res.status(200).json({ message: 'El email ya existe' });

    next();
};

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `El Rol ${req.body.roles[i]} no existe`
                });
            }
        }
    }
    next();
};
