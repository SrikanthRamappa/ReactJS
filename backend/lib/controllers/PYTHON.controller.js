// #############################################################################################################
// Python Script

// refer: https://codewithhugo.com/integrate-python-ruby-php-shell-with-node-js/

//http://localhost:12059/react-express-template/master/api/RunPythonScript?firstname=Mike&lastname=Will

module.exports.RunPythonScript = function (req, res) {


    const { spawn } = require('child_process')
    const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)
    
    // Define the Python script path
    const path = require('path')
    var scriptPath = path.join(__dirname, '../Scripts/hello.py') 

    console.log(scriptPath);
    //pass the argument from the request from Reactjs 
    const nameargs  = req.body.name; 
    const jobargs  = req.body.job; 
    const petargs  = req.body.pet; 

    // Funtion run() to excute the script

    function run() {
      return new Promise((resolve, reject) => {
      
        //  const process = spawn('python', ['./Scripts/hello.py', 'arg1', 'arg2','arg3']);
      const process = spawn('python',[scriptPath, nameargs,jobargs,petargs]);      
      
      const out = []
      process.stdout.on(
        'data',
        (data) => {
          out.push(data.toString());
          logOutput('stdout')(data);
     //     console.log("_________________________")
     //     console.log (out)
      //    console.log("_________________________")
        }
      );

      const err = []
      process.stderr.on(
        'data',
        (data) => {
          err.push(data.toString());
          logOutput('stderr')(data);
        }
      );

      process.on('exit', (code, signal) => {
        logOutput('exit')(`${code} (${signal})`)
        if (code !== 0) {
          reject(new Error(err.join('\n')))
          return
        }
        try {
          resolve(JSON.parse(out[0]));
        } catch(e) {
          reject(e);
        }
      });
    });
  }

  (async () => {
    try {
      const output = await run()
      logOutput('main')(output.message)
      //res.send(output.arguments)
      res.send(output)  
     // process.exit(0)        //- do not use this it will not refresh the screen for next hit
      
    } catch (e) {
      console.error('Error during script execution ', e.stack);
      res.send({Message: 'Error during script execution'})  
     // process.exit(1);  //- do not use this it will not refresh the screen for next hit
    }
  })();


};