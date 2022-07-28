import { FaReact } from "react-icons/fa";
import { SiAngular } from "react-icons/si";
import { FcReading } from "react-icons/fc";
import { GiBoatFishing } from "react-icons/gi";
import { SiMicrosoftword } from "react-icons/si";
import { SiMicrosoftexcel } from "react-icons/si";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiAdobe } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import moment from "moment";

export const skilloptions = [
  {
    id: 1,
    name: "React",
    icon: FaReact,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 2,
    name: "Angular",
    icon: SiAngular,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 3,
    name: "Microsoft Word",
    icon: SiMicrosoftword,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 4,
    name: "Microsoft Powerpoint",
    icon: SiMicrosoftpowerpoint,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 5,
    name: "Microsoft Excel",
    icon: SiMicrosoftexcel,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 6,
    name: "CSS",
    icon: SiCss3,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 7,
    name: "Adobe XD",
    icon: SiAdobe,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 8,
    name: "Figma",
    icon: FaFigma,
    level: "Beginner",
    enabled: false,
  },
];

export const languageoptions = [
  {
    id: 1,
    name: "English",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 2,
    name: "Hindi",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 3,
    name: "French",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 4,
    name: "German",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 5,
    name: "Telugu",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 6,
    name: "Marathi",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
  {
    id: 7,
    name: "Gujrathi",
    icon: AiOutlineStar,
    level: "Beginner",
    enabled: false,
  },
];

export const hobbyoptions = [
  {
    id: 1,
    name: "Reading",
    icon: FcReading,
    enabled: false,
  },
  {
    id: 2,
    name: "Fishing",
    icon: GiBoatFishing,
    enabled: false,
  },
];

export const getJobs = (jobs, userDetails, status) => {
  const studentJobs = {
    applied: [],
    rejected: [],
    pending: [],
    eligible: [],
  };
  jobs.forEach((job) => {
    const response = job.eligible.filter((x) => x.rollnumber === userDetails.rollNumber);
    var flag =
      job.typeOfPost === "Off-Campus" ||
      (job.college === userDetails.college &&
        (job.typeOfPost === "On-Campus" || response.length > 0));
    if (flag) {
      studentJobs.eligible.add(job);
      if (response.length === 0 || response[0].status === null) studentJobs.pending.add(job);
      else if (response[0].status === false) studentJobs.rejected.add(job);
      else studentJobs.applied.add(job);
    }
  });
  return studentJobs[status];
};

export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export const getEighteenPercent = (price) => {
  return ((price / 100) * 18).toFixed(2);
};

export const branches = [
  { name: "Aeronautical Engineering", code: "AE" },
  { name: "Agriculture Engineering", code: "AgriE" },
  { name: "Artificial Intelligence", code: "AI" },
  { name: "Artificial Intelligence and Machine Learning", code: "AI and ML" },
  { name: "Big Data Analytics", code: "BDA" },
  { name: "Biomedical Engineering", code: "BE" },
  { name: "Chemical Engineering", code: "CE" },
  { name: "Civil Engineering", code: "Civil" },
  { name: "Computer Science and Engineering", code: "CSE" },
  { name: "Computer Science and Information Technology", code: "CSIT" },
  { name: "Cyber Security", code: "CyberS" },
  { name: "Data Science", code: "DS" },
  { name: "Electrical and Electronics Engineering", code: "EEE" },
  { name: "Electrical Engineering", code: "EE" },
  { name: "Electronics and Communication Engineering", code: "ECE" },
  { name: "Electronics and Instrumentation Engineering", code: "EIE" },
  { name: "Mechanical Engineering", code: "Mech" },
  { name: "Mining Engineering", code: "ME" },
  { name: "Information Technology", code: "IT" },
  { name: "Instrumentation and Control", code: "IC" },
];
export const verifyDates = (from, to) => {
  const dateErrors = {
    from: null,
    to: null,
  };
  if (moment(new Date(from).getTime()).isAfter(Date.now()))
    dateErrors.from = "Start date should be same or before today.";
  if (moment(new Date(to).getTime()).isBefore(new Date(from).getTime()))
    dateErrors.to = "End date should be after start date.";
  return dateErrors;
};
export const generateYearsBetween = () => {
  const endYear = new Date().getFullYear() + 4;
  let startYear = new Date().getFullYear() - 4;
  const years = [];

  for (let i = startYear, j = 1; i <= endYear; i++, j++) {
    years.push({ id: j, name: "" + startYear });
    startYear++;
  }
  return years;
};

export const countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, US.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

export const months = [
  "None",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

export const rename = (name) => {
  if (!name) return name;
  var separateWord = name.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i]?.substring(1);
  }
  return separateWord.join(" ");
};

export const editorStructure = {
  dynamic: ["profile", "objective", "education", "projects", "skills", "languages"],
  core: [
    "profile",
    "education",
    "projects",
    "skills",
    "languages",
    "work",
    "certifications",
    "awards",
    "social",
  ],
  noncore: [
    "profile",
    "objective",
    "education",
    "projects",
    "skills",
    "languages",
    "work",
    "hobbies",
    "awards",
    "certifications",
  ],
  moscow: [
    "profile",
    "objective",
    "education",
    "projects",
    "skills",
    "languages",
    "work",
    "hobbies",
  ],
  onyx: [
    "profile",
    "objective",
    "education",
    "projects",
    "skills",
    "languages",
    "certification",
    "work",
    "awards",
    "hobbies",
    "social",
  ],
  refined: ["profile", "education", "projects", "certification", "awards", "skills", "languages"],
  tadigital: ["profile", "objective", "education", "projects", "skills", "languages", "awards"],
  pro: ["profile", "education", "projects", "skills"],
  gengar: ["profile", "objective", "education", "certification", "skills", "languages"],
  stockholm: ["profile", "objective", "education", "projects", "skills", "languages", "awards"],
  pro: ["profile", "education", "projects", "skills"],
  ruby: [
    "profile",
    "objective",
    "education",
    "projects",
    "skills",
    "languages",
    // 'certifications',
    "work",
    "awards",
    "hobbies",
  ],
  harvard: [
    "profile",
    "objective",
    "education",
    "projects",
    "skills",
    "languages",
    "certifications",
    "work",
    "awards",
    "hobbies",
  ],
  diamond: ["profile", "objective", "education", "skills", "languages", "work"],
};

export const company = [
  { id: 1, name: "All" },
  { id: 2, name: "Amazon" },
  { id: 3, name: "Commvault" },
  { id: 4, name: "TCS" },
];

export const validate = (grade) => {
  if (!grade) return "Please enter the grade.";
  var arr = grade.split(" ");
  if (arr.length > 2) return "Please enter a valid grade.";
  else if (arr.length == 2) {
    if (arr[1].toLowerCase() == "cgpa") {
      if (isNaN(arr[0])) return "CGPA should be a number.";
      if (parseFloat(arr[0]) > 10.0 || parseFloat(arr[0]) < 0.0)
        return "CGPA must be between 0 - 10.";
      return "Accepted";
    } else return "Please check CGPA spelling.";
  } else {
    if (arr[0].charAt(arr[0].length - 1) === "%") {
      const percent = arr[0].slice(0, arr[0].length - 1);
      if (isNaN(percent)) return "Please enter valid percentage.";
      if (parseFloat(percent) > 100.0 || parseFloat(percent) < 0.0)
        return "Percentage must be between 0 - 100";
      return "Accepted";
    } else return `You're missing '%' character.`;
  }
};

export const trim_json = (resume) => {
  delete resume["_id"];
  delete resume["user"];
  delete resume["public"];
  delete resume["layout"];
  Object.keys(resume).forEach((key) => {
    if (resume[key] instanceof Array) resume[key].forEach((record) => delete record["_id"]);
  });
  return resume;
};

export const formatCurrency = (number) => {
  let x = number?.toString();
  let lastThree = x?.substring(x.length - 3);
  let otherNumbers = x?.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  let res = otherNumbers?.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return res;
};

export const dateInPast = (date) => {
  const today = new Date();

  return today.getTime() < date.getTime();
};

export const encodeCheckIn = (time) => {
  const token = jwt.sign(
    {
      data: time,
    },
    "provast123",
    { expiresIn: 24 * 60 * 60 }
  );
  return token;
};

export const verifyCheckIn = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.checkIn;
  if (!token) {
    const newToken = encodeCheckIn(Date.now());
    localStorage.setItem("checkIn", newToken);
    return true;
  } else {
    const isExpired = jwt.verify(token, "provast123", function (err, decoded) {
      if (err && err.name === "TokenExpiredError") return true;
      else return false;
    });
    if (isExpired) {
      const newToken = encodeCheckIn(Date.now());
      localStorage.setItem("checkIn", newToken);
      return true;
    } else {
      return false;
    }
  }
};

export const createResumeMessages = [
  "Avail all our resume templates for free, offer holds till July 31st 2022",
  "Hey!, How about you create an impressive resume for yourself",
  "Checkout our attractive templates",
  "Create your professional resume today",
];

export const degrees = [
  "None",
  "School / Intermediate",
  "Associate Degree in Administration of Justice",
  "Associate Degree in Animal Management",
  "Associate Degree in Architectural Building Engineering Technology",
  "Associate Degree in Architecture and Career Options",
  "Associate Degree in Art",
  "Associate Degree in Automotive Maintenance Technology",
  "Associate Degree in Aviation Mechanics",
  "Associate Degree in Behavioral Science",
  "Associate Degree in Boat Mechanics",
  "Associate Degree in Boat Repair and Maintenance",
  "Associate Degree in Cabinet Design Technology",
  "Associate Degree in Child Development: Program Summary",
  "Associate Degree in Christian Ministry",
  "Associate Degree in Cosmetology Business",
  "Associate Degree in Digital Media",
  "Associate Degree in Early Childhood Special Education",
  "Associate Degree in Elementary Education",
  "Associate Degree in English",
  "Associate Degree in Environmental Science",
  "Associate Degree in Environmental Studies",
  "Associate Degree in General Psychology",
  "Associate Degree in History and Information",
  "Associate Degree in Interdisciplinary Studies",
  "Associate Degree in International Relations",
  "Associate Degree in Landscape Architecture",
  "Associate Degree in Landscaping Design",
  "Associate Degree in Library Science",
  "Associate Degree in Music",
  "Associate Degree in Wildlife Management",
  "Associate Degree in Education",
  "Associate of Applied Science (AAS) in Accelerated Culinary Arts",
  "Associate of Applied Science (AAS) in Accounting Specialist",
  "Associate of Applied Science (AAS) in Administrative Support",
  "Associate of Applied Science (AAS) in Baking and Pastry",
  "Associate of Applied Science (AAS) in Business Administration",
  "Associate of Applied Science (AAS) in Business Administration - Finance",
  "Associate of Applied Science (AAS) in Business Information Systems",
  "Associate of Applied Science (AAS) in Civil Justice - Law Enforcement",
  "Associate of Applied Science (AAS) in Clinical Medical Assisting",
  "Associate of Applied Science (AAS) in Computer Applications",
  "Associate of Applied Science (AAS) in Computer Electronics",
  "Associate of Applied Science (AAS) in Computer Game Design",
  "Associate of Applied Science (AAS) in Computer Information Systems",
  "Associate of Applied Science (AAS) in Culinary Arts",
  "Associate of Applied Science (AAS) in Digital Media Communications",
  "Associate of Applied Science (AAS) in Digital Photography",
  "Associate of Applied Science (AAS) in Electronic Engineering",
  "Associate of Applied Science (AAS) in Emergency Medical Services",
  "Associate of Applied Science (AAS) in Health Care Management",
  "Associate of Applied Science (AAS) in Health Information Management",
  "Associate of Applied Science (AAS) in Healthcare Administration",
  "Associate of Applied Science (AAS) in Legal Office E-ministration",
  "Associate of Applied Science (AAS) in Telecommunications Technology",
  "Associate of Applied Science (AAS) in Television Production",
  "Associate of Applied Science (AAS) in Visual Communications",
  "Associate of Arts (AA) in Computer Information Systems",
  "Associate of Arts (AA) in Internetworking Technology",
  "Associate of Arts (AA) in Psychology",
  "Associate of Arts (AA) in Interior Architecture and Design",
  "Associate of Biotechnology",
  "Associate of Business Science (ABS) in Individualized Studies",
  "Associate of Early Childhood Education (AECE)",
  "Associate of Occupational Studies (AOS) in Legal Office Administration",
  "Associate of Science (AS) in Computer Information Science",
  "Associate of Science (AS) in Computer Science",
  "Associate of Science (AS) in Corrections, Probation, & Parole",
  "Associate of Science (AS) in Electronics Engineering Technology",
  "Associate of Science (AS) in Interactive & Graphic Art",
  "Associate of Science (AS) in Industrial Maintenance Technology",
  "Associate of Arts and science",
  "Bachelor of Science in Genetic Engineering and Biotechnology",
  "Bachelor of Applied Economics",
  "Bachelor of Architecture",
  "Bachelor of Biochemistry",
  "Bachelor of Biomedical Science",
  "Bachelor of Business Administration",
  "Bachelor of Clinical Science",
  "Bachelor of Commerce",
  "Bachelor of Computer Applications",
  "Bachelor of Community Health",
  "Bachelor of Computer Information Systems",
  "Bachelor of Science in Construction Technology",
  "Bachelor of Criminal Justice",
  "Bachelor of Divinity",
  "Bachelor of Economics",
  "Bachelor of Elementary Education",
  "Bachelor of Education",
  "Bachelor of Engineering",
  "Bachelor of Fine Arts",
  "Bachelor of Laws",
  "Bachelor of Letters",
  "Bachelor of Library & Information Science",
  "Bachelor of Information Systems",
  "Bachelor of Management",
  "Bachelor of Music",
  "Bachelor of Pharmacy",
  "Bachelor of Philosophy",
  "Bachelor of Public Affairs and Policy Management",
  "Bachelor of Public Administration",
  "Bachelor of Social Work",
  "Bachelor of Technology",
  "Bachelor of Accountancy",
  "Bachelor of Arts in American Studies",
  "Bachelor of Arts in American Indian Studies",
  "Bachelor of Arts in Applied Psychology",
  "Bachelor of Arts in Biology",
  "Bachelor of Arts in Anthropology",
  "Bachelor of Arts in Child Advocacy",
  "Bachelor of Arts in Clinical Psychology",
  "Bachelor of Arts in Communication",
  "Bachelor of Arts in Forensic Psychology",
  "Bachelor of Arts in Organizational Psychology",
  "Bachelor of Science in Aerospace Engineering",
  "Bachelor of Science in Accountancy",
  "Bachelor of Science in Actuarial",
  "Bachelor of Science in Agriculture",
  "Bachelor of Science in Applied Economics",
  "Bachelor of Science in Architecture",
  "Bachelor of Science in Architectural Engineering",
  "Bachelor of Science in Athletic Training",
  "Bachelor of Science in Biology",
  "Bachelor of Science in Biomedical Engineering",
  "Bachelor of Science in Bible",
  "Bachelor of Science in Business Administration",
  "Bachelor of Science in Business Administration - Computer Application",
  "Bachelor of Science in Business Administration - Economics",
  "Bachelor of Science in Business and Technology",
  "Bachelor of Science in Chemical Engineering",
  "Bachelor of Science in Chemistry",
  "Bachelor of Science in Civil Engineering",
  "Bachelor of Science in Clinical Laboratory Science",
  "Bachelor of Science in Cognitive Science",
  "Bachelor of Science in Computer Engineering",
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Construction Engineering",
  "Bachelor of Science in Construction Management",
  "Bachelor of Science in Criminal Justice",
  "Bachelor of Science in Criminology",
  "Bachelor of Science in Diagnostic Radiography",
  "Bachelor of Science in Education",
  "Bachelor of Science in Electrical Engineering",
  "Bachelor of Science in Engineering Physics",
  "Bachelor of Science in Engineering Science",
  "Bachelor of Science in Engineering Technology",
  "Bachelor of Science in English Literature",
  "Bachelor of Science in Environmental Engineering",
  "Bachelor of Science in Environmental Science",
  "Bachelor of Science in Environmental Studies",
  "Bachelor of Arts / Science in Finance",
  "Bachelor of Science in Food Science",
  "Bachelor of Science in Foreign Service",
  "Bachelor of Science in Forensic Science",
  "Bachelor of Science in Forestry",
  "Bachelor of Science in History",
  "Bachelor of Science in Hospitality Management",
  "Bachelor of Science in Human Resources Management",
  "Bachelor of Science in Industrial Engineering",
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Information Systems",
  "Bachelor of Science in Integrated Science",
  "Bachelor of Science in International Relations",
  "Bachelor of Science in Journalism",
  "Bachelor of Science in Legal Management",
  "Bachelor of Science in Management",
  "Bachelor of Science in Manufacturing Engineering",
  "Bachelor of Science in Marketing",
  "Bachelor of Science in Mathematics",
  "Bachelor of Science in Mechanical Engineering",
  "Bachelor of Science in Medical Technology",
  "Bachelor of Science in Metallurgical Engineering",
  "Bachelor of Science in Meteorology",
  "Bachelor of Science in Microbiology",
  "Bachelor of Science in Mining Engineering",
  "Bachelor of Science in Molecular Biology",
  "Bachelor of Science in Neuroscience",
  "Bachelor of Science in Nursing",
  "Bachelor of Science in Nutrition science",
  "Bachelor of Science in Software Engineering",
  "Bachelor of Science in Petroleum Engineering",
  "Bachelor of Science in Podiatry",
  "Bachelor of Science in Pharmacology",
  "Bachelor of Science in Pharmacy",
  "Bachelor of Science in Physical Therapy",
  "Bachelor of Science in Physics",
  "Bachelor of Science in Plant Science",
  "Bachelor of Science in Politics",
  "Bachelor of Science in Psychology",
  "Bachelor of Science in Public Safety",
  "Bachelor of Science in Physiology",
  "Bachelor of Science in Quantity Surveying Engineering",
  "Bachelor of Science in Radiologic Technology",
  "Bachelor of Science in Real-Time Interactive Simulation",
  "Bachelor of Science in Religion",
  "Bachelor of Science in Respiratory Therapy",
  "Bachelor of Science in Retail Management",
  "Bachelor of Science in Risk Management and Insurance",
  "Bachelor of Science in Science Education",
  "Bachelor of Science in Sports Management",
  "Bachelor of Science in Systems Engineering",
  "Bachelor of Secondary Education",
  "Bachelor of Physical Education",
  "Bachelor of Music in Jazz Studies",
  "Bachelor of Music in Composition",
  "Bachelor of Music in Performance",
  "Bachelor of Music in Theory",
  "Bachelor of Music in Music Education",
  "Bachelor of Science in Veterinary Technology",
  "Bachelor of Science in military and strategic studies",
  "Master of Accountancy",
  "Master of Accounting and Information Systems",
  "Master of Advanced Study",
  "Master of Agricultural Economics",
  "Master of Applied Economics",
  "Master of Applied Finance",
  "Master of Applied Mathematical Sciences",
  "Master of Applied Psychology",
  "Master of Applied Science",
  "Master of Architecture",
  "Master of Arts",
  "Master of Arts in Archives and Records Management",
  "Master of Arts in Bioethics",
  "Master of Arts in Liberal Studies",
  "Master of Arts in Museum Studies",
  "Master of Arts in Strategic Communication Management",
  "Master of Arts in Teaching",
  "Master of Athletic Training",
  "Master of Bioethics",
  "Master of Bioinformatics",
  "Master of Biotechnology",
  "Master of Business Administration",
  "Master of Business Administration Management of Technology",
  "Master of Business",
  "Master of Business Economics",
  "Master of Business Engineering",
  "Master of Business Informatics",
  "Master of Chemistry",
  "Master of City Planning",
  "Master of Commerce",
  "Master of Community Health",
  "Master of Computational Finance",
  "Master of Computer Applications",
  "Master of Computer Science",
  "Master of Communication",
  "Master of Corporate Finance",
  "Master of Counselling (or Counseling)",
  "Master of Criminal Justice",
  "Master in Creative Technologies",
  "Master of Design",
  "Master of Development Economics",
  "Master of Divinity",
  "Master of Economics",
  "Master of Education",
  "Master of Educational Technology",
  "Master of Engineering",
  "Master of Engineering Management",
  "Master of Enterprise",
  "Master of European Law",
  "Master of Finance",
  "Master of Financial Economics",
  "Master of Financial Engineering",
  "Master of Financial Management",
  "Master of Financial Mathematics",
  "Master of Financial Planning",
  "Master of Fine Arts",
  "Master of Geospatial Science & Technology",
  "Master of Health Administration",
  "Master of Health Science",
  "Master of Humanities",
  "Master of Industrial and Labor Relations",
  "Master of International Affairs",
  "Master of International Business",
  "Master of International Economics",
  "Master of International Public Policy",
  "Master of International Studies",
  "Master of Information",
  "Master of Information Management",
  "Master of Information Systems",
  "Master of Information System Management",
  "Master of Investment Management",
  "Master of International Economics",
  "Master of Islamic Studies",
  "Master of IT",
  "Master of Jurisprudence",
  "Master of Laws",
  "Master of Studies in Law",
  "Master of Landscape Architecture",
  "Master of Letters",
  "Master of Liberal Arts",
  "Master of Library and Information Science",
  "Master of Management",
  "Master of Management of Innovation",
  "Master of Mass Communication and Journalism",
  "Master of Mathematical Finance",
  "Master of Mathematics",
  "Master of Mathematics and Computer Science",
  "Master of Mathematics and Philosophy",
  "Master of Medical Science",
  "Master of Medicine",
  "Master of Military Art and Science",
  "Master of Music",
  "Master of Network and Communications Management",
  "Master of Occupational Therapy",
  "Master of Pharmacy",
  "Master of Philosophy",
  "Master of Physician Assistant Studies",
  "Master of Physics",
  "Master of Political Science",
  "Master of Professional Studies",
  "Master of Psychology",
  "Master of Public Administration",
  "Master of Public Affairs",
  "Master of Public Diplomacy",
  "Master of Public Health",
  "Master of Public Management",
  "Master of Public Policy",
  "Master of Public Relations",
  "Master of Public Service",
  "Master of Quantitative Finance",
  "Master of Rabbinic Studies",
  "Master of Real Estate Development",
  "Master of Religious Education",
  "Master of Research",
  "Master of Sacred Music",
  "Master of Sacred Theology",
  "Master of Science",
  "Master of Science in Applied Cognition and Neuroscience",
  "Master of Science in Athletic Training",
  "Master of Science in Bioinformatics",
  "Master of Science in Business Analytics",
  "Master of Science in Clinical Epidemiology",
  "Master of Science in Computing Research",
  "Master of Science in Cyber Security",
  "Master of Science in Education",
  "Master of Science in Engineering",
  "Master of Science in Development Administration",
  "Master of Science in Finance",
  "Master of Science in Governance & Organizational Sciences",
  "Master of Science in Government Contracts",
  "Master of Science in Health Informatics",
  "Master of Science in Human Resource Development",
  "Master of Science in Information Assurance",
  "Master of Science in Information Systems",
  "Master of Science in Information Technology",
  "Master of Science in Leadership",
  "Master of Science in Management",
  "Master of Science in Nursing",
  "Master of Science in Project Management",
  "Master of Science in Quality Assurance",
  "Master of Science in Risk Management",
  "Master of Science in Supply Chain Management",
  "Master of Science in Teaching",
  "Master of Science in Taxation",
  "Master of Social Science",
  "Master of Social Work",
  "Master of Software Engineering",
  "Master of Statistics",
  "Master of Strategic Studies",
  "Master of Studies",
  "Master of Surgery",
  "Master of Theological Studies",
  "Master of Technology",
  "Master of Theology",
  "Master of Urban Planning",
  "Master of Veterinary Science",
  "Doctor of Arts",
  "Doctor of Audiology",
  "Doctor of Aviation (Av.D.)",
  "Doctor of Business Administration",
  "Doctor of Canon Law",
  "Doctor of Chiropractic",
  "Doctor of Commerce",
  "Doctor of Community Health",
  "Doctor of Dental Surgery",
  "Doctor of Divinity",
  "Doctor of Education (Ed.D.)",
  "Doctor of Engineering",
  "Doctor of Fine Arts",
  "Doctor of Health Administration",
  "Doctor of Health Science",
  "Doctor of Juridical Science; Juris Doctor",
  "Doctor of Law; Legum Doctor",
  "Doctor of Liberal Studies",
  "Doctor of Management",
  "Doctor of Medicine (M.D.)",
  "Doctor of Ministry (D.Min.)",
  "Doctor of Modern Languages",
  "Doctor of Musical Arts",
  "Doctor of Naturopathic Medicine",
  "Doctor of Optometry",
  "Doctor of Osteopathic Medicine",
  "Doctor of Pharmacy",
  "Doctor of Philosophy (Ph.D.)",
  "Doctor of Psychology (Psy.D.)",
  "Doctor of Public Administration",
  "Doctor of Science",
  "Doctor of Theology (Th.D.)",
  "Doctor of Veterinary Medicine",
  "Doctor of Radio oncology",
];

export const role = [
  { id: 1, name: "Internship" },
  { id: 2, name: "Full Time" },
  { id: 3, name: "Internship and Full Time" },
];

export const status = [
  { id: 1, name: "Draft" },
  { id: 2, name: "Public" },
];

export const stipendRange = [
  { id: 1, name: "Not Disclosed" },
  { id: 2, name: "0 to 10k" },
  { id: 3, name: "10 to 20k" },
  { id: 4, name: "20 to 30k" },
  { id: 5, name: "30 to 40k" },
  { id: 6, name: "40 to 50k" },
  { id: 7, name: "Greater than 50k" },
];

export const ctcRange = [
  { id: 1, name: "Not Disclosed" },
  { id: 2, name: "0 to 3LPA" },
  { id: 3, name: "3 to 6LPA" },
  { id: 4, name: "6 to 9LPA" },
  { id: 5, name: "9 to 13LPA" },
  { id: 6, name: "13 to 18LPA" },
  { id: 7, name: "Greater than 18LPA" },
];

export const typeOfPosting = [
  { id: "shortlisted", name: "Shortlisted Students" },
  { id: "onCampus", name: "On-Campus" },
  { id: "offCampus", name: "Off-Campus" },
];

export const typeOfPlacedStatus = [
  { id: "placed", name: "Placed" },
  { id: "unplaced", name: "Unplaced" },
  { id: "everyone", name: "Everyone" },
];

export const jobPostingLocationOptions = [
  { id: 1, name: "Hyderabad" },
  { id: 2, name: "Bengaluru" },
  { id: 3, name: "Chennai" },
  { id: 4, name: "Mumbai" },
  { id: 5, name: "Pune" },
  { id: 6, name: "Delhi" },
  { id: 7, name: "NCR Region" },
  { id: 8, name: "Surat" },
  { id: 9, name: "Kota" },
  { id: 10, name: "Ahmedabad" },
  { id: 11, name: "Chandigarh" },
  { id: 12, name: "Coimbatore" },
  { id: 13, name: "Gurgaon" },
  { id: 14, name: "Goa" },
  { id: 15, name: "Noida" },
];

export const typeOfGrade = [
  { id: 1, name: "Not Applicable" },
  { id: 2, name: "CGPA" },
  { id: 3, name: "Percentage" },
];

export const Percentages = [
  { id: 1, name: 55 },
  { id: 2, name: 60 },
  { id: 3, name: 65 },
  { id: 4, name: 70 },
  { id: 5, name: 75 },
  { id: 6, name: 80 },
  { id: 7, name: 85 },
  { id: 8, name: 90 },
  { id: 9, name: 95 },
  { id: 10, name: 100 },
];

export const CGPAs = [
  { id: 1, name: 6.0 },
  { id: 2, name: 6.5 },
  { id: 3, name: 7.0 },
  { id: 4, name: 7.5 },
  { id: 5, name: 8.0 },
  { id: 6, name: 8.5 },
  { id: 7, name: 9.0 },
  { id: 8, name: 9.5 },
  { id: 9, name: 10.0 },
];
