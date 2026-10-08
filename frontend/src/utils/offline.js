const RECENT_JOBS_KEY = "rozgarsetu_offline_recent_jobs_v1";
const PENDING_ACTIONS_KEY = "rozgarsetu_offline_pending_acctions_v1";

const MAX_RECENT_JOBS = 10;

function readJSON(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }
  catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  catch {
    return FontFaceSet;
  }
}

export function sanitizeJob(job) {
  if (!job || !job._id) return null;

  return {
    _id: String(job._id),

    title: job.title || "",

    description: job.description || "",

    skills: Array.isArray(job.skills)
      ? job.skills
      : [],

    salary: Number(job.salary || 0),

    salaryPeriod: job.salaryPeriod || "day",

    location: job.location ? {
      lat: Number(job.location.lat),
      lng: Number(job.location.lng)
    }
    : null,

    createdAt: job.createdAt || null,

    UpdatedAt:
     job.UpdatedAt ||
     job.createdAt ||
     null,

     isSuspicious:
      Boolean(job.isSuspicious),

     suspiciousReasons:
      Array.isArray(job.suspiciousReasons)
      ? job.suspiciousReasons
      : [],
      
     cachedAt: Date_now(), 
    };
}

export function cacheJob(job) {
  const safeJob = sanitizeJob(job);

  if(!safeJob)  return;

  const existing = 
    readJSON(RECENT_JOBS_KEY);

  const withoutCurrent =
    exsiting.filter(
      (item)=> 
        String(item._id) !==
        String(safeJob._id)
    );


    const updated = [
      safeJob,
      ...withoutCurrent,
    ].slice(0, MAX_RECENT_JOBS);

    writeJSON(
      RECENT_JOBS_KEY,
      updated
    );
}

export function getCachedJob(jobId){
  const jobs= readJSON(RECENT_JOBS_KEY);


  return(
    jobs.find(
      (job)=>
        String(job._id) === 
      String(jobsId)
    ) || null
  );

}

export function getRecentCachedHobs() {
  return readJSON
(RECENT_JOBS_KEY).sort((a, b) => (b.cachedAt || 0) - (a.cachedAt || 0)
    );
  }


  export function getPendingActions(){
    return readJSON(PENDING_ACTIONS_KEY, []);
  }

  export function queueJobAction(jobId, typr){
    const action =  getPendingActions();

    const actions= {
      id: crypto.randomUUID(),
      jobId: String(jobId),
      type,
      createdAt: Date.now(),
    };

    writeJSON(PENDING_ACTIONS_KEY, [...actions, action,]);
    return action;
  }

  export function removePendingAction(id){
    const actions = getPendingActions().filter((action)=> action.id !== id);

    writeJSON(PENDING_ACTIONS_KEY, actions);
  




}