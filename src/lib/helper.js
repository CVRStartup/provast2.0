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
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import jwt from "jsonwebtoken";
import * as XLSX from "xlsx";

export const handleJobResponse = async (
  job,
  user,
  op,
  roles,
  questionnaire,
  resume,
  personal,
  education
) => {
  if (!user) return;
  let data = null;
  if (job.typeOfPost === "Shortlisted Students") {
    let newstatus = job.eligible.filter((x) => x.email === user?.email)[0];
    if (!newstatus) return;

    data = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs/status?id=${job._id}&email=${user?.email}`,
      {
        newstatus: {
          ...newstatus,
          resume,
          personal,
          education,
          status: {
            applied: op === "Apply",
            roles: roles,
            updatedAt: new Date(),
            answers: questionnaire ? [...questionnaire] : [],
          },
        },
      }
    );
  } else {
    data = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/jobs/status?id=${job._id}&email=${user?.email}`,
      {
        newstatus: {
          email: user?.email,
          resume,
          personal,
          education,
          status: {
            applied: op === "Apply",
            roles: roles,
            updatedAt: new Date(),
            answers: questionnaire ? [...questionnaire] : [],
          },
        },
      }
    );
  }
  if (data.data.message == "Job Updated") {
    toast.success(op === "Apply" ? "Job Applied" : "Captured response", {
      toastId: "Job Updated",
    });
  } else {
    toast.error(data.data.message, { toastId: data.data.message });
  }
};

const fileType = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const handleFile = (e, setData, setError) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setError(null);
        if (e.target.result !== null) {
          const workbook = XLSX.read(e.target.result, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          const res = data.map((x) => {
            return {
              email: x["Email"] ? x["Email"] : "N/A",
              status: {
                applied: null,
                roles: [],
              },
            };
          });

          setData(res);
        } else {
          setData([]);
        }
      };
    } else {
      setError("Please select only excel file types");
    }
  } else {
    console.log("please select your file");
  }
};

export const binarySearch = (arr, ele) => {
  let st = 0;
  let en = arr.length - 1;
  while (st <= en) {
    let mid = Math.floor((st + en) / 2);
    if (arr[mid] == ele) return mid;
    else if (arr[mid] > ele) st = mid + 1;
    else en = mid - 1;
  }
};

export const applyFilters = (filter, jobs, setJobs) => {
  if (!jobs) return;
  let updatedJobs = jobs;
  updatedJobs = updatedJobs.filter((job) => {
    if (Number(job.ctc) != NaN) {
      if (job.ctc < filter.minimum_ctc_filter) return false;
    }
    if (Number(job.stipend) != NaN) {
      if (job.stipend < filter.minimum_salary_filter) return false;
    }
    let currDate = new Date();
    currDate = currDate.toISOString();
    let active = job.from <= currDate && job.to >= currDate;
    if (job.from != null && job.to != null) {
      if (filter.allow_active == false) {
        if (active) return false;
      }
      if (filter.allow_inactive == false) {
        if (!active) return false;
      }
    } else {
      if (filter.allow_inactive == false) {
        return false;
      }
    }
    if (filter.role.i == false) {
      if (job.role == "Internship") return false;
    }
    if (filter.role.f == false) {
      if (job.role == "Full Time") return false;
    }
    if (filter.role.iandf == false) {
      if (job.role == "Internship and Full Time") return false;
    }
    let foundInDesig = job.designation.roles.some((ele) =>
      ele.toLowerCase().includes(filter.keyword.toLowerCase())
    );
    let foundInCompany = job.company.toLowerCase().includes(filter.keyword.toLowerCase());
    if (!foundInCompany && !foundInDesig) return false;
    return true;
  });

  if (filter.sort_by == "created_at") {
    updatedJobs.sort((a, b) => ((a.from ?? "0") < (b.from ?? "0") ? -1 : 1));
  } else if (filter.sort_by == "ending_at") {
    updatedJobs.sort((a, b) => ((a.to ?? "0") < (b.to ?? "0") ? -1 : 1));
  } else if (filter.sort_by == "stipend") {
    updatedJobs.sort((a, b) => ((a.stipend ?? 0) < (b.stipend ?? 0) ? -1 : 1));
  } else if (filter.sort_by == "alphabetical") {
    updatedJobs.sort((a, b) => {
      a.company.toLowerCase() < b.company.toLowerCase() ? -1 : 1;
    });
  }

  if (filter.sort_order == "desc") {
    updatedJobs.reverse();
  }
  setJobs([...updatedJobs]);
};

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
    const response = job.eligible.filter((x) => x.rollnumber === userDetails.rollNumber.value);
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
export const genders = [
  { name: "Male", code: "Male" },
  { name: "Female", code: "Female" },
  { name: "Other", code: "Other" },
];
export const btechBranches = [
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
export const mbaBranches = [
  { name: "Artificial intelligence - Data Science" },
  { name: "Banking - Finance" },
  { name: "Business Analytics" },
  { name: "Digital Marketing" },
  { name: "Finance - Business Analytics" },
  { name: "Finance - Human Resource" },
  { name: "Finance - Human Resources / Organisational B.E.haviour" },
  { name: "Finance - Marketing" },
  { name: "Finance - Operation" },
  { name: "Finance - Human Resources" },
  { name: "Hospital Management" },
  { name: "Human Resource - Business Analytics" },
  { name: "Human Resource - Marketing" },
  { name: "Human Resource - Operations" },
  { name: "Human Resources / Organisational B.E.haviour - Business Analytics" },
  { name: "Human Resources/ Organisational B.E.haviour - Strategy" },
  { name: "Marketing  - Human Resources / Organisational B.E.haviour" },
  { name: "Marketing - Business Analytics" },
  { name: "Marketing - Human Resource" },
  { name: "Marketing - Operations" },
  { name: "Marketing - Strategy" },
  { name: "Operation - Business Analytics" },
  { name: "Waste Management and Social Entrepreneurship" },
];

export const mbaSrmBranches = [
  {
    name: "Artificial Intelligence and Data Science",
    code: "Artificial Intelligence and Data Science",
  },
  {
    name: "Banking and Financial Services",
    code: "Banking and Financial Services",
  },
  {
    name: "Business Analytics",
    code: "Business Analytics",
  },
  {
    name: "Digital Marketing",
    code: "Digital Marketing",
  },
  {
    name: "Finance",
    code: "Finance",
  },
  {
    name: "Hospital Management",
    code: "Hospital Management",
  },
  {
    name: "Human Resources",
    code: "Human Resources",
  },
  {
    name: "Management Information Systems",
    code: "Management Information Systems",
  },
  {
    name: "Marketing",
    code: "Marketing",
  },
  {
    name: "Operations",
    code: "Operations",
  },
  {
    name: "Strategy",
    code: "Strategy",
  },
];

export const mtechBranches = [
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

export const degreeBranches = [
  {
    name: "Architecture",
    code: "Architecture",
  },
  {
    name: "Arts",
    code: "Arts",
  },
  {
    name: "Law",
    code: "Law",
  },
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

export const typeOfEducationGrade = [
  { id: 1, name: "CGPA" },
  { id: 2, name: "Percentage" },
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

export const typeOfEducation = [
  { name: "Part Time" },
  { name: "Full Time" },
  { name: "Correspondence" },
  { name: "Others" },
];

export const createResumeMessages = [
  "Avail all our resume templates for free, offer holds till July 31st 2022",
  "Hey!, How about you create an impressive resume for yourself",
  "Checkout our attractive templates",
  "Create your professional resume today",
];

export const academicDegrees = [
  { name: "Class Xth" },
  { name: "Class XIIth" },
  { name: "MBA" },
  { name: "B.Tech" },
  { name: "M.Tech" },
  { name: "Degree" },
];

export const degrees = [
  { name: "Associate Degree in Administration of Justice" },
  { name: "Associate Degree in Animal Management" },
  { name: "Associate Degree in Architectural Building Engineering Technology" },
  { name: "Associate Degree in Architecture and Career Options" },
  { name: "Associate Degree in Art" },
  { name: "Associate Degree in Automotive Maintenance Technology" },
  { name: "Associate Degree in Aviation Mechanics" },
  { name: "Associate Degree in Behavioral Science" },
  { name: "Associate Degree in Boat Mechanics" },
  { name: "Associate Degree in Boat Repair and Maintenance" },
  { name: "Associate Degree in Cabinet Design Technology" },
  { name: "Associate Degree in Child Development: Program Summary" },
  { name: "Associate Degree in Christian Ministry" },
  { name: "Associate Degree in Cosmetology Business" },
  { name: "Associate Degree in Digital Media" },
  { name: "Associate Degree in Early Childhood Special Education" },
  { name: "Associate Degree in Elementary Education" },
  { name: "Associate Degree in English" },
  { name: "Associate Degree in Environmental Science" },
  { name: "Associate Degree in Environmental Studies" },
  { name: "Associate Degree in General Psychology" },
  { name: "Associate Degree in History and Information" },
  { name: "Associate Degree in Interdisciplinary Studies" },
  { name: "Associate Degree in International Relations" },
  { name: "Associate Degree in Landscape Architecture" },
  { name: "Associate Degree in Landscaping Design" },
  { name: "Associate Degree in Library Science" },
  { name: "Associate Degree in Music" },
  { name: "Associate Degree in Wildlife Management" },
  { name: "Associate Degree in Education" },
  { name: "Associate of Applied Science (AAS) in Accelerated Culinary Arts" },
  { name: "Associate of Applied Science (AAS) in Accounting Specialist" },
  { name: "Associate of Applied Science (AAS) in Administrative Support" },
  { name: "Associate of Applied Science (AAS) in Baking and Pastry" },
  { name: "Associate of Applied Science (AAS) in Business Administration" },
  {
    name: "Associate of Applied Science (AAS) in Business Administration - Finance",
  },
  {
    name: "Associate of Applied Science (AAS) in Business Information Systems",
  },
  {
    name: "Associate of Applied Science (AAS) in Civil Justice - Law Enforcement",
  },
  { name: "Associate of Applied Science (AAS) in Clinical Medical Assisting" },
  { name: "Associate of Applied Science (AAS) in Computer Applications" },
  { name: "Associate of Applied Science (AAS) in Computer Electronics" },
  { name: "Associate of Applied Science (AAS) in Computer Game Design" },
  {
    name: "Associate of Applied Science (AAS) in Computer Information Systems",
  },
  { name: "Associate of Applied Science (AAS) in Culinary Arts" },
  {
    name: "Associate of Applied Science (AAS) in Digital Media Communications",
  },
  { name: "Associate of Applied Science (AAS) in Digital Photography" },
  { name: "Associate of Applied Science (AAS) in Electronic Engineering" },
  { name: "Associate of Applied Science (AAS) in Emergency Medical Services" },
  { name: "Associate of Applied Science (AAS) in Health Care Management" },
  {
    name: "Associate of Applied Science (AAS) in Health Information Management",
  },
  { name: "Associate of Applied Science (AAS) in Healthcare Administration" },
  { name: "Associate of Applied Science (AAS) in Legal Office E-ministration" },
  {
    name: "Associate of Applied Science (AAS) in Telecommunications Technology",
  },
  { name: "Associate of Applied Science (AAS) in Television Production" },
  { name: "Associate of Applied Science (AAS) in Visual Communications" },
  { name: "Associate of Arts (AA) in Computer Information Systems" },
  { name: "Associate of Arts (AA) in Internetworking Technology" },
  { name: "Associate of Arts (AA) in Psychology" },
  { name: "Associate of Arts (AA) in Interior Architecture and Design" },
  { name: "Associate of Biotechnology" },
  { name: "Associate of Business Science (ABS) in Individualized Studies" },
  { name: "Associate of Early Childhood Education (AECE)" },
  {
    name: "Associate of Occupational Studies (AOS) in Legal Office Administration",
  },
  { name: "Associate of Science (AS) in Computer Information Science" },
  { name: "Associate of Science (AS) in Computer Science" },
  { name: "Associate of Science (AS) in Corrections, Probation, & Parole" },
  { name: "Associate of Science (AS) in Electronics Engineering Technology" },
  { name: "Associate of Science (AS) in Interactive & Graphic Art" },
  { name: "Associate of Science (AS) in Industrial Maintenance Technology" },
  { name: "Associate of Arts and science" },
  { name: "Bachelor of Science in Genetic Engineering and Biotechnology" },
  { name: "Bachelor of Applied Economics" },
  { name: "Bachelor of Architecture" },
  { name: "Bachelor of Biochemistry" },
  { name: "Bachelor of Biomedical Science" },
  { name: "Bachelor of Business Administration" },
  { name: "Bachelor of Clinical Science" },
  { name: "Bachelor of Commerce" },
  { name: "Bachelor of Computer Applications" },
  { name: "Bachelor of Community Health" },
  { name: "Bachelor of Computer Information Systems" },
  { name: "Bachelor of Science in Construction Technology" },
  { name: "Bachelor of Criminal Justice" },
  { name: "Bachelor of Divinity" },
  { name: "Bachelor of Economics" },
  { name: "Bachelor of Elementary Education" },
  { name: "Bachelor of Education" },
  { name: "Bachelor of Engineering" },
  { name: "Bachelor of Fine Arts" },
  { name: "Bachelor of Laws" },
  { name: "Bachelor of Letters" },
  { name: "Bachelor of Library & Information Science" },
  { name: "Bachelor of Information Systems" },
  { name: "Bachelor of Management" },
  { name: "Bachelor of Music" },
  { name: "Bachelor of Pharmacy" },
  { name: "Bachelor of Philosophy" },
  { name: "Bachelor of Public Affairs and Policy Management" },
  { name: "Bachelor of Public Administration" },
  { name: "Bachelor of Social Work" },
  { name: "Bachelor of Technology" },
  { name: "Bachelor of Accountancy" },
  { name: "Bachelor of Arts in American Studies" },
  { name: "Bachelor of Arts in American Indian Studies" },
  { name: "Bachelor of Arts in Applied Psychology" },
  { name: "Bachelor of Arts in Biology" },
  { name: "Bachelor of Arts in Anthropology" },
  { name: "Bachelor of Arts in Child Advocacy" },
  { name: "Bachelor of Arts in Clinical Psychology" },
  { name: "Bachelor of Arts in Communication" },
  { name: "Bachelor of Arts in Forensic Psychology" },
  { name: "Bachelor of Arts in Organizational Psychology" },
  { name: "Bachelor of Science in Aerospace Engineering" },
  { name: "Bachelor of Science in Accountancy" },
  { name: "Bachelor of Science in Actuarial" },
  { name: "Bachelor of Science in Agriculture" },
  { name: "Bachelor of Science in Applied Economics" },
  { name: "Bachelor of Science in Architecture" },
  { name: "Bachelor of Science in Architectural Engineering" },
  { name: "Bachelor of Science in Athletic Training" },
  { name: "Bachelor of Science in Biology" },
  { name: "Bachelor of Science in Biomedical Engineering" },
  { name: "Bachelor of Science in Bible" },
  { name: "Bachelor of Science in Business Administration" },
  {
    name: "Bachelor of Science in Business Administration - Computer Application",
  },
  { name: "Bachelor of Science in Business Administration - Economics" },
  { name: "Bachelor of Science in Business and Technology" },
  { name: "Bachelor of Science in Chemical Engineering" },
  { name: "Bachelor of Science in Chemistry" },
  { name: "Bachelor of Science in Civil Engineering" },
  { name: "Bachelor of Science in Clinical Laboratory Science" },
  { name: "Bachelor of Science in Cognitive Science" },
  { name: "Bachelor of Science in Computer Engineering" },
  { name: "Bachelor of Science in Computer Science" },
  { name: "Bachelor of Science in Construction Engineering" },
  { name: "Bachelor of Science in Construction Management" },
  { name: "Bachelor of Science in Criminal Justice" },
  { name: "Bachelor of Science in Criminology" },
  { name: "Bachelor of Science in Diagnostic Radiography" },
  { name: "Bachelor of Science in Education" },
  { name: "Bachelor of Science in Electrical Engineering" },
  { name: "Bachelor of Science in Engineering Physics" },
  { name: "Bachelor of Science in Engineering Science" },
  { name: "Bachelor of Science in Engineering Technology" },
  { name: "Bachelor of Science in English Literature" },
  { name: "Bachelor of Science in Environmental Engineering" },
  { name: "Bachelor of Science in Environmental Science" },
  { name: "Bachelor of Science in Environmental Studies" },
  { name: "Bachelor of Arts / Science in Finance" },
  { name: "Bachelor of Science in Food Science" },
  { name: "Bachelor of Science in Foreign Service" },
  { name: "Bachelor of Science in Forensic Science" },
  { name: "Bachelor of Science in Forestry" },
  { name: "Bachelor of Science in History" },
  { name: "Bachelor of Science in Hospitality Management" },
  { name: "Bachelor of Science in Human Resources Management" },
  { name: "Bachelor of Science in Industrial Engineering" },
  { name: "Bachelor of Science in Information Technology" },
  { name: "Bachelor of Science in Information Systems" },
  { name: "Bachelor of Science in Integrated Science" },
  { name: "Bachelor of Science in International Relations" },
  { name: "Bachelor of Science in Journalism" },
  { name: "Bachelor of Science in Legal Management" },
  { name: "Bachelor of Science in Management" },
  { name: "Bachelor of Science in Manufacturing Engineering" },
  { name: "Bachelor of Science in Marketing" },
  { name: "Bachelor of Science in Mathematics" },
  { name: "Bachelor of Science in Mechanical Engineering" },
  { name: "Bachelor of Science in Medical Technology" },
  { name: "Bachelor of Science in Metallurgical Engineering" },
  { name: "Bachelor of Science in Meteorology" },
  { name: "Bachelor of Science in Microbiology" },
  { name: "Bachelor of Science in Mining Engineering" },
  { name: "Bachelor of Science in Molecular Biology" },
  { name: "Bachelor of Science in Neuroscience" },
  { name: "Bachelor of Science in Nursing" },
  { name: "Bachelor of Science in Nutrition science" },
  { name: "Bachelor of Science in Software Engineering" },
  { name: "Bachelor of Science in Petroleum Engineering" },
  { name: "Bachelor of Science in Podiatry" },
  { name: "Bachelor of Science in Pharmacology" },
  { name: "Bachelor of Science in Pharmacy" },
  { name: "Bachelor of Science in Physical Therapy" },
  { name: "Bachelor of Science in Physics" },
  { name: "Bachelor of Science in Plant Science" },
  { name: "Bachelor of Science in Politics" },
  { name: "Bachelor of Science in Psychology" },
  { name: "Bachelor of Science in Public Safety" },
  { name: "Bachelor of Science in Physiology" },
  { name: "Bachelor of Science in Quantity Surveying Engineering" },
  { name: "Bachelor of Science in Radiologic Technology" },
  { name: "Bachelor of Science in Real-Time Interactive Simulation" },
  { name: "Bachelor of Science in Religion" },
  { name: "Bachelor of Science in Respiratory Therapy" },
  { name: "Bachelor of Science in Retail Management" },
  { name: "Bachelor of Science in Risk Management and Insurance" },
  { name: "Bachelor of Science in Science Education" },
  { name: "Bachelor of Science in Sports Management" },
  { name: "Bachelor of Science in Systems Engineering" },
  { name: "Bachelor of Secondary Education" },
  { name: "Bachelor of Physical Education" },
  { name: "Bachelor of Music in Jazz Studies" },
  { name: "Bachelor of Music in Composition" },
  { name: "Bachelor of Music in Performance" },
  { name: "Bachelor of Music in Theory" },
  { name: "Bachelor of Music in Music Education" },
  { name: "Bachelor of Science in Veterinary Technology" },
  { name: "Bachelor of Science in military and strategic studies" },
  { name: "Master of Accountancy" },
  { name: "Master of Accounting and Information Systems" },
  { name: "Master of Advanced Study" },
  { name: "Master of Agricultural Economics" },
  { name: "Master of Applied Economics" },
  { name: "Master of Applied Finance" },
  { name: "Master of Applied Mathematical Sciences" },
  { name: "Master of Applied Psychology" },
  { name: "Master of Applied Science" },
  { name: "Master of Architecture" },
  { name: "Master of Arts" },
  { name: "Master of Arts in Archives and Records Management" },
  { name: "Master of Arts in Bioethics" },
  { name: "Master of Arts in Liberal Studies" },
  { name: "Master of Arts in Museum Studies" },
  { name: "Master of Arts in Strategic Communication Management" },
  { name: "Master of Arts in Teaching" },
  { name: "Master of Athletic Training" },
  { name: "Master of Bioethics" },
  { name: "Master of Bioinformatics" },
  { name: "Master of Biotechnology" },
  { name: "Master of Business Administration" },
  { name: "Master of Business Administration Management of Technology" },
  { name: "Master of Business" },
  { name: "Master of Business Economics" },
  { name: "Master of Business Engineering" },
  { name: "Master of Business Informatics" },
  { name: "Master of Chemistry" },
  { name: "Master of City Planning" },
  { name: "Master of Commerce" },
  { name: "Master of Community Health" },
  { name: "Master of Computational Finance" },
  { name: "Master of Computer Applications" },
  { name: "Master of Computer Science" },
  { name: "Master of Communication" },
  { name: "Master of Corporate Finance" },
  { name: "Master of Counselling (or Counseling)" },
  { name: "Master of Criminal Justice" },
  { name: "Master in Creative Technologies" },
  { name: "Master of Design" },
  { name: "Master of Development Economics" },
  { name: "Master of Divinity" },
  { name: "Master of Economics" },
  { name: "Master of Education" },
  { name: "Master of Educational Technology" },
  { name: "Master of Engineering" },
  { name: "Master of Engineering Management" },
  { name: "Master of Enterprise" },
  { name: "Master of European Law" },
  { name: "Master of Finance" },
  { name: "Master of Financial Economics" },
  { name: "Master of Financial Engineering" },
  { name: "Master of Financial Management" },
  { name: "Master of Financial Mathematics" },
  { name: "Master of Financial Planning" },
  { name: "Master of Fine Arts" },
  { name: "Master of Geospatial Science & Technology" },
  { name: "Master of Health Administration" },
  { name: "Master of Health Science" },
  { name: "Master of Humanities" },
  { name: "Master of Industrial and Labor Relations" },
  { name: "Master of International Affairs" },
  { name: "Master of International Business" },
  { name: "Master of International Economics" },
  { name: "Master of International Public Policy" },
  { name: "Master of International Studies" },
  { name: "Master of Information" },
  { name: "Master of Information Management" },
  { name: "Master of Information Systems" },
  { name: "Master of Information System Management" },
  { name: "Master of Investment Management" },
  { name: "Master of International Economics" },
  { name: "Master of Islamic Studies" },
  { name: "Master of IT" },
  { name: "Master of Jurisprudence" },
  { name: "Master of Laws" },
  { name: "Master of Studies in Law" },
  { name: "Master of Landscape Architecture" },
  { name: "Master of Letters" },
  { name: "Master of Liberal Arts" },
  { name: "Master of Library and Information Science" },
  { name: "Master of Management" },
  { name: "Master of Management of Innovation" },
  { name: "Master of Mass Communication and Journalism" },
  { name: "Master of Mathematical Finance" },
  { name: "Master of Mathematics" },
  { name: "Master of Mathematics and Computer Science" },
  { name: "Master of Mathematics and Philosophy" },
  { name: "Master of Medical Science" },
  { name: "Master of Medicine" },
  { name: "Master of Military Art and Science" },
  { name: "Master of Music" },
  { name: "Master of Network and Communications Management" },
  { name: "Master of Occupational Therapy" },
  { name: "Master of Pharmacy" },
  { name: "Master of Philosophy" },
  { name: "Master of Physician Assistant Studies" },
  { name: "Master of Physics" },
  { name: "Master of Political Science" },
  { name: "Master of Professional Studies" },
  { name: "Master of Psychology" },
  { name: "Master of Public Administration" },
  { name: "Master of Public Affairs" },
  { name: "Master of Public Diplomacy" },
  { name: "Master of Public Health" },
  { name: "Master of Public Management" },
  { name: "Master of Public Policy" },
  { name: "Master of Public Relations" },
  { name: "Master of Public Service" },
  { name: "Master of Quantitative Finance" },
  { name: "Master of Rabbinic Studies" },
  { name: "Master of Real Estate Development" },
  { name: "Master of Religious Education" },
  { name: "Master of Research" },
  { name: "Master of Sacred Music" },
  { name: "Master of Sacred Theology" },
  { name: "Master of Science" },
  { name: "Master of Science in Applied Cognition and Neuroscience" },
  { name: "Master of Science in Athletic Training" },
  { name: "Master of Science in Bioinformatics" },
  { name: "Master of Science in Business Analytics" },
  { name: "Master of Science in Clinical Epidemiology" },
  { name: "Master of Science in Computing Research" },
  { name: "Master of Science in Cyber Security" },
  { name: "Master of Science in Education" },
  { name: "Master of Science in Engineering" },
  { name: "Master of Science in Development Administration" },
  { name: "Master of Science in Finance" },
  { name: "Master of Science in Governance & Organizational Sciences" },
  { name: "Master of Science in Government Contracts" },
  { name: "Master of Science in Health Informatics" },
  { name: "Master of Science in Human Resource Development" },
  { name: "Master of Science in Information Assurance" },
  { name: "Master of Science in Information Systems" },
  { name: "Master of Science in Information Technology" },
  { name: "Master of Science in Leadership" },
  { name: "Master of Science in Management" },
  { name: "Master of Science in Nursing" },
  { name: "Master of Science in Project Management" },
  { name: "Master of Science in Quality Assurance" },
  { name: "Master of Science in Risk Management" },
  { name: "Master of Science in Supply Chain Management" },
  { name: "Master of Science in Teaching" },
  { name: "Master of Science in Taxation" },
  { name: "Master of Social Science" },
  { name: "Master of Social Work" },
  { name: "Master of Software Engineering" },
  { name: "Master of Statistics" },
  { name: "Master of Strategic Studies" },
  { name: "Master of Studies" },
  { name: "Master of Surgery" },
  { name: "Master of Theological Studies" },
  { name: "Master of Technology" },
  { name: "Master of Theology" },
  { name: "Master of Urban Planning" },
  { name: "Master of Veterinary Science" },
  { name: "Doctor of Arts" },
  { name: "Doctor of Audiology" },
  { name: "Doctor of Aviation (Av.D.)" },
  { name: "Doctor of Business Administration" },
  { name: "Doctor of Canon Law" },
  { name: "Doctor of Chiropractic" },
  { name: "Doctor of Commerce" },
  { name: "Doctor of Community Health" },
  { name: "Doctor of Dental Surgery" },
  { name: "Doctor of Divinity" },
  { name: "Doctor of Education (Ed.D.)" },
  { name: "Doctor of Engineering" },
  { name: "Doctor of Fine Arts" },
  { name: "Doctor of Health Administration" },
  { name: "Doctor of Health Science" },
  { name: "Doctor of Juridical Science; Juris Doctor" },
  { name: "Doctor of Law; Legum Doctor" },
  { name: "Doctor of Liberal Studies" },
  { name: "Doctor of Management" },
  { name: "Doctor of Medicine (M.D.)" },
  { name: "Doctor of Ministry (D.Min.)" },
  { name: "Doctor of Modern Languages" },
  { name: "Doctor of Musical Arts" },
  { name: "Doctor of Naturopathic Medicine" },
  { name: "Doctor of Optometry" },
  { name: "Doctor of Osteopathic Medicine" },
  { name: "Doctor of Pharmacy" },
  { name: "Doctor of Philosophy (Ph.D.)" },
  { name: "Doctor of Psychology (Psy.D.)" },
  { name: "Doctor of Public Administration" },
  { name: "Doctor of Science" },
  { name: "Doctor of Theology (Th.D.)" },
  { name: "Doctor of Veterinary Medicine" },
  { name: "Doctor of Radio oncology" },
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
  { id: "criteria", name: "Criteria" },
];

export const typeOfJobProgram = [
  { id: "btech", name: "B.Tech" },
  { id: "mba", name: "MBA" },
  { id: "mtech", name: "M.Tech" },
  { id: "degree", name: "Degree" },
];

export const typeOfPlacedStatus = [
  { id: "placed", name: "Placed" },
  { id: "unplaced", name: "Unplaced" },
  { id: "everyone", name: "Everyone" },
];

export const jobPostingLocationOptions = [
  { id: 1, name: "Bengaluru" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Chennai" },
  { id: 4, name: "Hyderabad" },
  { id: 5, name: "Mumbai" },
  { id: 6, name: "Pune" },
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

export const jobPostingCampuses = [
  { id: 1, name: "Kattankulathur" },
  { id: 2, name: "Ramapuram" },
  { id: 3, name: "Modi Nagar" },
  { id: 4, name: "Vadapalani" },
  { id: 5, name: "NCR" },
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
