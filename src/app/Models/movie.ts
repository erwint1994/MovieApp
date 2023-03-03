export class Movie {
  constructor(
    id: string,
    title: string,
    languages: string[],
    releaseYear: number,
    image: string,
    description: string,
    downloaded: boolean,
    category: string[]
  ) {
    this.id = id;
    this.title = title;
    this.languages = languages;
    this.releaseYear = releaseYear;
    this.image = image;
    this.description = description;
    this.downloaded = downloaded;
    this.category = category;
  }

  id: string;
  title: string;
  languages: string[];
  releaseYear: number;
  image?: string;
  description: string;
  downloaded: boolean;
  category: string[];
}
