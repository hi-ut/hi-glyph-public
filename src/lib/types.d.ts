export interface GlyphDataCreate {
  name: string;
  related?: string;
  data?: string;
  creatorId?: string;
  publicAccess?: boolean;
  refImgUrls?: string[];
}

interface GlyphDataUpdate {
  name: string;
  related?: string;
  data?: string;
  publicAccess?: boolean;
  refImgUrls?: string[];
}