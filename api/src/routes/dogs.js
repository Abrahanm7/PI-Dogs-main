require ('dotenv').config();
const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperament, Dog_Temp } = require('../db.js');


const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds")
    const apiInfo = await apiUrl.data.map(el => {
        const image = el.image.url;
        

        return {
            id: el.id,
            name: el.name,
            heightMax: parseInt(el.height.metric.slice(4).trim()),
            heightMin: parseInt(el.height.metric.slice(0,2).trim()),
            weightMax: parseInt(el.weight.metric.slice(4).trim()),
            weightMin: parseInt(el.weight.metric.slice(0,2).trim()),
            temperament: el.temperament,
            image: image,
            createdInDb: false,
            life_span: el.life_span
            }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes:[],
            },
        }
    })
}


const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal; 
}

const getAllTemp = async () => {
    const temperamentsApi = await axios.get("https://api.thedogapi.com/v1/breeds")
    const temperaments = temperamentsApi.data.map((el) => el.temperament)
    const arrTemp = temperaments.map((el) => (el ? el.split(", ") : null)).flat();
    const temperament = [...new Set(arrTemp)];

    temperament.filter(el => el !== null).forEach(
        async (el) => await Temperament.findOrCreate({
            where: {name: el}
        })
    );
    const allTemperaments = await Temperament.findAll();
    return allTemperaments;
}
    
router.get('/dogs', async (req , res) => {
    
    //llamado asincrono a la api 
    //ver que necesito y con que me quedo de la api
    //llamado asincrono a la base de datos 
    //combinar los resultados 
    //enviarlos (validar que existan)
    try {
        
        const name = req.query.name ;
        let dogsTotal = await getAllDogs();
        if (name){
            let dogname = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            dogname.length ? 
            res.status(200).send(dogname) :
            res.status(400).send("No se encontro el perro");  
        } else{
            res.status(200).send(dogsTotal)
        }   
    } catch (error) {
        res.status(400).json(error.message)
    }

})

router.get('/dogs/:id', async (req , res) => {

     //recibo el id por parametros 
    //verificar el tipo de ID (de ser necesario)
     //llamado asincrono para buscarlo (base de datos o api)
     //respondemos con el resultado (se puede validar)
    const  id  = req.params.id
    try{
        const dogsTotal = await getAllDogs();
        if (id){
            const dogId = await dogsTotal.filter(el => el.id == id)
            dogId.length ?
            res.status(200).json(dogId):
            res.status(404).send("No se encontro el perro")
        }
    } catch(error){
        console.log(error)
    }
    

});

router.get('/temperaments', async (req , res) => {
    let allTemperaments = await getAllTemp();
    res.status(200).send(allTemperaments);
});

router.post('/dogs', async (req , res) => {
    
    //recibir los datos y separarlos 
    //validar los datos 
    //agregar el objeto a mi base de datos 
    //respornder que se creo (validar en caso de ser necesario)
    
    let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        temperament,
        image,
        createdInDb,
        life_span
    } = req.body
        
        let dogCreated = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            image,
            createdInDb,
            life_span
        })
        
        let temperamentDb = await Temperament.findAll({
            where: { name: temperament }
            })
        dogCreated.addTemperament(temperamentDb);        
        res.status(200).send("creado")
        
    });
    
module.exports = router;