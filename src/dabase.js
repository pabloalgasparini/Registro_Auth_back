import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/refsadb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(db => console.log('Base de Datos conectada'))
.catch(err => console.log(err))