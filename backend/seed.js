const API_URL = 'http://localhost:5000/api';

const titles = ["React Developer", "Node.js Engineer", "UI/UX Designer", "Frontend Architect", "DevOps Engineer", "Full Stack Developer", "Data Scientist", "Product Manager", "Python Backend Dev", "Mobile App Developer"];
const companies = ["TCS", "Infosys", "Wipro", "Zomato", "Swiggy", "Flipkart", "CRED", "Razorpay", "Reliance Jio", "HCL Tech", "Paytm", "Ola"];
const locations = ["Remote (All over India)", "Remote (Bangalore base)", "Remote (Mumbai base)", "Remote (Delhi NCR base)", "Remote (Hyderabad base)", "Hybrid Remote"];
const exSkill = [["React", "Node.js"], ["Python", "AWS"], ["Figma", "UI/UX"], ["Docker", "Kubernetes"], ["MongoDB", "Express"], ["Java", "Spring Boot"], ["TypeScript", "Next.js"], ["Vue.js", "Firebase", "CSS"]];

function generateJobs(count) {
  const generatedJobs = [];
  for (let i = 0; i < count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    generatedJobs.push({
      title: title + (i > 15 ? ` Level ${Math.floor(i/10) + 1}` : ""),
      description: `We are looking for an experienced ${title} to join our fast-growing active remote team. You will be responsible for building highly scalable products and collaborating with our cross-functional teams globally.\n\nQualifications:\n- 3+ years of experience\n- Strong communication skills\n- Comfortable in a fast-paced environment\n- Ability to work independently remotely.`,
      company: { name: companies[Math.floor(Math.random() * companies.length)], logoUrl: "" },
      salaryRange: { min: 500000 + (Math.floor(Math.random() * 15) * 100000), max: 1500000 + (Math.floor(Math.random() * 20) * 100000), currency: "INR" },
      skillsRequired: exSkill[Math.floor(Math.random() * exSkill.length)],
      jobType: Math.random() > 0.3 ? "Full-time" : "Contract",
      location: locations[Math.floor(Math.random() * locations.length)]
    });
  }
  return generatedJobs;
}

const jobs = generateJobs(30);

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  const data = await res.json();
  if (!res.ok) throw { response: { data } };
  return data;
}

async function seedData() {
  try {
    console.log("Registering Recruiter...");
    const recruiterData = await fetchJSON(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        name: "Alice Recruiter",
        email: "alice@employer.com",
        password: "password123",
        role: "Recruiter"
      })
    });
    const recruiterToken = recruiterData.token;
    
    console.log(`Posting ${jobs.length} Jobs as Recruiter...`);
    const createdJobs = [];
    for (const job of jobs) {
      const jobData = await fetchJSON(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${recruiterToken}` },
        body: JSON.stringify(job)
      });
      createdJobs.push(jobData);
    }
    console.log(`- Created ${createdJobs.length} Jobs Successfully!`);

    console.log("Registering Job Seeker...");
    const seekerData = await fetchJSON(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        name: "Bob Seeker",
        email: "bob@jobseeker.com",
        password: "password123",
        role: "Seeker"
      })
    });
    const seekerToken = seekerData.token;

    console.log(`Applying to job: '${createdJobs[0].title}'...`);
    await fetchJSON(`${API_URL}/applications/${createdJobs[0]._id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${seekerToken}` },
      body: JSON.stringify({
        resumeUrl: "https://example.com/bobs-resume.pdf",
        coverLetter: "I am highly interested in this role!"
      })
    });
    console.log("- Application successful!");

    console.log("\n✅ Database seeded with 30 jobs! Refresh your browser now.");
  } catch (error) {
    if (error.response?.data?.message === 'User already exists') {
      console.log("⚠️ Data is already seeded in this session! No action taken.");
    } else {
      console.error("❌ Error seeding database:", error.response?.data || error.message);
    }
  }
}

seedData();
