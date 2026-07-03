export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  beginDate: string;
  endDate: string;
  description: string;
}

export interface UserInfoResponse {
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio: string;
  location: string;
  university: string;
  department: string;
  skills: string[];
  experiences: ExperienceItem[];
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
}

export function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return "https://" + url;
}
