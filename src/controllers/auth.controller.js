import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import Role from '../models/Role.js';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body;
    
    try {
        const hashedPassword = await User.encryptPassword(password); // Corrección aquí
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Usamos la contraseña encriptada
        });

        if (roles) {
           const foundRoles = await Role.find({name: {$in: roles}})
           newUser.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id]
        }

        const saveUser = await newUser.save();

        console.log(saveUser);

        const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
            expiresIn: 86400 // 24hs
        });

        res.status(200).json({ token }); // Respondemos con un objeto JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signUp', error });
    }
}

export const signIn = async (req, res) => {
    
    const userFound = await User.findOne({ email: req.body.email}).populate('roles')

    if (!userFound) return res.status(400).json({ message: 'El usuario no existe'})

    if (!userFound.isActive)return res.status(500).json({ message: 'El usuario no está activo'}) 

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(400).json({token: null , message: 'Password incorrecto'})

    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn: 86400
    })

    console.log(userFound);
    res.json({token})

}
