interface RequestOptions {
  [key: string]: string | number;
}

export interface Client {
  photos: {
    search(parameters: RequestOptions, callback: Function): void;
    curated(parameters: RequestOptions, callback: Function): void;
    detail(id: string, callback: Function): void;
  };
  videos: {
    search(parameters: RequestOptions, callback: Function): void;
    popular(parameters: RequestOptions, callback: Function): void;
    detail(id: string, callback: Function): void;
  };
  collections: {
    featured(parameters: RequestOptions, callback: Function): void;
    detail(id: string, parameters: RequestOptions, callback: Function): void;
  };
}


export interface RootObject {
  next_page:     string;
  page:          number;
  per_page:      number;
  photos:        Photo[];
  total_results: number;
 }
 
 export interface Photo {
  alt:              string;
  avg_color:        string;
  height:           number;
  id:               number;
  liked:            boolean;
  photographer:     string;
  photographer_id:  number;
  photographer_url: string;
  src:              Src;
  url:              string;
  width:            number;
 }
 
 export interface Src {
  landscape: string;
  large:     string;
  large2x:   string;
  medium:    string;
  original:  string;
  portrait:  string;
  small:     string;
  tiny:      string;
 }
 
 export interface RootVideoObject {
  next_page:     string;
  page:          number;
  per_page:      number;
  total_results: number;
  url:           string;
  videos:        Video[];
 }
 
 export interface Video {
  avg_color:      null;
  duration:       number;
  full_res:       null;
  height:         number;
  id:             number;
  image:          string;
  tags:           any[];
  url:            string;
  user:           User;
  video_files:    VideoFile[];
  video_pictures: VideoPicture[];
  width:          number;
 }
 
 export interface User {
  id:   number;
  name: string;
  url:  string;
 }
 
 export interface VideoFile {
  file_type: FileType;
  fps:       number | null;
  height:    number;
  id:        number;
  link:      string;
  quality:   Quality;
  width:     number;
 }
 
 export enum FileType {
  VideoMp4 = "video/mp4",
 }
 
 export enum Quality {
  HD = "hd",
  SD = "sd",
 }
 
 export interface VideoPicture {
  id:      number;
  nr:      number;
  picture: string;
 }
 

 export interface RootCollectionObject {
  collections:   Collection[];
  next_page:     string;
  page:          number;
  per_page:      number;
  total_results: number;
 }
 
 export interface Collection {
  description:  null | string;
  id:           string;
  media_count:  number;
  photos_count: number;
  private:      boolean;
  title:        string;
  videos_count: number;
 }

 export interface CollectionMedia {
  id:            string;
  media:         Media[];
  page:          number;
  per_page:      number;
  total_results: number;
 }
 
 export interface Media {
  alt?:              string;
  avg_color?:        string;
  duration?:         number;
  full_res?:         null;
  height:            number;
  id:                number;
  image?:            string;
  liked?:            boolean;
  photographer?:     string;
  photographer_id?:  number;
  photographer_url?: string;
  src?:              Src;
  tags?:             any[];
  type:              Type;
  url:               string;
  user?:             User;
  video_files?:      VideoFile[];
  video_pictures?:   VideoPicture[];
  width:             number;
 }
 
 export interface Src {
  landscape: string;
  large:     string;
  large2x:   string;
  medium:    string;
  original:  string;
  portrait:  string;
  small:     string;
  tiny:      string;
 }
 
 export enum Type {
  Photo = "Photo",
  Video = "Video",
 }
 
 export interface User {
  id:   number;
  name: string;
  url:  string;
 }
 
 export interface VideoPicture {
  id:      number;
  nr:      number;
  picture: string;
 }
 