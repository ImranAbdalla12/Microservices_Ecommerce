exports.erroHandler = (err, req, res, next) => {
console.log("Something went Wrong")
res.status(400).send({
message: err.message
})
}