

export const updateUsers = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ApellidoP, ApellidoM, Nombre, Calle, NoInterior, NoExterior, Colonia, Alcaldia, CodigoPostal, Telefono, Nickname, Dominio, FechaRegistro, RFC } = req.body;
        const [result] = await req.db.query("UPDATE clientes SET ApellidoP = ?, ApellidoM = ?, Nombre = ?, Calle = ?, NoInterior = ?, NoExterior = ?, Colonia = ?, Alcaldia = ?, CodigoPostal = ?, Telefono = ?, Nickname = ?, Dominio = ?, FechaRegistro = ?, RFC = ? WHERE id = ?", [ApellidoP, ApellidoM, Nombre, Calle, NoInterior, NoExterior, Colonia, Alcaldia, CodigoPostal, Telefono, Nickname, Dominio, FechaRegistro, RFC, id])
        return res.json({
            message: `Usuario [${Nombre}] actualizado correctamente`, result
        })
    } catch (error) {
        return next(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const [rows] = await req.db.query("SELECT * FROM clientes");
        return res.json({ message: "Usuarios obtenidos con exito", users: rows });
    } catch (error) {
        return next(error)
    }
}

export const addUser = async (req, res, next) => {
    try {
        const { ApellidoP, ApellidoM, Nombre, Calle, NoInterior, NoExterior, Colonia, Alcaldia, CodigoPostal, Telefono, Nickname, Dominio, FechaRegistro, RFC } = req.body;
        const [result] = await req.db.query("INSERT INTO clientes (ApellidoP, ApellidoM, Nombre, Calle, NoInterior, NoExterior, Colonia, Alcaldia, CodigoPostal, Telefono, Nickname, Dominio, FechaRegistro, RFC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ApellidoP, ApellidoM, Nombre, Calle, NoInterior, NoExterior, Colonia, Alcaldia, CodigoPostal, Telefono, Nickname, Dominio, FechaRegistro, RFC])
        return res.json({ message: "Usuario agregado con exito", result })
    } catch (error) {
        return next(error)
    }
}