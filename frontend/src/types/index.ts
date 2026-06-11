export interface Project {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  coverImage: string;
  screenshots: string[];
  githubLink?: string;
  liveDemo?: string;
  challenges?: string;
  learnings?: string;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export interface Certificate {
  _id: string;
  name: string;
  issuingOrganization: string;
  thumbnail: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  company?: string;
  jobRole?: string;
  subject: string;
  content: string;
  isRead: boolean;
  isResponded: boolean;
  createdAt: string;
}

export interface Notification {
  _id: string;
  type: 'CONTACT' | 'INQUIRY';
  messageId?: Message;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
