const {ctrlWrapper} = require('../../helpers')
// обработчик маршрута '/current'
const getCurrent = async(req, res)=>{

    const {email, subscription} = req.user
    console.log(subscription)
    
    const responseBody = {
      email: email,
      subscription: subscription 
    };
    res.status(200).header('Content-type', 'application/json').json(responseBody)
  
  }
  module.exports =  {
    getCurrent: ctrlWrapper(getCurrent)
}