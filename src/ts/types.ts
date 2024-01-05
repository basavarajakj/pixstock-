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
 