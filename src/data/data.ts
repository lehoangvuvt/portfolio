export type ProjectData = {
  image: string;
  name: string;
  timestamp: number;
  category: string;
  description: string;
  features: string[];
};

export type HomeSlideData = {
  image: string;
  title: string;
};

export const projects: ProjectData[] = [
  {
    image: "image-1.png",
    category: "Ecommerce",
    name: "Project 1",
    timestamp: 1651363200,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in urna consequat, aliquam felis et, convallis nunc. Sed ac aliquet massa. Mauris imperdiet vulputate feugiat. In vel lacinia felis. In porttitor purus sapien, ac feugiat quam sollicitudin non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed erat placerat tortor laoreet pretium. Nam ac lacus enim. Quisque ornare, turpis ac ultricies lobortis, enim justo euismod metus, ac congue magna tortor sit amet mi. Aenean imperdiet lorem gravida elit blandit, vel semper arcu aliquet. Mauris et sapien sagittis, tempor quam ut, varius enim. Donec tortor massa, placerat a neque nec, porttitor luctus metus. Nunc pellentesque, magna quis dapibus cursus, orci dui dignissim tortor, id efficitur diam enim sed risus. Nam at ex sit amet felis porttitor tincidunt.",
    features: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Donec hendrerit est eget mi commodo, sed consequat nunc efficitur",
      "Nunc suscipit neque vel ipsum mollis ullamcorper",
      "Ut gravida dui ac nisi ullamcorper, ut hendrerit ligula viverra",
    ],
  },
  {
    image: "image-2.png",
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

export const homeSlides: HomeSlideData[] = [
  {
    image: "home/home-1.png",
    title: "Hi there. I am Vu",
  },
  {
    image: "home/home-2.png",
    title: "I am a Fullstack developer",
  },
  {
    image: "home/home-2.png",
    title: "Press `Enter` to see my projects",
  },
];
