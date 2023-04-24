/* Controllers */
const express = require('express')
const passport = require('passport')
const log = require('../utils/logger')
const clientController = require('./clients.controller');
const { InfoClientInUse , ClientNotExist} = require('./clients.error');
const procesarErrores  = require('../../libs/errorHandler').procesarErrores
const validationClient = require('./clients.validation').validationClient
const jwtAuthenticate = passport.authenticate('jwt', { session: false })
require('dotenv').config()

const qrcode = require('qrcode')
const { Buffer } = require('buffer');
const { Op } = require("sequelize")




const xlsx = require('xlsx')

const path = require('path');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const clientRouter = express.Router()
const qr_site_url = process.env.QR_SITE_URL;

clientRouter.post('/', [jwtAuthenticate,validationClient], procesarErrores(async (req, res) => {
  let newClient = req.body
  const clientExist = await clientController.clienteExist(newClient.code)
  if (clientExist) {
    log.warn(`Codigo del [${newClient.name}] ya existen.`)
    res.status(409).json({message:'Existe un cliente con el mismo codigo.'})
    throw new InfoClientInUse()
  }




  

  // Generar el código QR
  const codeQr =  await clientController.generateQRCode(`${qr_site_url}${newClient.code}`)

  const clientCreated = await clientController.create(newClient, codeQr)
  res.status(201).json({
    message: `Cliente con codigo [${clientCreated.id}] creado exitosamente.`,
    data: clientCreated
  })
}))

clientRouter.get("/",[jwtAuthenticate], procesarErrores((req, res) => {
    const { page = 1, pageSize = 10,name } = req.query;
    let where = {};
   
    if (name) {
      where[Op.or] = [    { name: { [Op.like]: `%${name}%` } },
        { code: { [Op.like]: `%${name}%` } }
      ];
    }
    

    return clientController.all(page,pageSize,true,where).then(clients =>{
        res.json({data:clients})
    }).catch(err =>{
        res.status(500).json({message:'Error al obtener todos los clients'})
    })
}))

clientRouter.get('/export', [jwtAuthenticate],procesarErrores((async (req, res) => {
  try {
      // Obtener todos los clientes sin paginar
      const clients = await clientController.all(undefined, undefined, false);
  
      // Crear un libro de trabajo de Excel
      const workbook = xlsx.utils.book_new();
  
      // Crear una hoja de trabajo de Excel para los clientes
      const worksheet = xlsx.utils.json_to_sheet(clients, { header: ['code', 'name','address','city','province','code'] });

  
      // Agregar encabezados a las columnas
      worksheet['A1'] = { v: 'Código' };
      worksheet['B1'] = { v: 'Nombre' };
      worksheet['C1'] = { v: 'Dirección' };
      worksheet['D1'] = { v: 'Ciudad' };
      worksheet['E1'] = { v: 'Provincia' };
      worksheet['F1'] = { v: 'Enlace_qr' };
  
      // Agregar los datos de los clientes a la hoja de trabajo
      clients.forEach((client, index) => {
        const rowIndex = index + 2;
        worksheet[`A${rowIndex}`] = { v: client.code };
        worksheet[`B${rowIndex}`] = { v: client.name };
        worksheet[`C${rowIndex}`] = { v: client.address };
        worksheet[`D${rowIndex}`] = { v: client.city };
        worksheet[`E${rowIndex}`] = { v: client.province };
        worksheet[`F${rowIndex}`] = { v: `${qr_site_url}${client.code}` };
      });
  
      // Agregar la hoja de trabajo al libro de trabajo
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Clientes');
  
      // Convertir el libro de trabajo de Excel en un buffer
      const excelBuffer = xlsx.write(workbook, { type: 'buffer' });
  
      // Enviar el archivo Excel al cliente
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.set('Content-Disposition', 'attachment; filename="clientes.xlsx"');
      res.send(excelBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al exportar los clientes.' });
    }

  })))


clientRouter.get('/:id',[jwtAuthenticate],procesarErrores(async(req, res) => {

    const id = req.params.id

    // Obtener el punto de venta por su ID
    const client = await clientController.findById(id)

    if (!client) {
        throw new ClientNotExist(`El punto de venta con id [${id}] no existe.`)
    }

    // Generar el código QR para el punto de venta
    //const qrImage = await qrcode.toBuffer(`${qr_site_url}${client.code}`, {scale: 8 })
    const qrImageBase64 = `data:image/png;base64,${client.codeQr}`
    // Escribir la respuesta HTTP con el punto de venta y su código QR
    res.json({
        data : client,
        qr : qrImageBase64
    })
}))

clientRouter.get('/:id/qrcode',procesarErrores(async(req, res) => {


    const id = req.params.id

    // Obtener el punto de venta por su ID
    const client = await clientController.findByCode(id)

    if (!client) {
        throw new ClientNotExist(`El punto de venta con id [${id}] no existe.`)
    }

    /*

    // Generar el código QR para el punto de venta
    const qrImage = await qrcode.toBuffer(`${qr_site_url}${client.code}`, {scale: 8 });

    // Escribir la respuesta HTTP con el punto de venta y su código QR
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.end(qrImage)*/

    const qrImageBase64 = client.codeQr

    // Convertir la cadena base64 en un búfer de imagen
    const qrImageBuffer = Buffer.from(qrImageBase64, 'base64')

    // Escribir la respuesta HTTP con el punto de venta y su código QR
    res.writeHead(200, { 'Content-Type': 'image/png' })
    res.write(qrImageBuffer)
    res.end()
}))

clientRouter.put('/:id',[jwtAuthenticate], procesarErrores(async (req, res) => {

    let id = req.params.id
    let clientToUpdate
    
    clientToUpdate = await clientController.findById(id)

    if(!clientToUpdate){
        throw new  ClientNotExist(`El punto de venta con id [${id}] no existe.`)
    }

    clientToUpdateCode = await clientController.findByCode(req.body.code)
    if(clientToUpdateCode?.code){
        throw new  ClientNotExist(`El punto de venta con codigo [${req.body.code}] ya existe.`)
    }

    const codeQr =  await clientController.generateQRCode(`${qr_site_url}${clientToUpdate.code}`)

    return clientController.edit(clientToUpdate,req.body,codeQr)
    .then(clienteUpdated => {
            res.json({message:`El punto de venta con código [${clienteUpdated.code}] ha sido modificado con exito.`,data:clienteUpdated})
            log.info(`El punto de venta con nombre [${clienteUpdated.name}] ha sido modificado con exito.`)
    })
   
}))

clientRouter.delete('/:id', [jwtAuthenticate],procesarErrores((async (req, res) => {

    let id = req.params.id
    let pointOfSaleDelete

    pointOfSaleDelete = await clientController.findById(id)
    
    if (!pointOfSaleDelete) {
        throw new  ClientNotExist(`El punto de venta con id [${id}] no existe.`)
    }

    pointOfSaleDelete = await clientController.destroy(id,pointOfSaleDelete)
    log.info(`El punto de venta con id [${id}] fue eliminado.`)
    res.json({message:`El punto de venta con nombre [${pointOfSaleDelete.name}] fue eliminado.`, data:pointOfSaleDelete})

})))

clientRouter.post('/import',  [jwtAuthenticate], upload.single('file'),procesarErrores((async (req, res) => {
    const file = req.file

    if (!file) {
      res.status(400).json({ message: 'Se requiere un archivo Excel.' })
      return
    }

  // Verifica que el archivo no esté vacío
    if (file.size === 0) {
        res.status(400).json({ message: 'El archivo está vacío.' })
        return
    }

    // Verifica la extensión del archivo
    const fileExtension = path.extname(file.originalname)
    if (fileExtension !== '.xls' && fileExtension !== '.xlsx') {
        res.status(400).json({ message: 'El archivo debe tener una extensión .xls o .xlsx.' })
        return
    }
    
    const workbook = xlsx.read(file.buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]


      // Valida que el archivo tenga los encabezados correctos
    const expectedHeaders = ['Código', 'Nombre', 'Dirección', 'Ciudad', 'Provincia']
    const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0]
    const invalidHeaders = headers.filter(header => !expectedHeaders.includes(header))
    if (invalidHeaders.length > 0) {
        res.status(400).json({ message: `El archivo Excel contiene encabezados inválidos: ${invalidHeaders.join(', ')}` })
        return
    }
  
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
  
    // Elimina la fila de encabezado
    rows.shift()
  
    // Convierte las filas en objetos de cliente
    const clients = rows.map(row => ({
      code: row[0],
      name: row[1],
      address: row[2],
      city: row[3],
      province: row[4],
    }))
  
  // Borra todos los clientes existentes en la tabla Clientes
    await clientController.allDestroy()

    // Crea los clientes y genera los códigos QR para cada cliente
    const promises = clients.map(async (client) => {

        const codeQr = await clientController.generateQRCode(`${qr_site_url}${client.code}`)
        return clientController.create(client, codeQr)
    })

    // Espera a que se completen todas las promesas
    await Promise.all(promises)
  
    res.json({ message: 'Importación completada exitosamente.' })
})))


module.exports = clientRouter
