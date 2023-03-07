export class Movie {
  id: string;
  title: string;
  languages: string[];
  releaseYear: number;
  image?: string;
  description: string;
  downloaded: boolean;
  category: string[];
  type: string; // movie or serie
  seasons?: Season[];
}

export class Season {
  id: string;
  seasonId: string;
  title: string;
  description: string;
  episodes: Episode[];
}

export class Episode {
  id: string;
  title: string;
  description?: string;
  downloaded: boolean;
}
