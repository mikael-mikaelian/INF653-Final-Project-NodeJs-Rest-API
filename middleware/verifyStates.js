const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}


const verifyCode = () => {
    return (req, res, next) => {
        if (!req?.code) return res.sendStatus(401);
        const codesArray = data.find(item => item.key === "code");
        const result = req.code.map(code => codesArray.includes(code)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyCode