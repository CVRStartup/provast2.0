export const demoResume = (user) => {
  return {
    personal: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      email: user?.email,
      role: "React Developer",
      image: user?.profile?.image,
      dob: "1985-11-01",
      phone: user?.phone?.value,
    },
    social: [
      {
        network: "Instagram",
        username: "tim_j",
        url: "https://www.instagram.com/tim_j/",
        enabled: true,
      },
      {
        network: "LinkedIn",
        username: "Tim Janseen",
        url: "https://www.linkedin.com/in/tim-janseen-68b0a2253",
        enabled: true,
      },
      {
        network: "Facebook",
        username: "Tim.J",
        url: "https://www.facebook.com/Tim-J-5465463",
        enabled: true,
      },
    ],
    objective: `- Organized customer information and account data for business planning and customer service purposes.\n - Created excel spreadsheets to track customer data and perform intense reconciliation process.\n - Received 97% positive customer survey results.
      - Speed on calls was 10% above team average.  
       **Key Achievement:** Designed and executed an automatized system for following up with customers, increasing customer retention by 22%.
      `,
    work: [
      {
        company: "Kell Tech",
        from: "2022-03-12",
        to: "2024-08-10",
        designation: "Senior Development Engineer",
        website: "http://www.kelltech.com",
        summary: {
          data: "- Utilized Cloud Foundry for efficient building on top of Kubernetes.\n- Supported testing and engineering processes.",
          enabled: true,
        },
        enabled: true,
      },
      {
        company: "CirroStratus",
        from: "2020-07-09",
        to: "2021-10-12",
        designation: "Software Engineer",
        website: "http://www.cirrostart.com",
        summary: {
          data: "- Identified and dealt with a significant process bottleneck that boosted coding efficiency by 35% when resolved.\n- Carried out continuous identification, measurement, and improvement of processes.",
          enabled: true,
        },
        enabled: true,
      },
    ],
    education: [
      {
        institution: "University of Pennsylvania",
        fieldOfStudy: "Computer Science",
        typeOfDegree: "Master of Science",
        startDate: "2015-04-10",
        endDate: "2018-06-10",
        gpa: "7.5",
        summary: {
          data: "Completed MS in the field of Computer Science",
          enabled: true,
        },
        enabled: true,
      },
      {
        institution: "Cherryville University",
        fieldOfStudy: "Computer Science",
        typeOfDegree: "Graduation",
        startDate: "2013-04-10",
        endDate: "2015-06-15",
        gpa: "8.9",
        summary: {
          data: "Completed graduation in the field of Computer Science",
          enabled: true,
        },
        enabled: true,
      },
    ],
    projects: [
      {
        name: "Gaming AI",
        from: "2017-08-03",
        to: "2018-11-15",
        website: "http://github.com/gameai",
        summary: {
          data: "Worked with IT team to create an AI based gaming application for the modern gamers",
          enabled: true,
        },
        enabled: true,
      },
      {
        name: "Voice and Face Recognition Software",
        from: "2016-10-03",
        to: "2017-02-18",
        website: "http://github.com/vandfrecognition",
        summary: {
          data: "Voice and face recognition is the way of the future so getting in on it now. Created a software using voice and face recognition technology to meet the needs of the current security forces.",
          enabled: true,
        },
        enabled: true,
      },
    ],
    awards: [
      {
        name: "Best performer Award",
        awarder: "Kell Tech",
        date: "2021-09-21",
        summary: {
          data: "Recieved an award for best performance for the term.",
          enabled: true,
        },
        enabled: true,
      },
      {
        name: "West Community Award",
        awarder: "West Club",
        date: "2020-12-07",
        summary: {
          data: "Recieved an award for best performance for the term.",
          enabled: true,
        },
        enabled: true,
      },
      {
        name: "The Famous Leadership Award",
        awarder: "Cherryville University",
        date: "2012-08-03",
        summary: {
          data: "Recieved an award for best performance for the term.",
          enabled: true,
        },
        enabled: true,
      },
    ],
    certifications: [
      {
        title: "Oracle Java Certifications Associate Professional",
        date: "2014-09-18",
        issuer: "Udemy",
        summary: {
          data: "Completed a course on Java and built a project at the end of the course",
          enabled: true,
        },
        enabled: true,
      },
      {
        title: "Cloudera Certified Developer for Apache Hadoop (CCDH)",
        date: "2014-02-19",
        issuer: "Coursera",
        summary: {
          data: "Completed a course in Apache Hadoop.",
          enabled: true,
        },
        enabled: true,
      },
      {
        title: "Modernizing Data Lakes and Data Warehouses with GCP",
        date: "2013-04-22",
        issuer: "Qwiklabs",
        summary: {
          data: "Completed a course on Data Warehouses using Google Cloud Platform",
          enabled: true,
        },
        enabled: true,
      },
    ],
    skills: [
      {
        name: "ReactJS",
        level: "Beginner",
        enabled: true,
      },
      {
        name: "Cloud Management",
        level: "Intermediate",
        enabled: true,
      },
      {
        name: "Web Development",
        level: "Expert",
        enabled: true,
      },
    ],
    hobbies: [
      {
        name: "Solving puzzles",
        enabled: true,
      },
      {
        name: "Travelling",
        enabled: true,
      },
    ],
    languages: [
      {
        name: "English",
        fluency: "Professional",
        enabled: true,
      },
    ],
  };
};
