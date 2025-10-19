export interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  startTime: number;
  duration: string;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Sustainable Living",
    description: "Reducing your carbon footprint",
    youtubeId: "PZoz8zfmhq0",
    startTime: 300,
    duration: "45:22",
  },
  {
    id: 2,
    title: "Community Conservation",
    description: "Local environmental efforts",
    youtubeId: "CDdree8PcIE",
    startTime: 1260,
    duration: "38:15",
  },
  {
    id: 3,
    title: "Tech for Good",
    description: "Innovative solutions",
    youtubeId: "KpxbgsBP4Ok",
    startTime: 420,
    duration: "52:40",
  },
];

export default podcastEpisodes;
