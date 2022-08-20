const { Router } = require('express');
const axios = require('axios')
const { Dog, Temperamento, Dog_Temp } = require('../db.js');


const router = Router();

const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds?api_key={API_KEY}")
    const apiInfo = await apiUrl.data.map(el => {
        const heightsp = el.height.metric.split("-");
        const weightsp = el.weight.metric.split("-");
        const image = el.image.url;
        
        return {
            id: el.id,
            name: el.name,
            heightMin: heightsp[0],
            heightMax: heightsp[1],
            weightMin: weightsp[0],
            weightMax: weightsp[1],
            temperament: el.temperament,
            image: image,
            life_span: el.life_span
            }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperamento,
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

router.get('/dogs', async (req , res) => {
    
    //llamado asincrono a la api 
    //ver que necesito y con que me quedo de la api
    //llamado asincrono a la base de datos 
    //combinar los resultados 
    //enviarlos (validar que existan)
    
    const name = req.query.name ;
    let dogsTotal = await getAllDogs();
    if (name){
        let dogname = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogname.length ? 
        res.status(200).send(dogname) :
        res.status(400).send("No esta la raza buscada");  
    } else{
        res.status(200).send(dogsTotal)
    }   

})

router.get('/dogs/:id', async (req , res) => {

     //recibo el id por parametros 
    //verificar el tipo de ID (de ser necesario)
     //llamado asincrono para buscarlo (base de datos o api)
     //respondemos con el resultado (se puede validar)
    const id = req.params.id
    const dogsTotal = await getAllDogs();
    if (id){
        const dogId = await dogsTotal.filter(el => el.id == id)
        dogId.length ?
        res.status(200).json(dogId):
        res.status(404).send("No se encontro el perro")
    }

});

router.get('/temperaments', async (req , res) => {
    const temperamentsApi = await axios.get("https://api.thedogapi.com/v1/breeds?api_key={API_KEY}")
    const temperaments = temperamentsApi.data.map((el) => el.temperament)
    const temp = temperaments.toString().split(",")
    temp.forEach(el => {el && 
        Temperamento.findOrCreate({
            where: {name: el.trim()}
        })
    })
    const allTemperaments = await Temperamento.findAll();
    res.send(allTemperaments);
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
    
    let temperamentDb = await Temperamento.findAll({
        where: { name: temperament }
    })
    const creado = await dogCreated.addTemperamento(temperamentDb);
    res.send(creado)
});


module.exports = router;