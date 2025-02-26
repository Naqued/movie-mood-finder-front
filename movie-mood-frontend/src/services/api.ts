import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export interface MovieRecommendation {
  weather: string;
  mood: string;
  description: string;
  movies: Array<{
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  }>;
}

export const getRecommendations = async (city: string): Promise<MovieRecommendation> => {
  const response = await api.get(`/movies/recommend?city=${city}`);
  return response.data;
}; 