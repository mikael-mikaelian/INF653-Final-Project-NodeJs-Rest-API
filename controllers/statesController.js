const { stringify } = require('uuid');
const State = require('../model/State');

const data = {
  states: require('../model/statesData.json'), // States data from JSON file
  setStates: function (data) {
    this.states = data;
  }
};





const getAllStates = async (req, res) => {
  // Get the "contig" query parameter from the request URL
  const urlVariable = req.query.contig;

  // If "contig" is "true", filter out Alaska and Hawaii from the list of states
  if (urlVariable === "true") {
    const contigFilter = data.states.filter(state => !["Alaska", "Hawaii"].includes(state.state));
    return res.json(contigFilter);
  }

  // If "contig" is "false", filter out all states except Alaska and Hawaii
  if (urlVariable === "false") {
    const nonContigFilter = data.states.filter(state => ["Alaska", "Hawaii"].includes(state.state));
    return res.json(nonContigFilter);
  }

  // If "contig" is not provided add fun facts to each state object
  for (const state of data.states) {
    // Look up the state in the database using its code
    const selectedState = await State.findOne({ stateCode: state.code });
    if (selectedState) {
      // If a matching state is found, add its fun facts to the state object
      state.funfacts = selectedState.funfacts;
    }
  }

  // Return the complete list of states, including any added fun facts
  return res.json(data.states);
}





const getState = async (req, res) => {
  // Get the state code from the request URL and convert it to uppercase
  let code = req.params.state;
  code = code.toUpperCase();

  // Loop through the array of states and find the one that matches the provided code
  for (const state of data.states) {
    if (code === state.code) {
      // If a matching state is found, look up its fun facts in the database
      const facts = await State.findOne({ stateCode: code }).exec();

      // Create a copy of the matching state object and add the fun facts to it, if available
      const updatedReturn = { ...state };
      if (facts) {
        updatedReturn.funfacts = facts.funfacts;
      }

      // Return the state object, with or without fun facts, in JSON format
      return res.json(updatedReturn);
    }
  }

  // If no matching state is found, return an error message in JSON format
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const getFunFact = async (req, res) => {
  let code = req.params.code;
  code = code.toUpperCase();
  
  // Loop through the data to find the state with the given code
  for(let i = 0; i < data.states.length; i++) {
      let array = Object.entries(data.states).map(([key,value])=>value);
      if(code == array[i].code){
          // Find fun facts for the state using the code
          var facts = await State.findOne({ stateCode: code }).exec();
          
          // Get the state object from the data with the matching code
          var result = data.states.filter(obj=> obj.code == code);
          var updatedState = result[0].state;
          
          // If fun facts are found for the state, return a random one
          if(facts != null) {
              var resultObject = { funfacts: facts.funfacts };
              var resultIndex = Math.floor(Math.random() * resultObject.funfacts.length);
              var funfact = resultObject.funfacts[resultIndex];
              var updatedReturn = { funfact };
              
              return res.json(updatedReturn);
          } 
          
          // If no fun facts are found, return a message indicating that
          var message = ("No Fun Facts found for " + updatedState);
          return res.json({"message": message});
      }
  } 
  
  // If no state is found with the given code, return an error message
  return res.json({"message":"Invalid state abbreviation parameter"});
}





const getCapital = (req, res) => {
  // Get the state code from the request URL and convert it to uppercase
  let code = req.params.code;
  code = code.toUpperCase();

  // Loop through the array of states and find the one that matches the provided code
  for (const state of data.states) {
    if (code === state.code) {
      // If a matching state is found, return its name and capital city in JSON format
      return res.json ({ 
        "state": state.state, 
        "capital": state.capital_city 
      });
    }
  }

  // If no matching state is found, return an error message in JSON format
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const getNickname = (req, res) => {
  // Get the state code from the request URL and convert it to uppercase
  let code = req.params.code;
  code = code.toUpperCase();

  // Loop through the array of states and find the one that matches the provided code
  for (const state of data.states) {
    if (code === state.code) {
      // If a matching state is found, return its name and nickname in JSON format
      return res.json ({ 
        "state": state.state, 
        "nickname": state.nickname });
    }
  }

  // If no matching state is found, return an error message in JSON format
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const getPopulation = (req, res) => {
  // Get the state code from the request URL and convert it to uppercase
  let code = req.params.code;
  code = code.toUpperCase();

  // Loop through the array of states and find the one that matches the provided code
  for (const state of data.states) {
    if (code === state.code) {
      // If a matching state is found, return its name and population in JSON format, formatted with commas for readability
      return res.json ({ 
        "state": state.state, 
        "population": state.population.toLocaleString() 
      });
    }
  }

  // If no matching state is found, return an error message in JSON format
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const getAdmission = (req, res) => {
  // Get the state code from the request URL and convert it to uppercase
  let code = req.params.code;
  code = code.toUpperCase();

  // Loop through the array of states and find the one that matches the provided code
  for (const state of data.states) {
    if (code === state.code) {
      // If a matching state is found, return its name and admission date in JSON format,
      // formatted as a string using the toLocaleString method for readability
      return res.json ({
         "state": state.state, 
         "admitted": state.admission_date.toLocaleString() 
        });
    }
  }

  // If no matching state is found, return an error message in JSON format
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const createFunFact = async (req, res) => {

    // Get the state code from the URL parameter and convert it to upper case
    let code = req.params.code;
    code = code.toUpperCase();

    // Loop through all the states to find the matching state code
    for(let i = 0; i < data.states.length; i++) {
        let array = Object.entries(data.states).map(([key,value])=>value);

        if(code == array[i].code) {

            // Get the current fun facts for the state from the database
            var facts = await State.findOne({ stateCode: code }).exec();
            console.log(facts);

            // Check if the request body has a funfacts property and it is an array
            if (!req?.body?.funfacts) {
                return res.status(400).json({ 'message': 'State fun facts value required'});
            }
            var arrayCheck = req.body.funfacts;
            if (!Array.isArray(arrayCheck)){
                return res.status(400).json({ 'message': 'State fun facts value must be an array'});
            }

            try {
                if(!facts) {
                    // If there are no existing fun facts for the state, create a new document in the database
                    const result = await State.create({
                        stateCode: code,
                        funfacts: req.body.funfacts
                    });
                    return res.status(201).json(result);
                } else {
                    // If there are existing fun facts for the state, update the document in the database with the new fun fact
                    const result = await State.findOneAndUpdate(
                        { stateCode: code },
                        { $push: { funfacts: req.body.funfacts } },
                        { upsert: true, new: true }
                    );
                    return res.status(201).json(result);
                } 
            } catch (err) {
                console.error(err);
            }
        }
    } 
    return res.json({"message":"Invalid state abbreviation parameter"});
}





const deleteFunFact = async (req, res) => {
  let code = req.params.code;
  code = code.toUpperCase();
 
  // Loop through each state in the data
  for (const state of data.states) {
    if (code == state.code) {
      var index = req.body.index;
      if (!index) {
        return res.status(400).json({ "message": "State fun fact index value required" });
      }
      // Find the state in the database and get its current fun facts
      var facts = await State.findOne({ stateCode: code }).exec();
      // Get the name of the state from the data
      var result = data.states.filter(obj => obj.code == code);
      var updatedState = result[0].state;
      if (facts != null) {
        var resultObject = { funfacts: facts.funfacts };
        
        // Check if the specified index is within the bounds of the fun facts array
        if (index < 1 || index > resultObject.funfacts.length) {
          var message = `No Fun Fact found at that index for ${updatedState}`;
          return res.status(400).json({ "message": message });
        }

        // Remove the specified fun fact from the database and remove any null values in the fun facts array
        const deletionResult = await State.findOneAndUpdate(
          { stateCode: code },
          { $unset: { [`funfacts.${index - 1}`]: 1 } },
          { new: true }
        );
        // Remove any null values in the fun facts array
         const deletionResultWithNullRemoved = await State.findOneAndUpdate(
          { stateCode: code },
          { $pull: { funfacts: null } },
          { new: true }
        );

        // Return the updated state object
        return res.json(deletionResultWithNullRemoved);
      }
      // If the state has no fun facts in the database, return an error message

      return res.json({ "message": `No Fun Facts found for ${updatedState}` });
    }
  }
  // If the state abbreviation is invalid, return an error message
  return res.json({ "message": "Invalid state abbreviation parameter" });
}





const updateFunFact = async (req, res) => {
    // Retrieve the state code parameter from the request and convert it to uppercase
    let code = req.params.code.toUpperCase();

    // Check if the state code is valid by searching for it in the data file
    let state = data.states.find(s => s.code === code);
    if (!state) {
        return res.status(400).json({ 'message': 'Invalid state code'});
    }
  
    try {
        // Retrieve the state document from the database using the state code
        let stateDoc = await State.findOne({ stateCode: code }).exec();

        // Check if the request body includes a valid fun fact and index
        if (!req.body.funfact) {
            return res.status(400).json({ 'message': 'State fun fact value required'});
        }
        if (!req.body.index) {
            return res.status(400).json({ 'message': 'State fun fact index value required'});
        }

      
        if (!stateDoc){
          return res.status(400).json({ 'message': `No Fun Facts found for ` + state.state});
        }

        // Retrieve the index and fun facts array from the state document
        let index = parseInt(req.body.index) - 1; // Subtract 1 to convert to zero-based index
        let funfacts = stateDoc.funfacts || [];

      
        // Check if the fun facts array has an item at the specified index
        if (!funfacts[index]) {
            return res.status(400).json({ 'message': `No Fun Fact found at that index for ${state.state}`});
        }

        // Update the fun fact at the specified index
        funfacts[index] = req.body.funfact;

        // Update the state document in the database with the updated fun facts array
        let result = await State.findOneAndUpdate(
            { stateCode: code },
            { $set: { funfacts: funfacts } },
            { upsert: true, new: true }
        );

        return res.status(201).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ 'message': 'Internal server error' });
    }
};


module.exports = { 
    getAllStates,
    getState,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    createFunFact,
    updateFunFact,
    deleteFunFact
}