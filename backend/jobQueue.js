/*
const Queue = require('bull');

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;
const Job = require('./models/Job');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");


jobQueue.process(NUM_WORKERS, async({data}) => {
    console.log(data);
    const {id: jobId} = data;
    const job = await Job.findById("jobId");
    if(job === undefined) {
        throw Error("job not found")
    }
    console.log("Fetched Job", job);

    job["startedAt"] =new Date();

    try {
      if (job.language === "cpp") {
        output = await executeCpp(job.filepath);
      } else if (job.language === "py") {
        // Check language for Python
        output = await executePy(job.filepath); // Call executePy for Python
      } else {
        throw new Error("Unsupported language"); // Handle unsupported languages
      }

      job["completedAt"] = new Date();
      job["status"] = "success";
      job["output"] = output;

      await job.save();


      return res.status(200).json({ 
        success: true, 
        language, 
        codeLength: code.length, 
        filepath, 
        output,
        jobId
      });
    } catch (error) {
      job["completedAt"] = new Date();
      job["status"] = "error";
      job["output"] = JSON.stringify(err);
      await job.save();
      console.log(job); // Corrected typo here
      if (error instanceof SyntaxError) {
        console.error("Syntax Error:", error);
        return res
          .status(400)
          .json({
            success: false,
            error: error.message,
            message: "Syntax Error"
          });
      } else {
        return res
          .status(500)
          .json({ success: false, error: "Error executing script" });
      }
      
    } 
  });




jobQueue.on('failed', (error) => {
    console.log(error.data.id, "failed", error.failedReason);
})

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id: jobId});
}

module.exports = {
    addJobToQueue
}
*/

//////
/*const Queue = require('bull');

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;
const Job = require('./models/Job');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");


jobQueue.process(NUM_WORKERS, async({data}) => {
    console.log(data);
    const {id: jobId} = data;
    const job = await Job.findById("jobId");
    if(job === undefined) {
        throw Error("job not found")
    }
    console.log("Fetched Job", job);

    job["startedAt"] =new Date();

    try {
      if (job.language === "cpp") {
        output = await executeCpp(job.filepath);
      } else if (job.language === "py") {
        // Check language for Python
        output = await executePy(job.filepath); // Call executePy for Python
      } else {
        throw new Error("Unsupported language"); // Handle unsupported languages
      }

      job["completedAt"] = new Date();
      job["status"] = "success";
      job["output"] = output;

      await job.save();


      return res.status(200).json({ 
        success: true, 
        language, 
        codeLength: code.length, 
        filepath, 
        output,
        jobId
      });
    } catch (error) {
      job["completedAt"] = new Date();
      job["status"] = "error";
      job["output"] = JSON.stringify(err);
      await job.save();
      console.log(job); // Corrected typo here
      if (error instanceof SyntaxError) {
        console.error("Syntax Error:", error);
        return res
          .status(400)
          .json({
            success: false,
            error: error.message,
            message: "Syntax Error"
          });
      } else {
        return res
          .status(500)
          .json({ success: false, error: "Error executing script" });
      }
      
    } 
  });




jobQueue.on('failed', (error) => {
    console.log(error.data.id, "failed", error.failedReason);
})

const addJobToQueue = async(jobId) => {
    await jobQueue.add({id: jobId});
}

module.exports = {
    addJobToQueue
}
*/

const Queue = require('bull');
const Job = require('./models/Job');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");

const jobQueue = new Queue('job-queue');
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    console.log(data);
    const { id: jobId } = data;
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error("Job not found");
    }
    console.log("Fetched Job", job);

    job.startedAt = new Date();

    try {
        let output;
        if (job.language === "cpp") {
            output = await executeCpp(job.filepath);
        } else if (job.language === "py") {
            output = await executePy(job.filepath);
        } else {
            throw new Error("Unsupported language");
        }

        job.completedAt = new Date();
        job.status = "success";
        job.output = output;

        await job.save();

        console.log("Job completed successfully");
    } catch (error) {
        job.completedAt = new Date();
        job.status = "error";
        job.output = error.message;
        await job.save();

        console.error("Error executing job:", error);
    }
});

jobQueue.on('failed', (job, error) => {
    console.log(job.id, "failed", error);
});

const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId });
};

module.exports = {
    addJobToQueue
};



