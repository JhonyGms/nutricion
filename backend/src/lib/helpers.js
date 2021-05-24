const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.generateSignature = async (apiKey, apiSecret, meetingNumber, role) => {
  try {
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    //console.log(msg)
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    //console.log(hash)
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  
    return signature
  } catch (e) {
    console.log(e)
  }
};

helpers.escapeHtml = (text) =>{
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

module.exports = helpers;
