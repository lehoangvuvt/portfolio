export type ProjectData = {
  image: string;
  name: string;
  timestamp: number;
  category: string;
  description?: string;
  features: string[];
};

export const projects: ProjectData[] = [
  {
    image: "image-1.png",
    category: "Ecommerce",
    name: "Project 1",
    timestamp: 1651363200,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices auctor diam, fermentum imperdiet odio fringilla id. Ut ut nunc sem. Donec vel dolor iaculis nibh varius condimentum et sit.",
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Donec hendrerit est eget mi commodo, sed consequat nunc efficitur",
      "Nunc suscipit neque vel ipsum mollis ullamcorper",
      "Ut gravida dui ac nisi ullamcorper, ut hendrerit ligula viverra",
    ],
  },
  {
    image: "image-2.jpg",
    category: "Chat App",
    name: "Project 2",
    timestamp: 1667260800,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices auctor diam, fermentum imperdiet odio fringilla id. Ut ut nunc sem. Donec vel dolor iaculis nibh varius condimentum et sit.",
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Donec hendrerit est eget mi commodo, sed consequat nunc efficitur",
      "Nunc suscipit neque vel ipsum mollis ullamcorper",
      "Ut gravida dui ac nisi ullamcorper, ut hendrerit ligula viverra",
    ],
  },
  {
    image: "image-3.png",
    category: "Web3 Marketplace",
    name: "Project 3",
    timestamp: 1691388800,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices auctor diam, fermentum imperdiet odio fringilla id. Ut ut nunc sem. Donec vel dolor iaculis nibh varius condimentum et sit.",
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Donec hendrerit est eget mi commodo, sed consequat nunc efficitur",
      "Nunc suscipit neque vel ipsum mollis ullamcorper",
      "Ut gravida dui ac nisi ullamcorper, ut hendrerit ligula viverra",
    ],
  },
  {
    image: "image-3.png",
    category: "Web4 Marketplace",
    name: "Project 4",
    timestamp: 1699388800,
    description: "This is project 4 description",
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Donec hendrerit est eget mi commodo, sed consequat nunc efficitur",
      "Nunc suscipit neque vel ipsum mollis ullamcorper",
      "Ut gravida dui ac nisi ullamcorper, ut hendrerit ligula viverra",
    ],
  },
];
