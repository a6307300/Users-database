const user = require("../models/User.js");

exports.addUser = async function (req, res) {
  try {
  console.log('req.b', req.body);
  const {fullName, email, password, dateOfBirth} = req.body;
  await user.create({
    fullName,
    email,
    password,
    dateOfBirth,
  })
  res.json (user);
}
  catch (error) {
    console.log ('addUser error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.editUser = async function (req, res) {
  try {
    console.log('req.b', req.body)
    const userid = req.params.id;
    // const userTarget = await user.findOne({ where: { id: userid }, raw: true });
    // console.log (userTarget);
    const {fullName, email, password, dateOfBirth} = req.body;
    
    await user.update({
      fullName,
      email,
      password,
      dateOfBirth,
    },
    {
      where: { id: userid }
    })

    const userTarget = await user.findOne({ where: { id: userid }, raw: true });
    res.json (userTarget);
  } catch (error) {
    console.log('editUser error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.getUsers = async function (req, res) {
  try {
  const usersList = await user.findAll({ raw: true })
  res.json (usersList)
  } catch (error) {
    console.log('getUsers error:', error)
    return res.status(500).json({ message: error.message })
  }
};

exports.deleteUser = async function (req, res) {
  try {
  const userid = req.params.id;
  await user.destroy({ where: { id: userid }, raw: true });
  res.json (`пользователь ${userid} удален`) 
  } catch (error) {
    console.log ('deleteUser error', error)
    return res.status(500).json ({message: error.message})
  }
};
