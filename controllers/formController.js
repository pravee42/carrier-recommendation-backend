const getFormCollection = require('../models/formModel');

const saveData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = req.body;

    const {
      additional_comments,
      technical_skills,
      career_goals,
      certifications,
      field_of_study,
      growth_industries,
      job_markets,
      name,
      relocation,
      current_salary,
      expected_salary,
    } = data;

    const DataPost = getFormCollection();

    

    const structuredProfile = `
          User Profile:
          - Skills: ${technical_skills}
          - career_goals: ${career_goals}
          - certifications: ${certifications}
          - field_of_study: ${field_of_study}
          - growth_industries: ${growth_industries}
          - job_markets: ${job_markets}
          - name: ${name}
          - relocation: ${relocation}
          - current_salary: ${current_salary}
          - expected_salary: ${expected_salary}
          - Additional comments: ${additional_comments}

  
          Based on the above user profile, reply with:
          1. A brief job description
          2. Required skills (Highlight missing skills if any)
          3. Salary range in India
          4. Learning resources to upskill
          5. Future career growth in the field.
          - Job opportunities in India (Highlight those that align with the user's interests)
          - Salary ranges in India for these career paths
          - Learning resources to upskill in these career paths
          - Future career growth in these career paths.
          - How to improve future career paths
      `;

    try {
        const data = await fetch("https://api.cloudflare.com/client/v4/accounts/89a8a1278748c1908293490b681f7c0a/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora", {
            method: "POST",
            headers: {
              "Authorization": "Bearer uBC6NqucYkHkqbBLmOu_gCQh1oxoGedvxIZCh6TE",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [
                { role: "system", content: "I want you to act as a career counselor. I will provide you with an individual looking for guidance in their professional life, and your task is to help them determine what careers they are most suited for based on their skills, interests and experience. You should also conduct research into the various options available, explain the job market trends in different industries and advice on which qualifications would be beneficial for pursuing particular fields." },
                { role: "user", content: structuredProfile },
              ],
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
        
            const data1 = await fetch("https://api.cloudflare.com/client/v4/accounts/89a8a1278748c1908293490b681f7c0a/ai/run/@cf/mistral/mistral-7b-instruct-v0.2-lora", {
                method: "POST",
                headers: {
                  "Authorization": "Bearer uBC6NqucYkHkqbBLmOu_gCQh1oxoGedvxIZCh6TE",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  messages: [
                    { role: "system", content: "You are an Job Name finder chat bot, You need to give all the answer in names of the job names, Note: You need to give response as only one answer. First question: I am a react js developer." },
                    { role: "system", content: "Web Developer." },
                    { role: "user", content: `${data} Based on the above given data suggest me only one Job name that best fits for this candicate. Don;t add any other extra words from that, Note: Your response should be max 3 words.` },
                  ],
                }),
              })
                .then(async (response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
                })
    

            await DataPost.updateOne({_id: userId}, {$set: {...data, reponse: data.result.response}}, {upsert: true});
        
            return res.status(200).json({message: data.result.response, jobName: data1.result.response})
          
    } catch (error) {
      console.error('Error with OpenAI:', error);
      res.status(500).json({message: 'AI analysis failed'});
    }
  } catch (error) {
    console.log('Error with OpenAI:', error);
    res.status(500).json({message: 'Error posting job'});
  }
};

const getData = async (req, res) => {
  try {
    const jobs = getFormCollection();
    const jobList = await jobs.find({}).toArray();
    res.json(jobList);
  } catch (error) {
    res.status(500).json({message: 'Error fetching jobs'});
  }
};

module.exports = {saveData, getData};
